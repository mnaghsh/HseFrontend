
import * as moment from 'jalali-moment'
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { workbookReportService } from '../services/workbookReport/workbookReportService';
import { ZonesComponent } from '../utils/zones/zones.component';
import { LocationsOfZonesService } from '../services/locationsOfZones/locationsOfZonesService';
import { checklistAssesmentService } from '../services/checklistAssesmentService/checklistAssesmentService';

@Component({
  selector: 'app-workbook-report',
  templateUrl: './workbook-report.component.html',
  styleUrls: ['./workbook-report.component.css']
})
export class WorkbookReportComponent implements OnInit {

  displayedColumns = ['number', 'e_monitor_request_id', 'des_lkp_typ_exit',
    'des_lkp_typ_exam', 'des_request_hemre', 'num_request_hemre', 'dat_request_hemre_jalali',
    'nam_location_hsloc', 's_location_id', 'nam_param_hemop', 'nam_measur_hemrp', 'nam_real_measur_hemrp', 'flg_abssence'];
  displayedColumnsReportindustrialWastePerUnit = ['number', 'ratio', 'nam_measur_hemrp', 'nam_location_hsloc', 'average', 'score'];
  displayedColumnsChecklistReport = ['number', 'namChkHecli', 'requestDescriptionHsrch',
    'desQuestionHeclq', 'desOptionHeclo', 'desExplainQuestionHscha', 'requestDateJalaliHsrch',
    'namAssessorHsrch', 'namLocationHsrch', 'unitCehckListsHecli', 'namDepartmentHecli', 'namEvaluationAreaHsrch'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  dataSourceReportindustrialWastePerUnit: MatTableDataSource<any>
  dataSourceChecklistReport: MatTableDataSource<any>


  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  listOfWorkbookReport: any;
  filterZoneId: any;
  listLocationsOfZones: any;
  fullListOfWorkbookReport: any;
  counts: any;
  percentage: any;
  buildAvgOfUnits: any;
  averagesOfNam_measur_hemrp: any[];
  listOfcheckListReport: any;
  fullListOfcheckListReport: any;
  arr: any;

  constructor(public commonService: CommonService,
    public workbokReport: workbookReportService,
    public locationsOfZones: LocationsOfZonesService,
    public checklistAssesmentService: checklistAssesmentService,

    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public recievedData

  ) {
    // this.getWorkbookReport()
  }
  ngOnInit(): void {
    this.fullListOfcheckListReport = [];
    this.fullListOfWorkbookReport = [];
    this.averagesOfNam_measur_hemrp = [];
    this.arr = [];
  }

  public getWorkbookReport(s_location_id) {
    this.fullListOfWorkbookReport = [];
    let body = {
      s_location_id: s_location_id,
      dat_request_hemre_jalali: "140010",
    }
    this.commonService.loading = true;
    this.workbokReport.getReport(body).subscribe((success) => {
      this.listOfWorkbookReport = success;

      this.percentageOfScore(this.listOfWorkbookReport)

      // console.log('this.listOfWorkbookReportyyyyyyyyy', this.listOfWorkbookReport)
      this.listOfWorkbookReport.forEach(eachWorkbookReportOfUnit => {
        this.fullListOfWorkbookReport.push(eachWorkbookReportOfUnit);
      });
      // if (this.fullListOfWorkbookReport.length > 0) {
      //   for (let i = 0; i <= this.fullListOfWorkbookReport.length; i++) {
      //     if (this.fullListOfcheckListReport[i].eRequestId == this.fullListOfcheckListReport[i + 1].eRequestId) {
      //       this.arr.push({ eRequestId: this.fullListOfcheckListReport[i].eRequestId, desOptionHeclo: this.fullListOfcheckListReport[i].desOptionHeclo })

      //     }
      //   }
      // }
      console.log('arrrrrrrr', this.arr)
      console.log('this.fullListOfWorkbookReport', this.fullListOfWorkbookReport)
      //debugger



      // const groupBy = (key) => this.fullListOfWorkbookReport.reduce((total, currentValue) => {
      //   const newTotal = total;
      //   if (
      //     total.length &&
      //     total[total.length - 1][key] === currentValue[key]
      //   )
      //     newTotal[total.length - 1] = {
      //       ...total[total.length - 1],
      //       ...currentValue,
      //       //  Value: parseInt(total[total.length - 1].Value) + parseInt(currentValue.Value),
      //     };
      //   else newTotal[total.length] = currentValue;
      //   return newTotal;
      // }, []);

      // let industrialWasteGroupby = ((groupBy('e_monitor_request_id')));
      // console.log('industrialWasteGroupby', industrialWasteGroupby)
      this.dataSourceReportindustrialWastePerUnit = new MatTableDataSource(this.averagesOfNam_measur_hemrp);


      this.dataSource = new MatTableDataSource(this.fullListOfWorkbookReport);
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


  selectZones(row?) {


    const dialogRef = this.dialog.open(ZonesComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        this.averagesOfNam_measur_hemrp = [];
        let body = {
          "zoneId": data.zoneId
        }
        //به ازای هر مکان داخل ناحیه درخواست به سرور میرود
        this.locationsOfZones.FilterListLocationsOfZone(body).subscribe(
          (success) => {
            // this.getWorkbookReport()
            this.listLocationsOfZones = success;
            this.listLocationsOfZones.forEach(eachLocation => {
              this.getWorkbookReport(eachLocation.locationId)
              this.getReportOfChecklists(eachLocation.namLocation)


            });
          },
          (error) => {

          }
        )


        //this.filterZoneId=data.zoneId

      }
    )

  }
  percentageOfScore(WorkbookReportOfUnit) {

    let totalPercent = 0;
    let average;
    let length = WorkbookReportOfUnit.length;
    if (WorkbookReportOfUnit.length > 0) {
      WorkbookReportOfUnit.forEach(eachWorkbookReportOfUnit => {

        eachWorkbookReportOfUnit.nam_measur_hemrp = Number(eachWorkbookReportOfUnit.nam_measur_hemrp)
        totalPercent += eachWorkbookReportOfUnit.nam_measur_hemrp
        average = (totalPercent / (length - 1))

      });
      this.averagesOfNam_measur_hemrp.push({ score: ((average) * 20) / 100, ratio: 2, nam_location_hsloc: WorkbookReportOfUnit[0].nam_location_hsloc, nam_measur_hemrp: WorkbookReportOfUnit[0].e_monitor_request_id, average: average })

      //منهای یک چون ردیف اول مقدار اندازه گیری صفر است
      console.log("averagesOfNam_measur_hemrp", this.averagesOfNam_measur_hemrp)
    }

  }
  public getReportOfChecklists(namLocation) {

    const body = {
      namChkHecli: "",
      namDepartmentHecli: "",
      namAssessorHsrch: "",
      namLocationHsrch: namLocation,
      desQuestionHeclq: "",
      desOptionHeclo: "",
      namEvaluationAreaHsrch: "",
      startdateHsrch: moment("14001001", 'jYYYY/jM/jD'),
      enddateHsrch: moment("14001030", 'jYYYY/jM/jD')
    }

    this.serverFilter(body)
  }
  serverFilter(body) {


    this.commonService.loading = true;
    this.checklistAssesmentService.filterListOfChecklistReport(body).subscribe((success) => {
      console.log('success', success)
      this.listOfcheckListReport = success;
      this.listOfcheckListReport.forEach(eachCheckListReportOfUnit => {
        this.fullListOfcheckListReport.push(eachCheckListReportOfUnit);
        var obj = {};
        this.listOfcheckListReport.forEach(function (item) {
          obj[item.desOptionHeclo] ? obj[item.desOptionHeclo]++ : obj[item.desOptionHeclo] = 1;
        });
      console.log('zzzzzzzzzz',(obj['نامطلوب']+obj['مطلوب']))
        eachCheckListReportOfUnit.percent=(obj['مطلوب']/(obj['نامطلوب']+obj['مطلوب'])*100);
       // this.arr.push({ notOk: obj['نامطلوب'], ok: obj['مطلوب'], eRequestId: eachCheckListReportOfUnit.eRequestId, desOptionHeclo: eachCheckListReportOfUnit.desOptionHeclo })

       // console.log('mohammad', this.arr)
      });
      console.log('MhdfullListOfcheckListReport', this.fullListOfcheckListReport)
      this.dataSourceChecklistReport = new MatTableDataSource(this.fullListOfcheckListReport);
      //this.PercentageOfOptions(this.listOfcheckListReport)
      // const groupBy = (key) => this.fullListOfcheckListReport.reduce((total, currentValue) => {
      //   const newTotal = total;
      //   if (
      //     total.length &&
      //     total[total.length - 1][key] === currentValue[key]
      //   )
      //     newTotal[total.length - 1] = {
      //       ...total[total.length - 1],
      //       ...currentValue,
      //       //  Value: parseInt(total[total.length - 1].Value) + parseInt(currentValue.Value),
      //     };
      //   else newTotal[total.length] = currentValue;
      //   return newTotal;
      // }, []);

      // let industrialWasteGroupby = ((groupBy('eRequestId')));
      // console.log('mahshid', industrialWasteGroupby)
      //this.dataSourceReportindustrialWastePerUnit = new MatTableDataSource(this.averagesOfNam_measur_hemrp);



      //this.viewThePercentageOfOptions(success)
      // this.dataSource = new MatTableDataSource(success);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      //this.commonService.loading = false;

    })
  }



  PercentageOfOptions(data) {


    // const groupBy = (key) => this.fullListOfcheckListReport.reduce((total, currentValue) => {
    //   const newTotal = total;
    //   if (
    //     total.length &&
    //     total[total.length - 1][key] === currentValue[key]
    //   )
    //     newTotal[total.length - 1] = {
    //       ...total[total.length - 1],
    //       ...currentValue,
    //       //  Value: parseInt(total[total.length - 1].Value) + parseInt(currentValue.Value),
    //     };
    //   else newTotal[total.length] = currentValue;
    //   return newTotal;
    // }, []);

    // let industrialWasteGroupby = ((groupBy('eRequestId')));
    // console.log('mahshid', industrialWasteGroupby)
    // industrialWasteGroupby.forEach(successAllCheckListWithGroupby => {
    //   data.forEach(successCheckList => {
    //     if (successAllCheckListWithGroupby.eRequestId == successCheckList.eRequestId) {
    //       this.arr.push({ desOptionHeclo: successAllCheckListWithGroupby.desOptionHeclo, eRequestId: successAllCheckListWithGroupby.eRequestId })
    //       console.log('arr', this.arr)

    //     }
    //   });
    // });


    // let optionsText = [];
    // data.forEach(eachRowOfReport => {
    //   if (optionsText != eachRowOfReport['desOptionHeclo']) {
    //     optionsText.push(eachRowOfReport['desOptionHeclo'])
    //   }
    // }); console.log('optionsText', optionsText)

    // var counts = {};

    // for (var i = 0; i < optionsText.length; i++) {
    //   if (!counts.hasOwnProperty(optionsText[i] = optionsText[i])) {
    //     counts[optionsText[i]] = 1;
    //   }
    //   else {
    //     counts[optionsText[i]]++;
    //   }
    // }

    // console.log('counts', counts);
    // this.counts = JSON.stringify(counts)
    // let sum = Object.keys(counts).reduce((s, k) => s += counts[k], 0);

    // this.percentage = Object.keys(counts).map(k => ({ [k]: '%' + (counts[k] / sum * 100).toFixed(2) }));
    // this.percentage = JSON.stringify(this.percentage)
    // console.log('percentage', this.percentage);

    // this.averagesOfNam_measur_hemrp.push({ score: ((average) * 20) / 100, ratio: 2, nam_location_hsloc: WorkbookReportOfUnit[0].nam_location_hsloc, nam_measur_hemrp: WorkbookReportOfUnit[0].e_monitor_request_id, average: average })


  }
}

