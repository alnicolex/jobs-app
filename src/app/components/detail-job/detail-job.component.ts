import { Component, OnInit   } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Jobs } from 'src/app/models/jobs';
import { filter } from 'rxjs/operators';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit{

  _job: Jobs | undefined;
  fDate: string | undefined;

  constructor(
    private router: Router, private aRoute: ActivatedRoute
  ) {
    this.aRoute.queryParams.pipe(filter(params => params.key)).subscribe(data => {
      this._job = data;
      console.log(this._job);
    });
  }


  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['/home'])
  }


}
