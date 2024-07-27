import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConsentModalComponent } from './components/consent-modal/consent-modal.component';

@NgModule({
  declarations: [ConsentModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [ConsentModalComponent]
})
export class AppTermsConsentModule { }