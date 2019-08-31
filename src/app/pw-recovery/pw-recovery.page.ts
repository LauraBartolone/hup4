import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pw-recovery',
  templateUrl: './pw-recovery.page.html',
  styleUrls: ['./pw-recovery.page.scss'],
})
export class PwRecoveryPage implements OnInit {
  public recoveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    ) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  public onSubmit(ev: any): void {
    console.log(ev, this.recoveryForm.value);
  }

  ngOnInit() {
  }

}
