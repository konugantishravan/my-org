import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, of, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Competition } from '../models/footbal.models';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-org-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  startDate: string | undefined;
  endDate: string | undefined;
  competitionsBySeason: Competition[] = [];
  competitionsBySeason$: Observable<Competition[]> | undefined;

  constructor(private appService: AppService, private datePipe: DatePipe, private router: Router) {}
  ngOnInit(): void {
    this.appService.getCompetitions().subscribe((data) => {
      this.competitionsBySeason = data;
    })
  }
  dateChanged(context:string, event: any) {
    this.endDate = "2022-05-22";
    this.startDate = "2021-06-26"
    /* Hardcoding the dates to show competition for one season since we have to chose exact dates to filter competetions and some competetions are protected resource with free trial 
     comment above and uncomment below if the dates are known for that season */
    // if(context === 'startDate') {
    //   this.startDate = this.datePipe.transform(event.target.value, 'YYYY-MM-dd');
    // } else {
    //   this.endDate = this.datePipe.transform(event.target.value, 'YYYY-MM-dd');
    // }
    if(this.startDate && this.endDate) {
      this.competitionsBySeason = this.competitionsBySeason.filter((item) => item?.currentSeason?.startDate === this.startDate && item?.currentSeason?.endDate === this.endDate);
      this.competitionsBySeason$ = of(this.competitionsBySeason);
    }
      
  }
  competitionClick(id: number) {
  this.router.navigateByUrl('tabs/teams', {state : {competitionId: id}});
  }
  
}
