import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let http: HttpTestingController;
  const appServiceStub = () => ({
    getCompetitions: () => of({}),
    getTeams: () =>of( [])
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService
      ]
    });
    service = TestBed.inject(AppService);
    http=TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getCompetitions should call API for competitions', (done) => {
    service.getCompetitions().subscribe((data) => {
      expect(data).toEqual([]);
    });
    const req = http.expectOne('http://api.football-data.org/v2/competitions')
    req.flush([])
    done();
  })
  it('getTeams should call API for teams', (done) => {
    service.getTeams("1").subscribe((data) => {
      expect(data).toEqual([]);
    });
    const req = http.expectOne('http://api.football-data.org/v2/competitions/1/teams')
    req.flush([])
    done();
  })
  it('getTeamDetails should call API for teams', (done) => {
    service.getTeamDetails("1").subscribe((data) => {
      expect(data).toEqual([]);
    });
    const req = http.expectOne('http://api.football-data.org/v2/teams/1')
    req.flush([])
    done();
  })
 
});
