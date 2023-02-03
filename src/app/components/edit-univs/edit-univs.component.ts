import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FileService } from '../../services/file.service';
import { Univ } from '../../shared/models';

@Component({
  selector: 'app-edit-univs',
  templateUrl: './edit-univs.component.html',
  styleUrls: ['./edit-univs.component.css'],
})
export class EditUnivsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  univ!: Univ;

  constructor(
    private dialogRef: MatDialogRef<EditUnivsComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) univ: Univ
  ) {
    this.univ = univ;
    this.form = this.fb.group({
      univ_name: [univ.univ_name, Validators.required],
    });
  }

  ngOnInit(): void {}

  save() {
    const changes = this.form.value;
    this.fileService.updateUniv(this.univ.id!, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  get name() {
    return this.form.controls['univ_name'];
  }
}
