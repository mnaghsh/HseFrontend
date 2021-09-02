import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { checklistAssesmentService } from 'src/app/services/checklistAssesmentService/checklistAssesmentService';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-checklist-report',
  templateUrl: './checklist-report.component.html',
  styleUrls: ['./checklist-report.component.css']
})
export class ChecklistReportComponent implements OnInit {
  displayedColumns = ['number', 'requestDescriptionHsrch','desQuestionHeclq', 'desOptionHeclo', 'desExplainQuestionHscha','requestDateHsrch','namAssessorHsrch','namLocationHsrch'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  ListOfcheckListAssesments: any;
  constructor(public commonService: CommonService,
    public checklistAssesmentService: checklistAssesmentService,
    ) { }

  ngOnInit(): void {
    this.getChecklistQuestions() 
  }
  public getChecklistQuestions() {
    this.commonService.loading = true;
    this.checklistAssesmentService.selectAllListOfChecklistReport().subscribe((success) => {
      this.ListOfcheckListAssesments = success;
      console.log('ListOfcheckListsQuestions', this.ListOfcheckListAssesments)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListAssesments);
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
}
