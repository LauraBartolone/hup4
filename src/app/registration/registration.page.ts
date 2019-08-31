import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],

    });
  }

  public onSubmit(ev: any): void {
    console.log(ev, this.registrationForm.value);
  }

  ngOnInit() {
  }

}
