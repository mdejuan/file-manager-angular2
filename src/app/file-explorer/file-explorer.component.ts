import { Component, Input, Output, EventEmitter, Sanitizer, OnDestroy } from '@angular/core';
import { FileElement } from './model/element';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import * as uniqueID from 'lodash.uniqueid';
import * as filesize from 'filesize';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../service/file.service';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  constructor(public dialog: MatDialog, public fileService: FileService, private sanitization: DomSanitizer) {}
  uploadedFiles: any[] = [];
  @Input() fileElements: FileElement[];
  fileElement: FileElement;
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();
  @Output() fileAdded = new EventEmitter<FileElement>();

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    const dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    const dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }



  handleUpload = (files: File[]) => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueID(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: this.sanitization.bypassSecurityTrustStyle(`url(${URL.createObjectURL(file)})`),
      progress: 0,
      uploaded: false,
      error: false,
      type: file.type,
      url: `url(${URL.createObjectURL(file)})`
    }));

    this.uploadedFiles.push(...uploadedFiles);

    uploadedFiles.forEach(this.processUpload);

  }

  processUpload = (uploadedFile) => {
    this.fileElement = new FileElement();
    this.fileElement.id = uploadedFile.id;
    this.fileElement.isFolder = false;
    this.fileElement.name = uploadedFile.name;
    this.fileElement.file = uploadedFile.file;
    this.fileElement.preview = uploadedFile.preview;
    this.fileElement.url = uploadedFile.url;
    this.fileElement.type = uploadedFile.type;
    this.fileAdded.emit(this.fileElement);

  }

}
