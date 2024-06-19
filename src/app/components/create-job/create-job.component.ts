import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/models/jobs';
import { JobsService } from 'src/app/services/jobs.service';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  job: Jobs = new Jobs();
  dataOk = false;
  private paramSubscription: Subscription | undefined;


  constructor(
    private jobService: JobsService,
    private router: Router,
    private companyService: CompaniesService
   ) { }


  ngOnInit(): void {
    this.paramSubscription = this.companyService.getCompanyName().subscribe(companyName => {
      this.job.company_id = companyName ?? undefined;
    });

  }

  saveJob(): void{
    this.jobService.create(this.job).then(() => {
      console.log("job create!")
      this.dataOk = true;
    });
  }

  newJob(){
    this.dataOk = false;
    this.job = new Jobs();
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
