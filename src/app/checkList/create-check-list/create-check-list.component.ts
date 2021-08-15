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
  displayedColumns = ['number', 'codChkHecli', 'desChkHecli', 'process'];
  public users: Record[];
  ListOfcheckLists: any;

  constructor(
    public checkListService: CheckListService,
    public commonService: CommonService,

  ) {
    this.getUsers();
  }
  ngOnInit() {
    //this.userModel = {} as Record;
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

  public saveChanges() {

    this.checkListService.updateListOfcheckLists(3, this.ListOfcheckLists).subscribe((success) => {
      
      console.log('updateListOfcheckLists', success)
    }
    )
  }

  public deleteRow(row) {

    console.log('del', row)
    this.checkListService.deleteListOfcheckLists(row['eCheckListId']).subscribe(
      (success) => {
        this.getUsers();
        this.commonService.showEventMessage("حذف با موفقیت انجام شد.",3000,"red")
        console.log('sucess', success)
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