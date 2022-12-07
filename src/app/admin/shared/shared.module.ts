import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiInputModule
  ],
  exports: [
    TuiInputModule,
    TuiButtonModule

  ]
})
export class SharedModule {
}
