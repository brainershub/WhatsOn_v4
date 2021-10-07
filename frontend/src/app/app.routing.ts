import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { DashboardWhatsOnComponent } from './layout/whats-on/dashboard-whats-on/dashboard-whats-on.component';
import {ResultsComponent} from './layout/whats-on/results/results.component';
import {TopAuthorsGraphsComponent} from './layout/whats-on/top-authors-graphs/top-authors-graphs.component';
import {TopSourceGraphComponent} from './layout/whats-on/top-source-graph/top-source-graph.component'

export const routes: Routes = [
  
  {
    path: '',
    component: DashboardWhatsOnComponent,
  },
  {
    path: 'result',
    component: ResultsComponent
  },
  {
    path: 'top-authors',
    component: TopAuthorsGraphsComponent
  },
  {
    path: 'top-source',
    component: TopSourceGraphComponent
    
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  // {
  //   path: '',
  //   component: DashboardWhatsOnComponent,
  //   data: {
  //     title: 'Home'
  //   },
  //   children: [
  //     {
  //       path: 'base',
  //       loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
  //     },
  //     {
  //       path: 'buttons',
  //       loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
  //     },
  //     {
  //       path: 'charts',
  //       loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
  //     },
  //     {
  //       path: 'dashboard',
  //       component: DashboardWhatsOnComponent
  //     },
  //     {
  //       path: 'result',
  //       component: ResultsComponent
  //     },
  //     {
  //       path: 'icons',
  //       loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
  //     },
  //     {
  //       path: 'notifications',
  //       loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
  //     },
  //     {
  //       path: 'theme',
  //       loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
  //     },
  //     {
  //       path: 'widgets',
  //       loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
  //     }
  //   ]
  // },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
