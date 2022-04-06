import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailsPage } from '../tab1/team-details.page';
import { TeamsPage } from '../tab1/teams.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
      {
        path: 'teams',
        component: TeamsPage,
      },
      {
        path: 'teams-details',
        component: TeamDetailsPage,
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
