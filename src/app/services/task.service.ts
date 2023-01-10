import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newTask } from '../models/Task/newTask-model';
import { Task } from '../models/Task/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  _url = 'https://localhost:7085/api/task/'

  getByList(idList: number): Observable<Task[]> {
    return this._http.get<Task[]>(this._url + 'getByList/' + idList)
  }

  createTask(task: newTask) {
    return this._http.post(this._url, task)
  }

  delete(idTask: number) {
    return this._http.delete(this._url + idTask)
  }

  getById(idTask: number): Observable<Task> {
    return this._http.get<Task>(this._url + idTask)
  }

  update(task: Task) {
    console.log(task);
    return this._http.put(this._url, task)
  }
}
