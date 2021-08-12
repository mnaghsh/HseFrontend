import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-create-check-list',
  templateUrl: './create-check-list.component.html',
  styleUrls: ['./create-check-list.component.css']
})
export class CreateCheckListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['codChkHecli', 'desChkHecli'];


  constructor(
    public commonService: CommonService,
    public checkListService: CheckListService,
  ) { }

  ngOnInit(): void {
    this.getChekLists();
    this.commonService.loading=true
  }
  getChekLists() {


      this.checkListService.getListOfcheckLists().subscribe(
        (success) => {
          console.log('getListOfcheckLists',(success));
          this.dataSource = new MatTableDataSource(success);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //this.commonService.categoryList = JSON.parse(success)
        },
        (error) => {
        }
      )
       
  
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
