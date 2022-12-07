import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRouting} from './admin.routing';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LayoutModule} from "./layout/layout.module";
import {PokemonListComponent} from './components/pokemon-list/pokemon-list.component';
import {PokemonCardComponent} from './components/pokemon-card/pokemon-card.component';
import {TagListComponent} from './components/tag-list/tag-list.component';
import {TagFormComponent} from './components/tag-form/tag-form.component';
import {PokemonFormComponent} from './components/pokemon-form/pokemon-form.component';
import {SharedModule} from "./shared/shared.module";
import {TuiInputModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputColorModule} from "@taiga-ui/addon-editor";
import {TuiButtonModule} from "@taiga-ui/core";


@NgModule({
  declarations: [
    DashboardComponent,
    PokemonListComponent,
    PokemonCardComponent,
    TagListComponent,
    TagFormComponent,
    PokemonFormComponent
  ],
  exports: [
    TagListComponent
  ],
  imports: [
    CommonModule,
    AdminRouting,
    LayoutModule,
    SharedModule,
    ReactiveFormsModule,
    TuiInputColorModule,
  ]
})
export class AdminModule {
}
