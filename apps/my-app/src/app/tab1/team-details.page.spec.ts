import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppService } from '../app.service';

import { TeamDetailsPage } from './team-details.page'
import { RouterTestingModule } from '@angular/router/testing';

describe('Teams page', () => {
  let component: TeamDetailsPage;
  let fixture: ComponentFixture<TeamDetailsPage>;
  let appService: AppService;
  let router: Router;
  const teamDetails = {
    id: 1,
    area: {
        id: 1,
        name: '',
        countryCode: '',
        ensignUrl: ''
    },
    name: 'string',
    shortName: '',
    tla: '',
    crestUrl: '',

    address: '',
    phone: '',
    website: 'string',
    email: '',
    founded: 123,
    clubColors: '',
    venue: '',
    squad: [],
    lastUpdated: new Date()
}
  const appServiceStub = () => ({
    getCompetitions: () => of({}),
    getTeams: () =>of( []),
    getTeamDetails: () => of(teamDetails)
  });
  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TeamDetailsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
          {provide: AppService, useFactory: appServiceStub},
          { 
              provide: ActivatedRoute,
                useValue: {
                    snapshot : { 
                        data: {
                            title : ''
                        }
                    },
                    queryParams: of({})
                }
            }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailsPage);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not call teams details API if team id is undefined', () => {
      component.teamId = undefined;
    jest.spyOn(appService, 'getTeamDetails').mockImplementation(() => {
        return of(teamDetails)
    })
    component.ngOnInit();
    expect(appService.getTeamDetails).not.toHaveBeenCalled();
  })
  it('should  call teams details API if team id is valid', () => {
    component.teamId = 12345;
  jest.spyOn(appService, 'getTeamDetails').mockImplementation(() => {
      return of(teamDetails)
  })
  component.ngOnInit();
  expect(appService.getTeamDetails).toHaveBeenCalled();
})
});