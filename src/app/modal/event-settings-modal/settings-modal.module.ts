import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventSettingsModalPage } from './settings-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [EventSettingsModalPage],
  entryComponents: [
    EventSettingsModalPage
  ]
})
export class EventSettingsModalPageModule {}
