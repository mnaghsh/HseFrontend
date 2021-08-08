import { Injectable, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  teachers: any[];
  @Output() saveTotalMainGrid = new EventEmitter();

 // public saveTotalMainGrid: Subject<any> = new Subject<any>();
  public showSaveBtn: boolean;
  public showSaveBtnTotal: boolean;
  public rollback: Subject<any> = new Subject<any>();
  loading:boolean;
  coursesList;
  teacherList;
  usersList;
  categoryList;
  reportUserId:any; 
  termId; 
  usersWithCourse;
  onlineUserDepartmentId;
  showTotalValueTable=true;
  activeUser: any;
  termName: any;
  allPersonsList;
  nameOfSelectedTeacher: any;
  userDetails: any;
  userDetailInfo: any;
  reportUserName: any;
  constructor(  private snackBar: MatSnackBar,) { }
  showEventMessage(message,duration=3000,type?) {
    this.snackBar.open(message, '', {
      direction: 'rtl',
      duration: duration,
      panelClass: type? type: 'background-color:red'
    });
  }


}