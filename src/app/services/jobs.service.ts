import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jobs } from '../models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private dbjobs = '/jobs';
  jobsList: AngularFireList<Jobs>;

  constructor(private db: AngularFireDatabase) {
    this.jobsList = db.list(this.dbjobs, ref => ref.orderByChild('created_date'));
  }

  getAll(): AngularFireList<Jobs> {
    return this.jobsList;
  }

  create(job: Jobs): any {
    job.created_date = new Date().getTime();
    return this.jobsList.push(job);
  }

  deleteAll(): Promise<void> {
    return this.jobsList.remove();
  }

  getJobById(id: string): Observable<Jobs | null> {
    return this.db.object(`${this.dbjobs}/${id}`).valueChanges().pipe(
      map(job => job ? (job as Jobs) : null)
    );
  }

}
