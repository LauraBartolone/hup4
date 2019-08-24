import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateEventPage } from './create-event.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CreateEventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}
