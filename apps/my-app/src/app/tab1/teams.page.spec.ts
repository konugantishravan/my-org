import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppService } from '../app.service';

import { TeamsPage } from './teams.page'
import { RouterTestingModule } from '@angular/router/testing';

describe('Teams page', () => {
  let component: TeamsPage;
  let fixture: ComponentFixture<TeamsPage>;
  let appService: AppService;
  let router: Router;
  const appServiceStub = () => ({
    getCompetitions: () => of({}),
    getTeams: () =>of( [])
  });
  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TeamsPage],
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
    fixture = TestBed.createComponent(TeamsPage);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call teams API', () => {
    jest.spyOn(appService, 'getTeams').mockImplementation(() => {
        return of([])
    })
    component.ngOnInit();
    component.teams$?.subscribe((data) => {
        expect(data.length).toEqual(1);
    })
  })
  it('teamClick should navigate to correct route', () => {
      jest.spyOn(router, 'navigateByUrl').mockImplementation(jest.fn());
    component.teamClick(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('tabs/teams-details', {"state": {"teamId": 1}});
  })
});