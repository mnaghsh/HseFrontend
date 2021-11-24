import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';
import { ChecklistReportComponent } from '../checklist-report/checklist-report.component';

@Component({
  selector: 'app-request-checklist-report',
  templateUrl: './request-checklist-report.component.html',
  styleUrls: ['./request-checklist-report.component.css']
})
export class RequestChecklistReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  displayedColumns = ['number', 'namChkHecli', 'namAssessorHsrch', 'requestDateHsrch', 'namLocationHsrch', 'namEvaluationAreaHsrch'];
  ListOfRequestcheckList: any;
  constructor(public commonService: CommonService,
    public requestChecklistService: RequestChecklistService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getRequestChecklistQuestions()
  }
  public getRequestChecklistQuestions() {

    this.commonService.loading = true;
    this.requestChecklistService.selectAllListOfRequestCheckListsReport().subscribe((success) => {
      this.ListOfRequestcheckList = success;
      console.log(' this.ListOfcheckListAssesment', this.ListOfRequestcheckList)
      this.dataSource = new MatTableDataSource(this.ListOfRequestcheckList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAssesment(row) {
    debugger
    const dialogRef = this.dialog.open(ChecklistReportComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
        itsPopup:true,
        row:row
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        //this.checklistId = data.eCheckListId;
       // this.namChkHecli = data.namChkHecli;
        //this.namLocationHsrch = data.namLocationHsrch;
        // this.firstLevel.value.firstCtrl=data.desChkHecli
       // this.firstLevel.controls['firstCtrl'].setValue(data.namChkHecli);
        // this.firstLevel = this.fb.group({
        //   firstCtrl: [data.desChkHecli, Validators.required]

        // });

      }
    )

  }

}
