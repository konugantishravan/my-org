import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CompetetitionsResponse, TeamDetailsResponse, TeamsResponse } from './models/footbal.models';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AppService {
  private base_url = 'http://api.football-data.org/v2'
  private competitionsUrl = `${this.base_url}/competitions`; // URL to web api
  private teamsUrl = `${this.base_url}/competitions`

  constructor(private http: HttpClient) {}

  getCompetitions() {
    return this.http
      .get<CompetetitionsResponse>(this.competitionsUrl)
      .pipe(map(data => data.competitions), catchError(this.handleError));
  }
  getTeams(compId: string) {
    return this.http.get<TeamsResponse>(`${this.base_url}/competitions/${compId}/teams`)
      .pipe(map(data => data.teams), catchError(this.handleError));
  }
  getTeamDetails(teamId: string) {
    return this.http.get<TeamDetailsResponse>(`${this.base_url}/teams/${teamId}`)
      .pipe(map(data => data), catchError(this.handleError));
  }
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}