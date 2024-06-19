import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {

  }

  async login() {
    const ok = await this.authService.login(this.email, this.password);
    this.isLoggedIn = ok;
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      console.log("Login failed!");
    }
  }

  showConfirm(): void {
    const userConfirmed = confirm('Do you really want to proceed?');
    if (userConfirmed) {
      console.log('User confirmed.');
      this.router.navigate(['/home']);
    } else {
      console.log('User canceled.');
    }
  }

}
