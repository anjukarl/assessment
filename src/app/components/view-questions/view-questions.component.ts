import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { QandA } from '../../shared/models';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  constructor(
    public dialogRef2: MatDialogRef<ViewQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataQ: any
  ) {}

  ngOnInit(): void {
    document.getElementById('contass')!.innerHTML = this.dataQ.reduce(
      (prev: any, ques: any, index: number) =>
        prev +
        `<h2>Question: ${index + 1}</h2> <img src='${ques.q_url}' /> <hr>`,
      ''
    );
  }

  onClose(): void {
    this.dialogRef2.close();
  }
}
