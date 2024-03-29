import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateEventPage } from './create-event.page';
import { TranslateModule } from '@ngx-translate/core';
import { EventSettingsModalPageModule } from '../modal/event-settings-modal/settings-modal.module';

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
    TranslateModule,
    EventSettingsModalPageModule
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}
