
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
    'nam_location_hsloc', 's_location_id', 'nam_param_hemop',  'nam_real_measur_hemrp', 'flg_abssence'];
  displayedColumnsReportindustrialWastePerUnit = ['number', 'ratio', 'nam_location_hsloc', 'average', 'score'
    , 'coefficientCalculation'];
  displayedColumnsCheckListReportPerUnit = ['number', 'ratio',  'nam_location_hsloc', 'average', 'score'
    , 'coefficientCalculation'];
  displayedColumnsAverageMonthlyUnit = ['number', 'loc', 'value'];
  displayedColumnsChecklistReport = ['number', 'namChkHecli', 'requestDescriptionHsrch',
    'desQuestionHeclq', 'desOptionHeclo', 'desExplainQuestionHscha', 'requestDateJalaliHsrch',
    'namAssessorHsrch', 'namLocationHsrch', 'unitCehckListsHecli', 'namDepartmentHecli', 'namEvaluationAreaHsrch'];
    displayedColumnsZoneWithoutMeasurement = ['type', 'ratio', 'percentAvg', 'scoreZone', 'coefficientCalculationZone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  dataSourceReportindustrialWastePerUnit: MatTableDataSource<any>
  dataSourceChecklistReportPerUnit: MatTableDataSource<any>
  dataSourceChecklistReport: MatTableDataSource<any>
  selectedDate: any
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  listOfWorkbookReport: any;
  filterZoneId: any;
  listLocationsOfZones: any;
  fullListOfWorkbookReport: any;
  counts: any;
  percentage: any;
  buildAvgOfUnits: any;
  listOfcheckListReport: any;
  fullListOfcheckListReport: any;
  department = [
    { value: "01", viewValue: 'فروردین' },
    { value: "02", viewValue: 'اردیبهشت' },
    { value: "03", viewValue: 'خرداد' },
    { value: "04", viewValue: 'تیر' },
    { value: "05", viewValue: 'مرداد' },
    { value: "06", viewValue: 'شهریور' },
    { value: "07", viewValue: 'مهر' },
    { value: "08", viewValue: 'آبان' },
    { value: "09", viewValue: 'آذر' },
    { value: "10", viewValue: 'دي' },
    { value: "11", viewValue: 'بهمن' },
    { value: "12", viewValue: 'اسفند' },
  ];
  m: moment.Moment;
  selectedZoneName: any;
  averagesOfNam_measur_hemrp: any;
  averagesOfCheckListReport: any;
  averageMonthlyUnit: any;
  dataSourceAverageMonthlyUnit: MatTableDataSource<unknown>;
  zoneWithoutMeasurement: any;
  zoneWithoutMeasurementIndustrialWaste: any;
  zoneWithoutMeasurementIndustrialCleaning: any[];
  dataSourceZoneWithoutMeasurement: MatTableDataSource<unknown>;

  constructor(public commonService: CommonService,
    public workbokReport: workbookReportService,
    public locationsOfZones: LocationsOfZonesService,
    public checklistAssesmentService: checklistAssesmentService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public recievedData

  ) {

  }
  ngOnInit(): void {
    this.m = moment();
    this.m.locale('fa');
    this.fullListOfcheckListReport = [];
    this.fullListOfWorkbookReport = [];
    this.averagesOfNam_measur_hemrp = [];
    this.averagesOfCheckListReport = [];
    this.averageMonthlyUnit = [];
    this.zoneWithoutMeasurement = [];

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
        this.selectedZoneName = data.namZone;
        this.averagesOfNam_measur_hemrp = [];
        let body = {
          "zoneId": data.zoneId
        }
        //به ازای هر مکان داخل ناحیه درخواست به سرور میرود
        this.locationsOfZones.FilterListLocationsOfZone(body).subscribe(
          (success) => {
            this.listLocationsOfZones = success;
            this.listLocationsOfZones.forEach(eachLocation => {
              this.getWorkbookReport(eachLocation.locationId)
              this.getReportOfChecklists(eachLocation.namLocation)

            });
          },
          (error) => {
          }
        )
      }
    )
  }
  getWorkbookReport(s_location_id) {
    this.fullListOfWorkbookReport = [];
    if (!this.selectedDate) {
      this.commonService.showEventMessage("ماه را انتخاب کنید")
      this.commonService.loading = false;
      return
    }
    let body = {
      s_location_id: s_location_id,
      dat_request_hemre_jalali: this.m.format('YYYY') + this.selectedDate,
    }
    this.commonService.loading = true;
    this.workbokReport.getReport(body).subscribe((success) => {
      this.listOfWorkbookReport = success;

      this.percentageOfScore(this.listOfWorkbookReport)
      this.listOfWorkbookReport.forEach(eachWorkbookReportOfUnit => {
        this.fullListOfWorkbookReport.push(eachWorkbookReportOfUnit);
      });

      this.dataSourceReportindustrialWastePerUnit = new MatTableDataSource(this.averagesOfNam_measur_hemrp);
      this.dataSourceChecklistReportPerUnit = new MatTableDataSource(this.averagesOfCheckListReport);
      ; this.averagesOfNam_measur_hemrp.forEach(rowOfFirstTable => {
        this.averagesOfCheckListReport.forEach(rowOf2ndTable => {
          if (rowOfFirstTable.nam_location_hsloc == rowOf2ndTable.nam_location_hsloc) {
            this.averageMonthlyUnit.push({ loc: rowOf2ndTable.nam_location_hsloc, value: (rowOfFirstTable.coefficientCalculation + rowOf2ndTable.coefficientCalculation) / 4 })
          }
        });
      });
      this.averageMonthlyUnit = this.averageMonthlyUnit.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.loc === value.loc && t.value === value.value
        ))
      )

      this.dataSourceAverageMonthlyUnit = new MatTableDataSource(this.averageMonthlyUnit);
      this.dataSource = new MatTableDataSource(this.fullListOfWorkbookReport);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;

    });


  }
  percentageOfScore(WorkbookReportOfUnit) {
    let totalPercent = 0;

    let average;
    let length = WorkbookReportOfUnit.length;
    if (WorkbookReportOfUnit.length > 0) {
      WorkbookReportOfUnit.forEach(eachWorkbookReportOfUnit => {
        eachWorkbookReportOfUnit.nam_measur_hemrp = Number(eachWorkbookReportOfUnit.nam_measur_hemrp)
        totalPercent += eachWorkbookReportOfUnit.nam_measur_hemrp
        //منهای یک چون ردیف اول مقدار اندازه گیری صفر است
        average = (totalPercent / (length - 1))
      });
      let ratio = 2;
      this.averagesOfNam_measur_hemrp.push({
        score: ((average) * 20) / 100,
        ratio: ratio, nam_location_hsloc: WorkbookReportOfUnit[0].nam_location_hsloc,
        nam_measur_hemrp: WorkbookReportOfUnit[0].e_monitor_request_id,
        average: average,
        coefficientCalculation: ratio * Number(((average) * 20) / 100)
      })

      console.log("averagesOfNam_measur_hemrp", this.averagesOfNam_measur_hemrp)
      let summ = 0
      this.averagesOfNam_measur_hemrp.forEach(eachAvegargesOfUnit => {
        summ = eachAvegargesOfUnit.average + summ
        this.zoneWithoutMeasurementIndustrialWaste = [];
        this.zoneWithoutMeasurementIndustrialWaste.push({
          coefficientCalculationZone: (((summ / this.averagesOfNam_measur_hemrp.length) * 20) / 100) * ratio,
          scoreZone: (((summ / this.averagesOfNam_measur_hemrp.length) * 20) / 100),
          ratio: ratio, type: "ضایعات صنعتی", percentAvg: (summ / this.averagesOfNam_measur_hemrp.length)
        })
      });
      //مرج کردن آرایه های نمرات واحد های ناحیه
      var arr1 = this.zoneWithoutMeasurementIndustrialWaste;
      var arr2 = this.zoneWithoutMeasurementIndustrialCleaning;
      this.zoneWithoutMeasurement = [...arr1, ...arr2];
      console.log(' this.zoneWithoutMeasurement', this.zoneWithoutMeasurement)
      this.dataSourceZoneWithoutMeasurement = new MatTableDataSource(this.zoneWithoutMeasurement);


    }

  }
  getReportOfChecklists(namLocation) {

    switch (this.selectedDate) {
      case "01":
      case "02":
      case "03":
      case "04":
      case "05":
      case "06":
        {
          const body = {
            namChkHecli: "",
            namDepartmentHecli: "",
            namAssessorHsrch: "",
            namLocationHsrch: namLocation,
            desQuestionHeclq: "",
            desOptionHeclo: "",
            namEvaluationAreaHsrch: "",
            startdateHsrch: moment(this.m.format('YYYY') + this.selectedDate + "01", 'jYYYY/jM/jD'),
            enddateHsrch: moment(this.m.format('YYYY') + this.selectedDate + "31", 'jYYYY/jM/jD')
          }
          this.serverFilter(body)
          break
        }
      case "07":
      case "08":
      case "09":
      case "10":
      case "11":
        {
          const body = {
            namChkHecli: "",
            namDepartmentHecli: "",
            namAssessorHsrch: "",
            namLocationHsrch: namLocation,
            desQuestionHeclq: "",
            desOptionHeclo: "",
            namEvaluationAreaHsrch: "",
            startdateHsrch: moment(this.m.format('YYYY') + this.selectedDate + "01", 'jYYYY/jM/jD'),
            enddateHsrch: moment(this.m.format('YYYY') + this.selectedDate + "30", 'jYYYY/jM/jD')
          }
          this.serverFilter(body)
          break;
        }
      case "12": {
        const body = {
          namChkHecli: "",
          namDepartmentHecli: "",
          namAssessorHsrch: "",
          namLocationHsrch: namLocation,
          desQuestionHeclq: "",
          desOptionHeclo: "",
          namEvaluationAreaHsrch: "",
          startdateHsrch: moment(this.m.format('YYYY') + this.selectedDate + "01", 'jYYYY/jM/jD'),
          enddateHsrch: moment(this.m.format('YYYY') + this.selectedDate + "29", 'jYYYY/jM/jD')
        }
        this.serverFilter(body)
        break;
      }
        break;

    }


  }
  serverFilter(body) {
    this.commonService.loading = true;
    this.checklistAssesmentService.filterListOfChecklistReport(body).subscribe((success) => {
      console.log('success', success)
      this.listOfcheckListReport = success;
      this.PercentageOfOptions(this.listOfcheckListReport)
      this.listOfcheckListReport.forEach(eachCheckListReportOfUnit => {
        this.fullListOfcheckListReport.push(eachCheckListReportOfUnit);
      });
      console.log('MhdfullListOfcheckListReport', this.fullListOfcheckListReport)
      this.dataSourceChecklistReport = new MatTableDataSource(this.fullListOfcheckListReport);
    })
  }
  PercentageOfOptions(data) {
    if (data.length > 0) {
      let optionsText = [];
      let ratio = 2

      data.forEach(eachRowOfReport => {
        optionsText.push(eachRowOfReport['desOptionHeclo'])

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
      this.percentage = Object.keys(counts).map(k => ({ [k]: + (counts[k] / sum * 100).toFixed(2) }));
      console.log('nini', this.percentage);
      if (data[0]) {

        this.averagesOfCheckListReport.push({
          average: (counts['مطلوب'] / optionsText.length) * 100,
          nam_location_hsloc: data[0]['namLocationHsrch'],
          nam_measur_hemrp: 0,
          score: (((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100,
          ratio: ratio,
          coefficientCalculation: ratio * Number((((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100)
        })
      }
      //پیدا کردن میانگین در صدها برای در آوردن نمره ناحیه
      let summ = 0
      this.averagesOfCheckListReport.forEach(eachAvegargesOfUnit => {
        summ = eachAvegargesOfUnit.average + summ
        this.zoneWithoutMeasurementIndustrialCleaning = [];
        this.zoneWithoutMeasurementIndustrialCleaning.push({
          coefficientCalculationZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100) * ratio,
          scoreZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100),
          ratio: ratio, type: "نظافت صنعتی", percentAvg: (summ / this.averagesOfCheckListReport.length)
        })
      });

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

