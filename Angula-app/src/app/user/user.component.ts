import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userForm: FormGroup;
  submitted = false;

  users: { name: string; email: string }[] = []; // Store registered users

  // Two-way binding variables
  nameInput: string = '';
  emailInput: string = '';

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.userForm.valid) {
      // Save the user details
      this.users.push({
        name: this.userForm.value.name,
        email: this.userForm.value.email,
      });

      alert('Signup Successful! 🎉');
      this.userForm.reset();
      this.submitted = false;

      // Clear Two-Way Binding fields
      this.nameInput = '';
      this.emailInput = '';
    }
  }

  get formControls() {
    return this.userForm.controls as {[key: string] : AbstractControl};
  }
}
