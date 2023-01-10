import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../models/project/project-model';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: Project[] = [];
  cardProjColor: string = 'grey';
  idUser: number = 1;
  registerForm: FormGroup;
  showAddForm: boolean = false;

  constructor(
    private _projectsService: ProjectsService,
    private _builder: FormBuilder,
    private _router: Router
  ) {

    this.registerForm = this._builder.group({
      name: [null, [Validators.required, Validators.maxLength(2), Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {
    this.initProj()
  }

  initProj(){
    this._projectsService.getByUser(this.idUser).subscribe({
      next: (res) => {
        this.projects = res;
      }
    })

  }

  switchFormVisibility(): void {
    this.showAddForm = !this.showAddForm;
  }

  addProject(): void {
    this.showAddForm = !this.showAddForm;

    let project = new Project(
      this.registerForm.value.name,
      1
    )

    this._projectsService.createProject(project).subscribe({
      next: (res) => {
        this.projects.push(project)
        this.initProj()
      }
    })
  }
}
