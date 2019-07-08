import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import { FileExplorerComponent } from './file-explorer.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import { ngfModule } from 'angular-file';
import { UploadComponent } from '../upload/upload.component';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ngfModule, MatIconModule,
    TooltipModule
  ],
  declarations: [FileExplorerComponent, NewFolderDialogComponent, RenameDialogComponent, UploadComponent],
  exports: [FileExplorerComponent],
  entryComponents: [NewFolderDialogComponent, RenameDialogComponent]
})
export class FileExplorerModule {}
