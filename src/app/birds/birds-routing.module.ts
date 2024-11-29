import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirdsPage } from './birds.page';

const routes: Routes = [
  {
    path: '',
    component: BirdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirdsPageRoutingModule {}
