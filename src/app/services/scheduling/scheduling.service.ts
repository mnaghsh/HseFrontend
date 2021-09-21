import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfScheduling():Observable<any>{
    return this.configService.get('scheduling');
  }
  // public selectListOfQuestionsOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListQuestions/GetHseECheckListQuestionsOfChecklist/'+HecliECheckListId);
  // }
  
  public insertListOfScheduling(body):Observable<any>{
    return this.configService.post('scheduling',body);
  }
  
  public updateListOfScheduling(id,body):Observable<any>{
    return this.configService.put('scheduling/'+id,body);
  }
  public deleteListOfScheduling(id):Observable<any>{
    return this.configService.delete('scheduling/'+id);
  }

}
