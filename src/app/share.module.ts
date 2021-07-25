import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSliderModule } from '@angular/material/slider';





@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    MatSliderModule,
    // MatPaginatorModule,
    // MatSidenavModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatCardModule,
    // MatInputModule,
    // FormsModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    // MatCardModule,
    // MatSelectModule,
    // MatCardModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatSnackBarModule,
    // MatAutocompleteModule,
    // MatTableModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatSortModule,
    // MatTooltipModule,
    // MatStepperModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatExpansionModule,
    TextFieldModule,
    // MatSlideToggleModule,
    // MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
