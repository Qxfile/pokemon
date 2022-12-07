import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/components/layout/layout.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PokemonListComponent} from "./components/pokemon-list/pokemon-list.component";
import {TagListComponent} from "./components/tag-list/tag-list.component";
import {PokemonFormComponent} from "./components/pokemon-form/pokemon-form.component";
import * as path from "path";
import {TagFormComponent} from "./components/tag-form/tag-form.component";

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path: '', component: DashboardComponent},
    {
      path: 'pokemon-list',
      children: [
        {path: '', component: PokemonListComponent},
        {path: ':id', component: PokemonFormComponent}
      ]
    },

    {
      path: 'tag-list',
      children: [
        {path: '', component: TagListComponent},
        {path: ':id', component: TagFormComponent}
      ]
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {
}
