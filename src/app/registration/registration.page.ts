import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../form/validators/validators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public registrationForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) {
    this.registrationForm = this.formBuilder.group({
      email: ['',   Validators.compose(
        [ Validators.required,  Validators.email])],
      username: ['', Validators.required],
      password1: ['', Validators.compose(
        [ Validators.required,  Validators.minLength(8)])],
      password2: ['', Validators.required],
    },
    {
      validator: MustMatch('password1', 'password2')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  public onSubmit(ev: any): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.userService.registration(this.registrationForm.value);
    }
  }

  ngOnInit() {
  }

}
