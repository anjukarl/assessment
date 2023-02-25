import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as html2pdf from 'html2pdf.js';
import { QandA } from 'src/app/shared/models';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  element = '';
  loading = false;

  constructor(
    public dialogRef2: MatDialogRef<ViewQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataQ: QandA[]
  ) {}

  ngOnInit(): void {
    document.getElementById('contass')!.innerHTML = this.dataQ.reduce(
      (prev: any, ques: any, index: number) =>
        prev +
        `<h2>Question: ${index + 1}</h2> <img src='${ques.q_url}' /> <hr>`,
      ''
    );
  }

  async generatePdf() {
    this.loading = true;
    await this.populateElement();
    const fnameSerial = Math.floor(Math.random() * 100 + 1);
    const fname = `${this.dataQ[0].topic_code.trim()}-${fnameSerial
      .toString()
      .trim()}.pdf`;
    const opt = {
      margin: 0.5,
      filename: `${fname}`,
      pagebreak: { mode: 'avoid-all' },
      image: { type: 'jpeg', quality: 0.5 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'p' },
    };
    // html2pdf().from(this.element).set(opt).save();
    setTimeout(() => {
      html2pdf().from(this.element).set(opt).save();
      this.loading = false;
    }, 5000);
  }

  getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  populateElement = async () => {
    const elem = await this.getElement();
  };

  async getElement() {
    let index = 0;
    for (const item of this.dataQ) {
      await this.getBase64FromUrl(item.q_url).then((res) => {
        this.element += `<h3>Question ${
          index + 1
        }</h3> <img src=${res} width='650' /> <hr>`;
        index++;
      });
    }
  }

  onClose(): void {
    this.dialogRef2.close();
  }
}
