import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class isSuiteLoginService {

  constructor(public configService:ConfigService) { }

  
  public getToken():Observable<any>{
    return this.configService.get('checklistReport');
  }

  public filterListOfChecklistReport(body):Observable<any>{
    return this.configService.post('checklistReport/FilterReportChecklist',body);
  }

  public insertListOfChecklistAssesment(body):Observable<any>{
    return this.configService.post('HseEChecklistAssessments',body);
  }
  
  public updateListOfChecklistAssesment(id,body):Observable<any>{
    return this.configService.put('HseEChecklistAssessments/'+id,body);
  }
  public deleteListOfChecklistAssesment(id):Observable<any>{
    return this.configService.delete('HseEChecklistAssessments/'+id);
  }


}
