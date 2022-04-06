import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppService } from '../app.service';

import { Tab1Page } from './tab1.page'
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('Teams page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let appService: AppService;
  let router: Router;
  const competitionMock = [{
    id: 1,
    area: {
        id: 1,
        name:'',
        countryCode: '',
        ensignUrl: ''
    },
    name: '',
    code: '',
    emblemUrl: '',
    plan: '',
    currentSeason: {
        id: 1,
        startDate: '',
        endDate: '',
        currentMatchday: 1,
        winner: {
            id: 1,
            name: '',
            shortName: '',
            tla: 'string',
            crestUrl: ''
        }
    },
    numberOfAvailableSeasons: 1,
    lastUpdated: new Date()
  }]
  const appServiceStub = () => ({
    getCompetitions: () => of(competitionMock),
    getTeams: () =>of( [])
  });
  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [Tab1Page],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        DatePipe,
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
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit should call app service to get competetions', () => {
      jest.spyOn(appService, 'getCompetitions').mockImplementation(() => {
          return of(competitionMock)
      });
      component.ngOnInit();
      expect(appService.getCompetitions).toHaveBeenCalled();
  })
  it('competitionClick should navigate to correct route', () => {
      jest.spyOn(router, 'navigateByUrl').mockImplementation(jest.fn());
    component.competitionClick(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('tabs/teams', {"state": {"competitionId": 1}});
  })
  
});