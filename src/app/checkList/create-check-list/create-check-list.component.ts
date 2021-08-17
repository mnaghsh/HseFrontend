import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';

export interface Record extends ArrayBuffer {
  id?: number;
  username: string;
  edit;

  // editedUsername?: string
  // editedfirstname?: string
  // editedlastname?: string
  // editedpassword?: string
  firstname: any;
  lastname: any;
  enabled?: boolean;
  password?: string;
  roles?: [{ id: number }];

}

export interface Users extends ArrayBuffer {
  message: string;
  records: Record[];
  total: number;

}


@Component({
  selector: 'app-create-check-list',
  templateUrl: './create-check-list.component.html',
  styleUrls: ['./create-check-list.component.css']
})

export class CreateCheckListComponent implements OnInit {
  mhd;
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])
  userModel: Record;
  updateUserName;
  displayedColumns = ['number', 'desChkHecli', 'process'];
  public users: Record[];
  ListOfcheckLists: any;
  newRowObj: any;

  constructor(
    public checkListService: CheckListService,
    public commonService: CommonService,

  ) {
    this.getUsers();
  }
  ngOnInit() {
    this.newRowObj={}
    this.getUsers();
  }

  public getUsers() {
    this.commonService.loading = true;
    this.checkListService.selectListOfcheckLists().subscribe((success) => {
      this.ListOfcheckLists = success;
      //this.userModel.roles = [{id: 282}];
      console.log('ListOfcheckLists', this.ListOfcheckLists)
      this.dataSource = new MatTableDataSource(this.ListOfcheckLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {
    debugger
    let object = {
      "desChkHecli":  this.newRowObj.desChkHecli,
      "unitCehckListsHecli":   "string"
    }

    this.checkListService.insertListOfcheckLists(object).subscribe((success) => {
      this.commonService.showEventMessage("ایجاد ردیف با موفقیت انجام شد.", 3000, "green")
      this.getUsers();
      console.log('updateListOfcheckLists', success)
      this.newRowObj={};
    },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع می باشد.", 3000, "green")
      }
    )
  }
  public editRow(row){
    this.edit=!this.edit;
    row['editable']=true;
    debugger

  }

  public updateRow(row) {
    this.edit = !this.edit;
    this.checkListService.updateListOfcheckLists(row['eCheckListId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ویرایش ردیف با موفقیت انجام شد.", 3000, "green")
      this.getUsers();
      console.log('updateListOfcheckLists', success)
      ;

    },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع می باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.checkListService.deleteListOfcheckLists(row['eCheckListId']).subscribe(
      (success) => {
       
        this.getUsers();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف ردیف با موفقیت انجام شد.", 3000, "red")
        console.log('sucess', success)
        

      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع می باشد.", 3000, "green")
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}