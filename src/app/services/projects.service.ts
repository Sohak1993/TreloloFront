import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Project } from '../models/project/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _http: HttpClient) { }

  _url = 'https://localhost:7085/api/project/'


  getByUser(idUser: number): Observable<Project[]> {
    return this._http.get<Project[]>(this._url + 'getByUser/' + idUser)
  }

  getById(idProject: number): Observable<Project> {
    return this._http.get<Project>(this._url + idProject)
  }

  createProject(project: Project) {
    return this._http.post(this._url, project)
  }

  delete(idProject: number){
    return this._http.delete(this._url + idProject)
  }
}
