
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../services/authentication/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  myControl = new FormControl();
  @ViewChild('username') username;
  @ViewChild('password') password;
  message: string;
  find = false;
  connectToServer: any;


  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private configService: ConfigService,
    public commonService: CommonService,
    private myRoute: Router) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.connectToServer=true
  }

  public login() {
    if (this.loginForm.valid) {
      // let body = {
      //   userName: this.loginForm.value.username,
      //   password: this.loginForm.value.password,
      // }
      // this.commonService.loading = true;
      // this.configService.post("users", body).subscribe(
      //   (data: any) => {
      //    // debugger
      //     if(data=="[]"){
      //       this.message = 'نام کاربری یا کلمه عبور اشتباه است'
      //       this.commonService.loading = false;
      //       return;
      //     }

      //     this.commonService.loading = false;
      //     this.commonService.activeUser = JSON.parse(data)
      //     console.log(JSON.parse(data));
      //     data = JSON.parse(data);
      //     data.forEach(element => {
      //       if (element.username == this.loginForm.value.username) {
    
               this.auth.wasLoggedIn();
      this.myRoute.navigate(['menu']);
      //         }
      //         else {
      //           this.message = 'نام کاربری یا کلمه عبور اشتباه است'
      //         }
      //       });
      //     }
      //   )
      // }
    }
  }

 

  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

 


}
