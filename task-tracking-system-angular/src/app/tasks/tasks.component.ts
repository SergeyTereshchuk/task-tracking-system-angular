import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TaskService, AuthService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

    tasks = [];
    positions = [];
    userInfo: any;

    newTaskForm: FormGroup;
    updateTaskForm: FormGroup;

    newTab = true;
    updateTab = false;

    error: string;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthService,
        private taskService: TaskService
    ) {
        this.authenticationService.userInfo.subscribe(x => this.userInfo = x);
    }

    ngOnInit() {
      this.loadUserTasks();

      this.newTaskForm = this.formBuilder.group({
        subject: ['', Validators.required],
        status: ['', Validators.required],
        idProject: ['', Validators.required],
        idUser: ['', Validators.required],
        endDate: [''],
        description: [''],
      });

      this.updateTaskForm = this.formBuilder.group({
        id: ['', Validators.required],
        status: ['', Validators.required],
        endDate: [''],
        description: [''],
      });
    }

    // convenience getter for easy access to form fields
    get newf() { return this.newTaskForm.controls; }
    get updatef() { return this.updateTaskForm.controls; }

    onNewSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.newTaskForm.invalid) {
        return;
      }

      this.loading = true;
      this.taskService.create({
        Subject: this.newf.subject.value,
        Status: this.newf.status.value,
        IdProject: this.newf.idProject.value,
        EndDate: this.newf.endDate.value,
        Description: this.newf.description.value,
      }, this.newf.idUser.value)
        .pipe(first())
        .subscribe(
            data => {
                  this.loading = false;
                  this.loadUserTasks();
                  this.submitted = false;
                  this.taskService.notifyOnNewTask(this.newf.idUser.value);
          },
            error => {
                this.error = error;
                this.loading = false;
            });
    }
    onUpdateSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.updateTaskForm.invalid) {
        return;
      }

      this.loading = true;
      this.taskService.update({
        Id: this.updatef.id.value,
        Status: this.updatef.status.value,
        EndDate: this.updatef.endDate.value,
        Description: this.updatef.description.value,
      })
        .pipe(first())
        .subscribe(
            data => {
                  this.loading = false;
                  this.loadUserTasks();
                  this.submitted = false;
          },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

    switchForms() {
      this.newTab = !this.newTab;
      this.updateTab = !this.updateTab;
    }

    deleteTask(id: number) {
        this.taskService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadUserTasks());
    }

    taskUserId(task) {
      return this.positions.find(p => p.Id === task.IdPerformer).IdUser;
    }

    private loadUserTasks() {
      if (this.userInfo.Role === 'admin') {
        this.taskService.getPositions()
            .pipe(first())
            .subscribe(positions => this.positions = positions);
        this.taskService.getAll()
            .pipe(first())
            .subscribe(tasks => this.tasks = tasks);
      } else if (this.userInfo.Role === 'manager') {
        this.taskService.getPositions()
            .pipe(first())
            .subscribe(positions => this.positions = positions);
        this.taskService.getManagedCurrent()
        .pipe(first())
        .subscribe(tasks => this.tasks = tasks);
      } else if (this.userInfo.Role === 'user') {
        this.taskService.getCurrent()
        .pipe(first())
        .subscribe(tasks => this.tasks = tasks);
      }
    }
}
