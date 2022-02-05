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
  foodInspection: { label: string; path: string; icon: string; }[];


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
      { label: 'کارنامه محیط زیست ', path: "/workbookReport", icon: "fa fa-diamond" },
    ];
    this.rightMenu = [
      // { label: ' صفحه اصلی', path: "/home", icon: "fa fa-home" },
      { label: ' کارنامه محیط زیست', path: "/workbookReport", icon: "fa fa-diamond" },
      { label: 'تعریف چک لیست', path: "/createCheckList", icon: "fa fa-pencil" },
      { label: 'انجام ارزیابی', path: "/checklistAssesment", icon: "fa fa-print" },
      { label: 'چاپ گزارش', path: "/checklistReport", icon: "fa fa-newspaper-o" },
      { label: 'چاپ گزارش بر اساس نام ارزیاب و تاریخ', path: "/requestChecklistReport", icon: "fa fa-newspaper-o" },
     // { label: 'ارسال پیامک', path: "/messages", icon: "fa fa-envelope-open" },
      { label: 'مدیریت کاربران ', path: "/users", icon: "fa fa-users" },
      { label: 'مدیریت واحد ها ', path: "/locations", icon: "fa fa-map-marker" },
    //  { label: 'مدیریت  نواحی ', path: "/zones", icon: "fa fa-location-arrow" },
      { label: 'خروج', path: "/login", icon: "fa fa-sign-out" },
    ];

    this.foodInspection = [
      { label: ' بازرسی مواد غذایی', path: "/foodInspection", icon: "fa fa-heartbeat" },
      { label: ' مدیریت  مواد غذایی', path: "/typesOfFood", icon: "fa fa-cart-arrow-down" },
      { label: ' مدیریت  شرکت های تولید کننده', path: "/foodManufactures", icon: "fa fa-university" },
     
    ];

  }



  logout() {
    this.auth.wasLoggedOut();
    this.myRoute.navigate(['login']);


  }
}