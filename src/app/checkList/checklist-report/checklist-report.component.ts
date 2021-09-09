import { SelectionModel } from '@angular/cdk/collections';
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
  displayedColumns = ['number', 'desChkHecli', 'requestDescriptionHsrch',
    'desQuestionHeclq', 'desOptionHeclo', 'desExplainQuestionHscha', 'requestDateHsrch',
    'namAssessorHsrch', 'namLocationHsrch', 'unitCehckListsHecli', 'namDepartmentHecli'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  ListOfcheckListAssesments: any;
  selection = new SelectionModel<any>(true, [])
  selectedArchiveNews: any;
  all: any;
  arrayForFilterDesExplainQuestionHscha: any[];
  constructor(public commonService: CommonService,
    public checklistAssesmentService: checklistAssesmentService,
  ) {
  }

  ngOnInit(): void {
    this.getChecklistQuestions()
  }
  public getChecklistQuestions() {
    this.commonService.loading = true;
    this.checklistAssesmentService.selectAllListOfChecklistReport().subscribe((success) => {
      this.ListOfcheckListAssesments = success;
      this.arrayForFilterDesExplainQuestionHscha = [];
      this.ListOfcheckListAssesments.forEach(eachAssesment => {
        this.arrayForFilterDesExplainQuestionHscha.push({ val: eachAssesment['assessmentId'] });
        //arrayForFilterdesOptionHeclo.push({val:eachAssesment['desOptionHeclo']});
        // arrayForFilter.push({val:eachAssesment['desQuestionHeclq']});
        // arrayForFilter.push({val:eachAssesment['namAssessorHsrch']});
        // arrayForFilter.push({val:eachAssesment['namLocationHsrch']});
        // arrayForFilter.push({val:eachAssesment['requestDateHsrch']});
        // arrayForFilter.push({val:eachAssesment['requestDescriptionHsrch']});

      });
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

  // applyFilter(label, id) {
  //   this.dataSource.filterPredicate = (row, filter) => {
  //     if (filter == 'all')
  //       return true;
  //     return row[label].id == filter;
  //   }
  //   this.dataSource.filter = id.trim().toLowerCase();;
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  exportTable() {
    this.commonService.exportToExcel("mainTable");
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>پرینت قرارداد </title>
          <style>
          *{
             direction:rtl;
             font-family: 'b mitra'!important; 
             text-align: right;

           }
           td{
               
             border: 0px solid gray;
             border-left: 1px solid gray;
             border-bottom: 1px solid gray;
             font-size: medium;
            
           }
         
           .table-striped tbody tr:nth-of-type(odd) {
             background-color: rgba(0,0,0,.05);
         }

        .headerGridTotal{
         font-size: medium !important;
        }
        .gridTotal{
         width:100%;
        }
          
           .mat-sort-header-button{
             border-bottom: 1px solid gray;
             font-size: medium;
             background-color: white;
             border: 0px solid gray;
             text-align: center;
           }
          
         //........Customized style.......
         </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }



}
