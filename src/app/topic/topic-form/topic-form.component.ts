import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NgForm, NgModel, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITopic, ITopicData } from 'src/app/interfaces';
import { IDialogData } from 'src/app/interfaces/dialogData';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ImageService } from 'src/app/shared/image.service';
import { mainCategories, subCategories, categories, formatCategory, category, patterns } from 'src/app/shared/util';

interface ICategory {
  value: string;
  viewValue: string;
}

interface ICategoryGroup {
  title: string;
  categories: ICategory[];
}

const categoryMapCallback = (c: category) => { return { value: c, viewValue: formatCategory(c) }; }
function categoryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return categories.includes(control.value) ? { isValidCategory: {} } : null;
  }
}

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {
  @Input() title!: 'Create Topic' | 'Edit Topic';
  @Input() topic: ITopic | undefined;
  @Output() closeCreateTopic: EventEmitter<boolean> = new EventEmitter();
  @Output() topicData: EventEmitter<ITopicData> = new EventEmitter();
  @ViewChild('modal') modal!: ElementRef;
  defaultCategory: category | undefined;
  modalListener!: () => void;
  file: File | undefined;

  isLoading: boolean = false;

  categoryControl = new FormControl(null, [Validators.required, categoryValidator]);
  categoryGroups: ICategoryGroup[] = [
    {
      title: 'Main',
      categories: mainCategories.map(categoryMapCallback)
    },
    {
      title: 'Front-end',
      categories: subCategories['front-end'].map(categoryMapCallback),
    },
    {
      title: 'Back-end',
      categories: subCategories['back-end'].map(categoryMapCallback),
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private imageService: ImageService
  ) {
    if (!this.topic)
      this.defaultCategory = this.activatedRoute.snapshot.params['category'];
  }
  get patterns() { return patterns; }
  get formatCategory(): Function { return formatCategory; }

  ngOnInit(): void {
    this.modalListener = this.renderer.listen('window', 'click', (e: PointerEvent): void => {
      if (e.target === this.modal.nativeElement) {
        this.dialogConfirm(() => this.closeCreateTopic.emit(false), {
          title: 'Cancellation confirmation',
          content: 'Are you sure you want to cancel this action?',
          cancel: 'Nevermind',
          continue: 'Cancel'
        });
      }
    })
  }

  ngOnDestroy(): void {
    if (this.modalListener) this.modalListener();
  }

  fileChangeValueHandler(e: any) {
    this.file = e.target.files[0];
    console.log(this.file);
  }

  resetImageValuesHandler(imageFile: HTMLInputElement, imageUrl: NgModel) {
    this.file = undefined;
    imageFile.value = '';
    imageUrl.reset();
  }

  submitHandler(form: NgForm): void {
    console.log(form.value, this.categoryControl.value);
    let { title, description, imageUrl } = form.value;
    this.categoryControl.updateValueAndValidity();

    if (form.invalid || this.categoryControl.invalid) return;

    const action = () => {
      this.isLoading = true;

      if (this.file) {
        this.imageService.postImage(this.file).subscribe(
          (image) => {
            this.topicData.emit({
              title: title.trim() as string,
              description: description.trim() as string,
              imageUrl: image.url,
              category: this.categoryControl.value
            })
          })
      } else {
        this.topicData.emit({
          title: title.trim() as string,
          description: description.trim() as string,
          imageUrl: (imageUrl ? imageUrl.trim() : '') as URL | undefined,
          category: this.categoryControl.value
        })
      }
    }

    if (this.title === 'Edit Topic') this.dialogConfirm(action, {
      title: 'Edit Topic confirmation',
      content: 'Are you sure you want to edit this topic?',
      cancel: 'Nevermind',
      continue: 'EDIT'
    });

    else action();
  }

  dialogConfirm(callback: Function, data: IDialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (!!result)
          callback()
      })
  }
}
