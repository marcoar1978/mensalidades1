import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesesPageRoutingModule } from './meses-routing.module';

import { MesesPage } from './meses.page';
import { FormPgtoComponent } from '../form-pgto/form-pgto.component';
import { ModalPgtosComponent } from 'src/app/components/modal-pgtos/modal-pgtos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesesPageRoutingModule,
    ReactiveFormsModule
        
  ],
  declarations: [MesesPage, FormPgtoComponent, ModalPgtosComponent]
})
export class MesesPageModule {}
