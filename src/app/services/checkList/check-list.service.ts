import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {

  constructor(public configService:ConfigService) { }

public getListOfcheckLists():Observable<any>{
  return this.configService.get('HseECheckLists');
}
}
