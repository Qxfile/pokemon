import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon";
import {PokemonService} from "../../services/pokemon.service";
import {delay} from "rxjs";
import {Tag} from "../../models/tag";

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon [] = []
  isLoading: boolean = true;

  constructor(
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe(pokemons => {
      this.pokemons = pokemons
      this.isLoading = false
    })
  }

}
