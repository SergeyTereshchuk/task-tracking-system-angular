import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ProjectService, AuthService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

    projects = [];
    userInfo: any;

    newProjectForm: FormGroup;
    updateProjectForm: FormGroup;

    newTab = true;
    updateTab = false;

    error: string;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthService,
        private projectService: ProjectService
    ) {
        this.authenticationService.userInfo.subscribe(x => this.userInfo = x);
    }

    ngOnInit() {
      this.loadUserProjects();

      this.newProjectForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['']
      });

      this.updateProjectForm = this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        description: ['']
      });
    }

    // convenience getter for easy access to form fields
    get newf() { return this.newProjectForm.controls; }
    get updatef() { return this.updateProjectForm.controls; }

    onNewSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.newProjectForm.invalid) {
        return;
      }

      this.loading = true;
      this.projectService.create({Name: this.newf.name.value, Description: this.newf.description.value})
        .pipe(first())
        .subscribe(
            data => {
                  this.loading = false;
                  this.loadUserProjects();
                  this.submitted = false;
          },
            error => {
                this.error = error;
                this.loading = false;
            });
    }
    onUpdateSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.newProjectForm.invalid) {
        return;
      }

      this.loading = true;
      this.projectService.update({Id: this.updatef.id.value, Name: this.updatef.name.value, Description: this.updatef.description.value})
        .pipe(first())
        .subscribe(
            data => {
                  this.loading = false;
                  this.loadUserProjects();
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

    deleteProject(id: number) {
        this.projectService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadUserProjects());
    }

    private loadUserProjects() {
      if (this.userInfo.Role === 'admin') {
        this.projectService.getAll()
            .pipe(first())
            .subscribe(projects => this.projects = projects);
      } else {
        this.projectService.getCurrent()
        .pipe(first())
        .subscribe(projects => this.projects = projects);
      }
    }

}
