import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistOptionsService {

  constructor(public configService: ConfigService) { }


  public selectListOfcheckListsOptions(): Observable<any> {
    return this.configService.get('HseECheckListOptions');
  }

  public insertListOfcheckListsOptions(body): Observable<any> {
    return this.configService.post('HseECheckListOptions', body);
  }

  public updateListOfcheckListsOptions(id, body): Observable<any> {
    return this.configService.put('HseECheckListOptions/' + id, body);
  }
  public deleteListOfcheckListsOptions(id): Observable<any> {
    return this.configService.delete('HseECheckListOptions/' + id);
  }

}

