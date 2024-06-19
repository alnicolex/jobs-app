import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  title = 'Job portal';
  isLoggedIn: boolean = false;
  company: string = '';
  private companySubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;


  constructor(private authService: AuthService,
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
    this.companySubscription = this.companyService.getCompanyName().subscribe(companyName => {
      this.company = companyName ?? 'Unregistered user... ';
    });


  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.companySubscription) {
      this.companySubscription.unsubscribe();
    }
  }

  async logout() {
    await this.authService.logOut();
    this.isLoggedIn = false;
    this.company = '';
  }

}
