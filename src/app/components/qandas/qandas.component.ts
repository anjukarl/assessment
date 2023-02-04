import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { FileService } from '../../services/file.service';
import { DialogService } from '../../services/dialog.service';
import { QandA } from '../../shared/models';
import { AddQandasComponent } from '../add-qandas/add-qandas.component';
import { EditQandasComponent } from '../edit-qandas/edit-qandas.component';

@Component({
  selector: 'app-qandas',
  templateUrl: './qandas.component.html',
  styleUrls: ['./qandas.component.css'],
})
export class QandasComponent implements OnInit {
  qandas: QandA[] = [];

  columnsToDisplay = [
    'exam_name',
    'subject_name',
    'topic_code',
    'year',
    'marks',
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
    this.reloadQandAs();
  }

  reloadQandAs() {
    this.loading = true;
    this.fileService
      .loadQandAs()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((qandasList) => {
        this.dataSource = new MatTableDataSource(qandasList);
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

  addQandA() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';

    this.dialog
      .open(AddQandasComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadQandAs();
        this.onSearchClear();
      });
  }

  updateQandA(qanda: QandA) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = qanda;

    this.dialog
      .open(EditQandasComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadQandAs();
        this.onSearchClear();
      });
  }

  deleteQandA(qanda: QandA) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fileService
            .deleteQandA(qanda.id!)
            .pipe(finalize(() => this.reloadQandAs()))
            .subscribe();
        }
      });
  }
}
