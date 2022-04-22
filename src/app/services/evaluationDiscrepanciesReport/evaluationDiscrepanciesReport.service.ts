import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class evaluationDiscrepanciesReportService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfevaluationDiscrepancies():Observable<any>{
    return this.configService.get('evaluationDiscrepanciesReport');
  }
  // public selectListOfQuestionsOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListQuestions/GetHseECheckListQuestionsOfChecklist/'+HecliECheckListId);
  // }
  
  public insertListOfevaluationDiscrepancies(body):Observable<any>{
    return this.configService.post('evaluationDiscrepanciesReport',body);
  }
  
  public updateListOfevaluationDiscrepancies(id,body):Observable<any>{
    return this.configService.put('evaluationDiscrepanciesReport/'+id,body);
  }
  public deleteListOfevaluationDiscrepancies(id):Observable<any>{
    return this.configService.delete('evaluationDiscrepanciesReport/'+id);
  }

}
