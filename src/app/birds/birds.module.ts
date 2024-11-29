import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirdsPageRoutingModule } from './birds-routing.module';

import { BirdsPage } from './birds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirdsPageRoutingModule
  ],
  declarations: [BirdsPage]
})
export class BirdsPageModule {}
