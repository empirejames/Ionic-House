import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnoucePage } from './annouce';

@NgModule({
  declarations: [
    AnnoucePage,
  ],
  imports: [
    IonicPageModule.forChild(AnnoucePage),
  ],
})
export class AnnoucePageModule {}
