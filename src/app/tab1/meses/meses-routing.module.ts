import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesesPage } from './meses.page';

const routes: Routes = [
  {
    path: '',
    component: MesesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesesPageRoutingModule {}
