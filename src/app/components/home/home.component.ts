import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/models/jobs';
import { JobsService } from 'src/app/services/jobs.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _jobList?: Jobs[];
  _job?: Jobs;
  _jobIndex = -1;
  jobs$?: Observable<Jobs[]>;

  constructor(
    private jobService: JobsService,
    private router: Router
  ) { }

  // refresh from DB
  refresh(): void{
    this._job = undefined;
    this._jobIndex = -1;
    this.jobAll();
  }

  // query jobs
  jobAll(): void {
    this.jobService.getAll().snapshotChanges().pipe(
      map(jb =>
        jb.map(j => ({
          key: j.payload.key, ...j.payload.val()
          })),
      )
    ).subscribe(data => {
      this._jobList = data;
      console.log(this._jobList);
    });


    this.jobs$ = this.jobService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
      map(items => items.reverse())  // Invertir el orden para obtener descendente
    );

  }

  removeAll(): void {
    this.jobService.deleteAll()
    .then(() => this.refresh())
    .catch(e => console.log(e));
  }

  ngOnInit(): void {
    this.jobAll();
  }

  jobConfig(_jobList : Jobs, index : number ):void{
    this._job = _jobList;
    this._jobIndex = index;
  }

  detail(j: Jobs): void{
    this.router.navigate(['/detail'], { queryParams: {
      key: j.key,
      job_name: j.job_name,
      company_id: j.company_id,
      location: j.location,
      salary: j.salary,
      created_date: j.created_date,
      employment_type: j.employment_type,
      job_description: j.job_description,
      qualifications: j.qualifications
    }});
  }

}

