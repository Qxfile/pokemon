import {Component, Input, OnInit} from '@angular/core';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../models/tag";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {finalize} from "rxjs";

@Component({
  selector: 'pok-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  tags: Tag[] = []
  isLoading: boolean = true
  deletion: Set<number> = new Set<number>()

  constructor(
    private tagService: TagService,
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags
      this.isLoading = false
    })
  }

  onDelete(id: number) {
    this.deletion.add(id)
    this.tagService.delete(id).pipe(
      finalize(()=> this.deletion.delete(id))
    ).subscribe({
      next: () => {
        this.alertService.open(`Тег успешно удален`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
        this.tags = this.tags.filter(t => t.id !== id)
      },
      error: () => {
        this.alertService.open('Произошла ошибка', {
          label: `Произошла ошибка!`,
          status: TuiNotification.Error

        }).subscribe();
      }
    })
  }
}
