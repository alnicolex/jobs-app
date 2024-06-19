import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Companies } from '../models/companies';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private dbcompanies = '/companies';
  private _companyName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public _currentCompanyName: Observable<string | null> = this._companyName.asObservable();

  constructor(private db: AngularFireDatabase) { }

  setCompanyName(companyName: string): void {
    this._companyName.next(companyName);
  }

  getCompanyName(): Observable<string | null> {
    return this._currentCompanyName;
  }

  getCompanyByIdUser(user: string): Observable<Companies | null> {
    return this.db.object(`${this.dbcompanies}/${user}`).valueChanges().pipe(
      map(c => c ? (c as Companies) : null)
    );
  }

}
