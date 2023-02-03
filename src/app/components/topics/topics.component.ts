import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { FileService } from '../../services/file.service';
import { DialogService } from '../../services/dialog.service';
import { Topic } from '../../shared/models';
import { AddTopicsComponent } from '../add-topics/add-topics.component';
import { EditTopicsComponent } from '../edit-topics/edit-topics.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = [];

  columnsToDisplay = ['subject_code', 'topic_name', 'actions'];
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
    this.reloadTopics();
  }

  reloadTopics() {
    this.loading = true;
    this.fileService
      .loadTopics()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((topicsList) => {
        this.dataSource = new MatTableDataSource(topicsList);
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

  addTopic() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';

    this.dialog
      .open(AddTopicsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadTopics();
        this.onSearchClear();
      });
  }

  updateTopic(topic: Topic) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.data = topic;

    this.dialog
      .open(EditTopicsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.reloadTopics();
        this.onSearchClear();
      });
  }

  deleteTopic(topic: Topic) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fileService
            .deleteTopic(topic.id!)
            .pipe(finalize(() => this.reloadTopics()))
            .subscribe();
        }
      });
  }
}
