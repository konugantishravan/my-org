import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, of, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CompetetitionsResponse, Competition, Team } from '../models/footbal.models';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'football-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage implements OnInit {
    teams$: Observable<Team[]> | undefined;
    competitionId: any;
    constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation()?.extras.state) {
              this.competitionId = this.router.getCurrentNavigation()?.extras.state?.['competitionId'];
            }
          });
    }
    ngOnInit(): void {
        this.teams$ = this.appService.getTeams(this.competitionId);
    }
    teamClick(id: number) {
        this.router.navigateByUrl('tabs/teams-details', {state : {teamId: id}});
    }

}