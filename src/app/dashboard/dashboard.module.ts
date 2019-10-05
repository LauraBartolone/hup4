import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { PostImageModule } from '../components/post-image/module';
import { PleaseLoginModalModule } from '../modal/please-login/please-login.module';
import { PhotoDetailModalModule } from '../modal/photo-detail/photo-detail.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PostImageModule,
    PleaseLoginModalModule,
    PhotoDetailModalModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
