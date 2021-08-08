import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  expertPages: { label: string; path: string; icon: string; }[];

  pages: Array<{ label: string, path: any, icon: any }>;
  adminPages: Array<{ label: string, path: any, icon: any }>;
  navBarItem: { label: string; path: string; icon: string; }[];
  delegationSigniture: { label: string; path: string; icon: string; }[];
  panelOpenState = false;
  addItems: { label: string; path: string; icon: string; }[];
  cartable: { label: string; path: string; icon: string; }[];
  onlineUser: any;
  reports: { label: string; path: string; icon: string; }[];

  constructor(private auth: AuthenticationService,
    private myRoute: Router) {
  }

  ngOnInit() {


    this.navBarItem = [
      { label: ' تغییر اطلاعات اساتید', path: "/teachersDetail", icon: "fas fa-users" },
      { label: 'ورود اطلاعات', path: "/report/mainGridReport", icon: "fas fa-pencil" },
      { label: 'چاپ گزارش', path: "/report/mainGridReportReadOnly", icon: "fas fa-print" },
      { label: 'چاپ قرارداد استاد', path: "/report/Contract", icon: "fas fa-newspaper-o" },


      // { label: ' ایجاد آیتم غیرمحاسباتی کلی  ', path: "/report", icon: "far fa-envelope" },

      // { label: ' کالک ', path: "/calk", icon: "fas fa-map" },
    ];

    this.addItems = [
      { label: ' آیتم های غیرمحاسباتی وابسته به درس  ', path: "/formula/commonFormula", icon: "fas fa-plus" },
      { label: ' آیتم های  محاسباتی وابسته به درس ', path: "/formula/calculatedFormula", icon: "fas fa-plus-square-o" },
      { label: ' آیتم های غیر محاسباتی کلی ', path: "/formula/totalCommonFormula", icon: " fa-plus-circle" },
      { label: ' آیتم های محاسباتی کلی ', path: "/formula/totalCalculatedFormula", icon: " fa-plus-square" },
    ]

    this.reports = [
      { label: 'گزارش پرداخت اساتید ارسال شده به واحد مالی', path: "/report/sendListToFinance", icon: "fas fa-caret-square-o-up" },
      { label: 'گزارش پرداخت اساتید ارسال نشده به واحد مالی', path: "/report/unSendListToFinance", icon: "fas fa-window-close-o" },
    ]

    this.pages = [

      { label: ' ورود اطلاعات ', path: "/report/mainGridReport", icon: "fas fa-pencil" },
      { label: ' چاپ گزارش ', path: "/report/mainGridReportReadOnly", icon: "fas fa-print" },
      { label: 'چاپ قرارداد استاد', path: "/report/Contract", icon: "fas fa-newspaper-o" }

    ];



    this.adminPages = [
      { label: ' تنظیمات اساتید', path: "/registerTeachers", icon: "fas fa-user-plus" },


      // { label: ' بروزرسانی ', path: "/update", icon: "fas fa-refresh" },
      // { label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera" },
    ];
    this.expertPages = [

      { label: ' تغییر اطلاعات اساتید', path: "/teachersDetail", icon: "fas fa-users" },
      // { label: ' بروزرسانی ', path: "/update", icon: "fas fa-refresh" },
      // { label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera" },
    ];
    this.delegationSigniture = [
      { label: 'اعطا حق امضا واحد های محاسبه شده به کاربران', path: "/delegationSigniture", icon: " fa-check-square-o" },
      // { label: 'اعطا حق امضا واحد های محاسبه شده به کاربران', path: "/delegationSignitureForCalculationUnits", icon: " fa-check" },

    ];
    this.cartable = [
      { label: 'کارتابل تایید واحد های محاسبه شده', path: "/contractSignitures", icon: " fa fa-file" },
      { label: ' تنظیمات کاربران سیستم', path: "/register", icon: "fas fa-user-plus" },

      // { label: ' تایید واحد های محاسبه شده', path: "/contractSignituresForCalculationUnits", icon: " fa fa-file-o" },

    ];


  }
  logout() {
    this.auth.wasLoggedOut();
    this.myRoute.navigate(['login']);

  }

}
 