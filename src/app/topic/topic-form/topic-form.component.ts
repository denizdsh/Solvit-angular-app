import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITopic, ITopicData } from 'src/app/interfaces';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
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
  @Input() title: string | undefined;
  @Input() topic: ITopic | undefined;
  @Output() closeCreateTopic: EventEmitter<boolean> = new EventEmitter();
  @Output() topicData: EventEmitter<ITopicData> = new EventEmitter();
  @ViewChild('modal') modal!: ElementRef;
  defaultCategory: category | undefined;
  modalListener!: () => void;
  // modalRouterSubscription!: Subscription;
  // currentUrl!: string;

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
    public dialog: MatDialog) {
    // this.currentUrl = this.router.routerState.snapshot.url;
    if (!this.topic)
      this.defaultCategory = this.activatedRoute.snapshot.params['category'];
  }
  get patterns() { return patterns; }
  get formatCategory(): Function { return formatCategory; }
  ngOnInit(): void {
    this.modalListener = this.renderer.listen('window', 'click', (e: PointerEvent): void => {
      if (e.target === this.modal.nativeElement) {
        this.dialogConfirm(() => this.closeCreateTopic.emit(false));
      }
    })
    // this.modalRouterSubscription = this.router.events.subscribe(e => {
    //   if (e instanceof NavigationStart) {
    //     this.dialogConfirm(() => this.router.navigateByUrl(this.currentUrl, { skipLocationChange: true }))
    //   }
    // }) global state + route guard can manage dialog on routing
  }

  ngOnDestroy(): void {
    if (this.modalListener) this.modalListener();
    // if (this.modalRouterSubscription) this.modalRouterSubscription.unsubscribe();
  }

  submitHandler(form: NgForm): void {
    console.log(form.value, this.categoryControl.value);
    const { title, description, imageUrl } = form.value;
    this.categoryControl.updateValueAndValidity();

    if (form.invalid || this.categoryControl.invalid) return;

    this.topicData.emit({
      title: title.trim() as string,
      description: description.trim() as string,
      imageUrl: imageUrl.trim() as URL | undefined,
      category: this.categoryControl.value
    })
  }

  dialogConfirm(callback: Function): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Cancellation confirmation',
        content: 'Are you sure you want to cancel this action?',
        cancel: 'Nevermind',
        continue: 'Cancel'
      }
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (!!result)
          callback()
      })
  }
}
