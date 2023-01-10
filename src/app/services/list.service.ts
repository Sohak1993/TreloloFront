import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../models/List/list-model';
import { Observable } from 'rxjs';
import { NewList } from '../models/List/newList-model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private _http: HttpClient) { }

  _url = 'https://localhost:7085/api/list/'

  getByProject(idProject: number): Observable<List[]> {
    return this._http.get<List[]>(this._url + 'getByProject/' + idProject)
  }

  createList(list: NewList) {
    return this._http.post(this._url, list)
  }

  delete(idList: number) {
    return this._http.delete(this._url + idList)
  }
}
