import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';
import { Companies } from '../../models/companies';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  password: string = '';
  company: string = '';
  email: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private router: Router, private companyService: CompaniesService
  ) { }

  async register(){
    if (this.email && this.password && this.company) {
      const ok = await this.authService.register(this.email, this.password, this.company);
      this.isLoggedIn = ok;
      if (this.isLoggedIn) {
        this.companyService.setCompanyName(this.company);
        this.router.navigate(['/home']);
      } else {
        console.log("Login failed!");
      }

    } else {
      console.log("All fields are required");
    }
  }

  showConfirm(): void {
    const userConfirmed = confirm('Do you really want to proceed?');
    if (userConfirmed) {
      console.log('User confirmed.');
      this.router.navigate(['/home'])
    } else {
      console.log('User canceled.');
    }
  }

}
