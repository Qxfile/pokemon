import {Component, Inject, OnInit} from '@angular/core';
import {defaultEditorColors} from "@taiga-ui/addon-editor";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TagService} from "../../services/tag.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {map, tap} from "rxjs";

@Component({
  selector: 'pok-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    color: ['', Validators.required]
  })
  isSaving = false;
  readonly palette = defaultEditorColors;
  tagId: string

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')), // черерз мэп получаем айди которуб мы указали в роутиниге(admin.rout)
      tap((id => this.tagId = id) //в нашу this tag id записываем айди
      )).subscribe(() => {
      if (this.tagId !== 'new') {
        this.tagService.getByID(+this.tagId).subscribe(tag => {
          this.form.patchValue(tag)
        })
      }
    })
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.tagId === 'new') {
      this.create()
    } else
      this.update()
  }

  create() {
    this.isSaving = true
    const send = {
      tag: {
        name: this.form.get('name').value,
        color: this.form.get('color').value
      }
    }
    this.tagService.create(send).subscribe({
      next: () => {
        this.alertService.open(`Тег успешно создан`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
        this.form.reset()
        this.isSaving = false
      },
      error: err => {
        this.alertService.open('Произошла ошибка', {
          label: `Произошла ошибка!`,
          status: TuiNotification.Error
        }).subscribe();
        this.isSaving = false
      }
    })
  }

  update() {
    this.isSaving = true
    const send = {
      tag: {
        name: this.form.get('name').value,
        color: this.form.get('color').value
      }
    }
    this.tagService.update(send, +this.tagId).subscribe({
      next: () => {
        this.alertService.open(`Тег успешно обновлен`, {
          label: `Успешно!`,
          status: TuiNotification.Success
        }).subscribe();
        this.isSaving = false
        this.router.navigate(['/admin/tag-list'])
      },
      error: err => {
        this.alertService.open('Произошла ошибка', {
          label: `Произошла ошибка!`,
          status: TuiNotification.Error
        }).subscribe();
        this.isSaving = false
      }
    })
  }
}
