import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../../services/pokemon.service";
import {TagService} from "../../services/tag.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Component({
  selector: 'pok-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    height: [null, Validators.required],
    weight: [null, Validators.required],
    tags: [[], Validators.required],
    description: [null, Validators.required],
    abilities: this.fb.array([], Validators.required),
    level: [null, Validators.required],
    hp: [null, Validators.required],
    attack: [null, Validators.required],
    defend: [null, Validators.required],
    stamina: [null, Validators.required],
    spd: [null, Validators.required],
  })

  isSaving = false;
  pokemonId: number;

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private tagService: TagService,
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // @ts-ignore
   this.create()
  }

  createSendData() {
    return {
      pokemon: {
        name: this.form.get('name').value,
        height: this.form.get('height').value,
        weight: this.form.get('weight').value,
        tags: this.form.get('tags').value.map(t => t.id),
        description: this.form.get('description').value,
        abilities: this.form.get('abilities').value,
        level: this.form.get('level').value,
        hp: this.form.get('hp').value,
        attack: this.form.get('attack').value,
        defend: this.form.get('defend').value,
        stamina: this.form.get('stamina').value,
        spd: this.form.get('spd').value,
      }
    }
  }

  create() {
    const send = this.createSendData();
    this.pokemonService.create(send).subscribe({
      next: () => {
        this.alertService.open(`Тег успешно создан`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
        this.form.reset()
      }
    })
  }
  // create() {
  //   this.isSaving = true
  //   const send = {
  //     tag: {
  //       name: this.form.get('name').value,
  //       color: this.form.get('color').value
  //     }
  //   }
  //   this.tagService.create(send).subscribe({
  //     next: () => {
  //       this.alertService.open(`Тег успешно создан`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
  //       this.form.reset()
  //       this.isSaving = false
  //     },
  //     error: err => {
  //       this.alertService.open('Произошла ошибка', {
  //         label: `Произошла ошибка!`,
  //         status: TuiNotification.Error
  //       }).subscribe();
  //       this.isSaving = false
  //     }
  //   })
  // }
}
