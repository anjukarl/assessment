import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { FileService } from '../../services/file.service';
import { DialogService } from '../../services/dialog.service';
import { Univ } from '../../shared/models';
import { AddUnivsComponent } from '../add-univs/add-univs.component';
import { EditUnivsComponent } from '../edit-univs/edit-univs.component';

@Component({
  selector: 'app-univs',
  templateUrl: './univs.component.html',
  styleUrls: ['./univs.component.css'],
})
export class UnivsComponent implements OnInit {
  univs: Univ[] = [];

  columnsToDisplay = ['univ_name', 'actions'];
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
    this.reloadUnivs();
  }

  reloadUnivs() {
    this.loading = true;
    this.fileService
      .loadUnivs()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((univsList) => {
        this.dataSource = new MatTableDataSource(univsList);
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

  addUniv() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    this.dialog
      .open(AddUnivsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadUnivs();
        this.onSearchClear();
      });
  }

  updateUniv(univ: Univ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.data = univ;

    this.dialog
      .open(EditUnivsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadUnivs();
        this.onSearchClear();
      });
  }

  deleteUniv(univ: Univ) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fileService
            .deleteUniv(univ.id!)
            .pipe(finalize(() => this.reloadUnivs()))
            .subscribe();
        }
      });
  }
}
