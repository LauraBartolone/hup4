import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'dashboard/:code', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'create-event-category', loadChildren: './create-event-category/create-event-category.module#CreateEventCategoryPageModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'create-event/:eventCategory', loadChildren: './create-event/create-event.module#CreateEventPageModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'pw-recovery', loadChildren: './pw-recovery/pw-recovery.module#PwRecoveryPageModule' },
  { path: 'profile-events-list',
    loadChildren: './profile-events-list/profile-events-list.module#ProfileEventsListPageModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'event-detail/:eventId',
    loadChildren: './event-detail/event-detail.module#EventDetailPageModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'wish-list/:eventCode', loadChildren: './wish-list/wish-list.module#WishListPageModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
