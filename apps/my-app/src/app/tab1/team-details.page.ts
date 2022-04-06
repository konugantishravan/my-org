import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, of, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CompetetitionsResponse, Competition, Team, TeamDetailsResponse } from '../models/footbal.models';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'football1-teams',
  templateUrl: 'team-details.page.html'
})
export class TeamDetailsPage implements OnInit {
  teamDetails$: Observable<TeamDetailsResponse> | undefined;
  teamId: any;
    constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()?.extras.state) {
              this.teamId = this.router.getCurrentNavigation()?.extras.state?.['teamId'];
            }
          });
    }
    ngOnInit(): void {
      if(this.teamId)
        this.teamDetails$ = this.appService.getTeamDetails(this.teamId);
    }

}