import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { FileService } from '../../services/file.service';
import { DialogService } from '../../services/dialog.service';
import { Subject } from '../../shared/models';
import { AddSubjectsComponent } from '../add-subjects/add-subjects.component';
import { EditSubjectsComponent } from '../edit-subjects/edit-subjects.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];

  columnsToDisplay = ['exam_name', 'subject_name', 'actions'];
  dataSource!: MatTableDataSource<any>;
  loading = false;
  searchKey: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fileService: FileService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.reloadSubjects();
  }

  reloadSubjects() {
    this.loading = true;
    this.fileService
      .loadSubjects()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((subjectsList) => {
        this.dataSource = new MatTableDataSource(subjectsList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  addSubject() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';

    this.dialog
      .open(AddSubjectsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadSubjects();
        this.onSearchClear();
      });
  }

  updateSubject(subject: Subject) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.data = subject;

    this.dialog
      .open(EditSubjectsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadSubjects();
        this.onSearchClear();
      });
  }

  deleteSubject(subject: Subject) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fileService
            .deleteSubject(subject.id!)
            .pipe(finalize(() => this.reloadSubjects()))
            .subscribe();
        }
      });
  }
}
