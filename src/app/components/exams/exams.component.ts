import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { FileService } from '../../services/file.service';
import { DialogService } from '../../services/dialog.service';
import { Exam } from '../../shared/models';
import { AddExamsComponent } from '../add-exams/add-exams.component';
import { EditExamsComponent } from '../edit-exams/edit-exams.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = [];

  columnsToDisplay = ['univ_name', 'exam_name', 'actions'];
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
    this.reloadExams();
  }

  reloadExams() {
    this.loading = true;
    this.fileService
      .loadExams()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((examsList) => {
        this.dataSource = new MatTableDataSource(examsList);
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

  addExam() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    this.dialog
      .open(AddExamsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadExams();
        this.onSearchClear();
      });
  }

  updateExam(exam: Exam) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.data = exam;

    this.dialog
      .open(EditExamsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadExams();
        this.onSearchClear();
      });
  }

  deleteExam(exam: Exam) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fileService
            .deleteExam(exam.id!)
            .pipe(finalize(() => this.reloadExams()))
            .subscribe();
        }
      });
  }
}
