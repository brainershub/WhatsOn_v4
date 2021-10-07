import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopAuthorsGraphsComponent } from './top-authors-graphs/top-authors-graphs.component';
import { TopSourceGraphComponent } from './top-source-graph/top-source-graph.component';
//import { DefaultNewLayoutComponent } from './default-new-layout/default-new-layout.component';


@NgModule({
  declarations: [

  
    //DefaultNewLayoutComponent
  
    TopAuthorsGraphsComponent,
          TopSourceGraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class WhatsOnModule { }
