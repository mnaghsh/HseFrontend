import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { checklistAssesmentService } from 'src/app/services/checklistAssesmentService/checklistAssesmentService';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormControl } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-checklist-report',
  templateUrl: './checklist-report.component.html',
  styleUrls: ['./checklist-report.component.css']
})
export class ChecklistReportComponent implements OnInit {
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  displayedColumns = ['number', 'namChkHecli', 'requestDescriptionHsrch',
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
  filteredArray: any;
  firstFilter: any[];
  secoundFilter: any[];
  namChkHecliFilter: any;
  namDepartmentHecliFilter: any;
  namAssessorHsrchFilter: any;
  namLocationHsrchFilter: any;
  desQuestionHeclqFilter: any;
  desOptionHecloFilter: any;
  search: any;
  percentage: any;
  counts: string;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

  constructor(public commonService: CommonService,
    public checklistAssesmentService: checklistAssesmentService,
  ) {

  }


  ngOnInit(): void {
    this.getChecklistQuestions()
  }
  public getChecklistQuestions() {
    this.namChkHecliFilter = ""
    this.namDepartmentHecliFilter = ""
    this.namAssessorHsrchFilter = ""
    this.namLocationHsrchFilter = ""
    this.desQuestionHeclqFilter = ""
    this.desOptionHecloFilter = ""
    this.commonService.loading = true;
    this.checklistAssesmentService.selectAllListOfChecklistReport().subscribe((success) => {
      this.ListOfcheckListAssesments = success;
      console.log(' this.ListOfcheckListAssesment', this.ListOfcheckListAssesments)
      this.viewThePercentageOfOptions(success);
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

  // applyFilter(event: Event) {
  //   this.filteredArray = this.dataSource['_data']['_value']

  //   this.filteredArray.forEach(eachReport => {
  //     if (eachReport.namAssessorHsrch == event
  //     ) {
  //       this.firstFilter.push (eachReport) ;
  //     }
  //     this.dataSource = new MatTableDataSource(this.firstFilter);

  //     console.log('local',  this.firstFilter)
  //   });

  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.viewThePercentageOfOptions(this.dataSource.filteredData)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  serverFilter() {
    console.log('startDate',this.startDate.nativeElement.value)
    console.log('endDate',this.endDate.nativeElement.value)
   //console.log('startDate', moment( this.startDate.nativeElement.value, 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD'))
    //console.log('endDate', moment(this.endDate.nativeElement.value, 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD'))

    this.search = ""
    const body = {

      namChkHecli: this.namChkHecliFilter,
      namDepartmentHecli: this.namDepartmentHecliFilter,
      namAssessorHsrch: this.namAssessorHsrchFilter,
      namLocationHsrch: this.namLocationHsrchFilter,
      desQuestionHeclq: this.desQuestionHeclqFilter,
      desOptionHeclo: this.desOptionHecloFilter,
      startdateHsrch: this.startDate.nativeElement.value,
      enddateHsrch: this.endDate.nativeElement.value

    }
    this.commonService.loading = true;
    this.checklistAssesmentService.filterListOfChecklistReport(body).subscribe((success) => {
      this.viewThePercentageOfOptions(success)
      this.dataSource = new MatTableDataSource(success);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;

    })
  }

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
  viewThePercentageOfOptions(data) {
    let optionsText = [];
    data.forEach(eachRowOfReport => {
      if (optionsText != eachRowOfReport['desOptionHeclo']) {
        optionsText.push(eachRowOfReport['desOptionHeclo'])
      }
    }); console.log('optionsText', optionsText)

    var counts = {};

    for (var i = 0; i < optionsText.length; i++) {
      if (!counts.hasOwnProperty(optionsText[i] = optionsText[i])) {
        counts[optionsText[i]] = 1;
      }
      else {
        counts[optionsText[i]]++;
      }
    }

    console.log('counts', counts);
    this.counts = JSON.stringify(counts)
    let sum = Object.keys(counts).reduce((s, k) => s += counts[k], 0);

    this.percentage = Object.keys(counts).map(k => ({ [k]: '%' + (counts[k] / sum * 100).toFixed(2) }));
    this.percentage = JSON.stringify(this.percentage)
    console.log('percentage', this.percentage);

  }

}
