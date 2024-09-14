import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../shared/models/Auth/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  authModel = new Auth();
  loginAdminForm!: FormGroup;

  constructor (private formBuilder: FormBuilder, private tostr: ToastrService, private spinner: NgxSpinnerService, private router: Router
              , private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initLoginAdminForm();
  }

  onSubmitLoginAdminForm() {
    const userName = this.loginAdminForm.controls['userName'].value;
    const password = this.loginAdminForm.controls['password'].value;
    
    if (userName == "") {
      this.tostr.error("Empty Field Found", "User name is required.");
    } else if (password == "") {
      this.tostr.error("Empty Field Found", "Paswword is required.");
    } else {
      this.authModel.userName = userName;
      this.authModel.password = password;

      this.spinner.show();
      this.authService.authenticateAdminUser(this.authModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          sessionStorage.setItem("authToken", resp.token);

          this.tostr.success("User Authentication", "User Logged in Successfully");
          this.router.navigate(['app/home']);
        } else {
          this.tostr.error("User Authetication", resp.message);
        }

        this.spinner.hide();
      })
    }
  }

  initLoginAdminForm() {
    this.loginAdminForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
