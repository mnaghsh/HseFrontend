import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CheckListService } from '../services/checkList/check-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navBarItem: { label: string; path: string; icon: string; }[];
  rightMenu: { label: string; path: string; icon: string; }[];
 

  constructor(private auth: AuthenticationService,
    public commonService: CommonService,
    public checkListService: CheckListService,
    private myRoute: Router) {
    //this.onlineUser = this.commonService.activeUser[0].type
  }

  ngOnInit() {
    this.myRoute.navigate(['checklistAssesment']);

    this.navBarItem = [
      // { label: ' صفحه اصلی', path: "/home", icon: "fa fa-home" },
      { label: 'تعریف چک لیست', path: "/createCheckList", icon: "fa fa-pencil" },
      { label: 'انجام ارزیابی', path: "/checklistAssesment", icon: "fa fa-print" },
      { label: 'چاپ گزارش', path: "/checklistReport", icon: "fa fa-newspaper-o" },
    ];
    this.rightMenu = [
      // { label: ' صفحه اصلی', path: "/home", icon: "fa fa-home" },
      { label: 'تعریف چک لیست', path: "/createCheckList", icon: "fa fa-pencil" },
      { label: 'انجام ارزیابی', path: "/checklistAssesment", icon: "fa fa-print" },
      { label: 'چاپ گزارش', path: "/checklistReport", icon: "fa fa-newspaper-o" },
      { label: 'مدیریت کاربران ', path: "/users", icon: "fa fa-newspaper-o" },
      { label: 'خروج', path: "/login", icon: "fa fa-sign-out" },
    ];

   }
 


  logout() {
    this.auth.wasLoggedOut();
    this.myRoute.navigate(['login']);

  
}
}