import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Assessment } from '../../shared/models';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.css'],
})
export class ViewAssessmentsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewAssessmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assessment
  ) {}

  ngOnInit(): void {
    window.open(this.data.as_url, '_blank');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
