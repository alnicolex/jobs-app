import { Companies } from './../models/companies';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  company: Companies = new Companies();
  private dbjobs = '/companies';
  companyDB: AngularFireList<Companies>;

  constructor(private _auth : AngularFireAuth,
    private firestore: AngularFirestore,
    private db: AngularFireDatabase
  ) {

    this.companyDB = db.list(this.dbjobs);

   }

  async login(email: string, password: string): Promise<boolean>  {
    try{
      await this._auth.signInWithEmailAndPassword(email, password);
      return true;
    }
    catch(e) {
      alert("Error login")
      console.log("Error login: " + e);
      return false;
    }
  }

  async register(email: string, password: string, company: string): Promise<boolean>  {
    try{
      const userCredential = await this._auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        this.company.created_date = new Date().getTime();
        this.company.name = company;
        this.company.user = user.uid;

        await this.companyDB.push(this.company);
      }
      return true;
    }
    catch(e) {
      alert("Error sign-up: " + e)
      console.log("Error sign-up:" + e);
      return false;
    }
  }

  async logOut(): Promise<void>{
    try {
      await this._auth.signOut();
    } catch (e) {
      console.error('Logout error', e);
    }

  }

  getAuthState(): Observable<boolean> {
    return this._auth.authState.pipe(map(user => !!user));
  }

  getCompany(): Observable<firebase.User | null> {
    return this._auth.authState;
  }


  getCompanyData(uid: string): Observable<Companies | null> {
    return this.firestore.collection('companies').doc<Companies>(uid).valueChanges().pipe(
      map(company => company ? company : null)
    );
  }

}
