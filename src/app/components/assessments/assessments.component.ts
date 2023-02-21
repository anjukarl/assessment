import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { FileService } from '../../services/file.service';
import { DialogService } from '../../services/dialog.service';
import { Assessment } from '../../shared/models';
import { ViewAssessmentsComponent } from '../view-assessments/view-assessments.component';
import { AddAssessmentsComponent } from '../add-assessments/add-assessments.component';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit {
  assessments: Assessment[] = [];

  columnsToDisplay = [
    'exam_name',
    'subject_name',
    'as_id',
    'as_filename',
    'actions',
  ];
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
    this.reloadAssessments();
  }

  reloadAssessments() {
    this.loading = true;
    this.fileService
      .loadAssessments()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((assList) => {
        this.dataSource = new MatTableDataSource(assList);
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

  addAssessment() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';

    this.dialog
      .open(AddAssessmentsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadAssessments();
        this.onSearchClear();
      });
  }

  viewAssessment(assessment: Assessment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = assessment;

    this.dialog
      .open(ViewAssessmentsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.onSearchClear();
      });
  }

  deleteAssessment(assessment: Assessment) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fileService
            .deleteAssessment(assessment.id!, assessment.as_filename)
            .pipe(finalize(() => this.reloadAssessments()))
            .subscribe();
        }
      });
  }
}
