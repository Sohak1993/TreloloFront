import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullList } from '../models/List/fullList-model';
import { List } from '../models/List/list-model';
import { Project } from '../models/project/project-model';
import { Task } from '../models/Task/task-model';
import { ListService } from '../services/list.service';
import { ProjectsService } from '../services/projects.service';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { HelpersService } from '../services/helpers.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId!: number;
  project!: Project;

  lists: List[] = [];
  tasks: Task[] = [];
  fullLists: FullList[] = [];

  openedTask!: Task;
  openedTaskForm!: FormGroup;

  taskModalIsVisible: boolean = false;

  constructor(
    public _helperService: HelpersService,
    private _activeRoute: ActivatedRoute,
    private _projectService: ProjectsService,
    private _taskService: TaskService,
    private _listService: ListService,
    private _fb: FormBuilder
  ) {
    this.openedTaskForm = this._fb.group({
      name: [, [Validators.required]],
      deadLine: [, []]
    })
  }

  ngOnInit(): void {
    this.projectId = this._activeRoute.snapshot.params['id'];
    this._projectService.getById(this.projectId).subscribe({
      next: (res) => {
        this.project = res;
      }
    })

    this._listService.getByProject(this.projectId).subscribe({
      next: (res) => {
        this.lists = res;

        // Pour chaque liste on construit une fullList avec toutes ses tâches
        this.lists.forEach(list => {
          this._taskService.getByList(list.id).subscribe({
            next: (res) => {
              this.fullLists.push(new FullList(
                list.id,
                list.name,
                list.idProject,
                list.deadLine,
                list.creationDate,
                res
              ))
            }
          })
        })
      }
    })
  }

  openTask(idTask: number) {
    this._taskService.getById(idTask).subscribe({
      next: (res) => {
        this.openedTask = res
      }
    })
    this.taskModalIsVisible = true;
  }

  updateTask() {
    this.openedTask.name = this.openedTaskForm.value.name;
    this.openedTask.deadLine = this.openedTaskForm.value.deadLine;

    this._taskService.update(this.openedTask).subscribe({
      next: (res) => {

      }
    });
  }
}
