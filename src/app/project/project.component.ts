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
import { HelpersService } from '../services/helpers.service';
import { NewList } from '../models/List/newList-model';
import { newTask } from '../models/Task/newTask-model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId: number;
  project: Observable<Project> = of();

  lists: List[] = [];
  tasks: Task[] = [];
  fullLists: FullList[] = [];
  openedTask!: Task;
  openedTaskForm: FormGroup;

  newList!: NewList;
  addListForm: FormGroup;

  addTaskForm: FormGroup;

  taskModalIsVisible: boolean = false;
  addListFromIsVisible: boolean = false;

  constructor(
    private _router : Router,
    public _helperService: HelpersService,
    private _activeRoute: ActivatedRoute,
    private _projectService: ProjectsService,
    private _taskService: TaskService,
    private _listService: ListService,
    private _fb: FormBuilder
  ) {

    this.projectId = this._activeRoute.snapshot.params['id'];

    this.openedTaskForm = this._fb.group({
      name: [, [Validators.required]],
      deadLine: [, []]
    })

    this.addListForm = this._fb.group({
      name: [, [Validators.required]],
      deadLine: [, []]
    })

    this.addTaskForm = this._fb.group({
      name: [, [Validators.required]],
      deadLine: [, []]
    })
  }

  ngOnInit(): void {
    this.initProject()
  }

  initProject(){
    this.project = this._projectService.getById(this.projectId);

    this._listService.getByProject(this.projectId).subscribe({
      next: (res) => {
        this.lists = res;

        this.fullLists = [];
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

  // Delete Project /////////////////////////////////////
  deleteProj(projectId: number){
    this._projectService.delete(projectId).subscribe({
      next: (res) => {
        this._router.navigate(['projects'])
      }
    })
  }

  // Edit Task //////////////////////////////////////////
  openTask(idTask: number) {
    this._taskService.getById(idTask).subscribe({
      next: (res) => {
        this.openedTask = res
        //this.openedTaskForm.patchValue(res)
        this.openedTaskForm.controls["name"].setValue(res.name)
        this.openedTaskForm.controls["deadLine"].setValue(this._helperService.formatDate('yyyy-MM-dd', res.deadLine))
      }
    })
    this.taskModalIsVisible = true;
  }

  updateTask() {
    console.log(this.openedTaskForm.value.name)

    this.openedTask.name = this.openedTaskForm.value.name;
    this.openedTask.deadLine = this.openedTaskForm.value.deadLine;

    this._taskService.update(this.openedTask).subscribe({
      next: (res) => {
      }
    });
    this.taskModalIsVisible = false;
    this.initProject()
  }

  // Add list ////////////////////////////////////////////
  showAddListForm(){
    this.addListFromIsVisible = true;
  }

  addList(){
    this.addListFromIsVisible = false;

    this.newList = new NewList(
      this.addListForm.value.name,
      this.projectId,
      this.addListForm.value.deadLine
    )

    this._listService.createList(this.newList).subscribe({
      next: (res) => {
        this.initProject()
      }
    })
  }

  // Add Task /////////////////////////////////
  showAddTaskForm(idList : number){

    document.getElementById('addTaskModal' + idList.toString())?.removeAttribute("hidden")
    document.getElementById('newTaskButton' + idList.toString())?.setAttribute("hidden", 'true')

  }

  addTask(idList : number){

    document.getElementById('addTaskModal' + idList.toString())?.setAttribute("hidden", 'true')
    document.getElementById('newTaskButton' + idList.toString())?.removeAttribute("hidden")

    this._taskService.createTask(new newTask(
      this.addTaskForm.value.name,
      idList,
      this.addTaskForm.value.deadLine
    )).subscribe({
      next:(res) => {
        this.initProject()
      }
    })
  }

  deleteTask(){
    this._taskService.delete(this.openedTask.id).subscribe({
      next: (res) =>{

      }
    })
  }

  deleteList(idList: number){
    this._listService.delete(idList).subscribe({
      next: (res) => {
        this.initProject()
      }
    })
  }

}
