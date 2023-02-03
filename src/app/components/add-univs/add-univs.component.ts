import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { FileService } from '../../services/file.service';
import { Univ } from '../../shared/models';

@Component({
  selector: 'app-add-univs',
  templateUrl: './add-univs.component.html',
  styleUrls: ['./add-univs.component.css'],
})
export class AddUnivsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;

  constructor(
    private dialogRef: MatDialogRef<AddUnivsComponent>,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  save() {
    this.saveUnivInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  saveUnivInfo() {
    let newUniv: Partial<Univ> = {};
    newUniv.univ_name = this.form.value.name;
    this.fileService.createUniv(newUniv);
  }

  get name() {
    return this.form.controls['name'];
  }
}
