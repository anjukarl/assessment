import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { QandA } from '../../shared/models';

@Component({
  selector: 'app-view-qandas',
  templateUrl: './view-qandas.component.html',
  styleUrls: ['./view-qandas.component.css'],
})
export class ViewQandasComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewQandasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QandA
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
