import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { of } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {


    of(1, 2, 3, 4).pipe(
      concatMap(res => of(true))
    ).subscribe(console.log);

    this.form = this.fb.group({
      description: ["", Validators.required],
      category: ["", Validators.required],
      releasedAt: ["", Validators.required],
      longDescription: ["", Validators.required]
    });




    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        mergeMap(changes => this.saveCourse(changes))
      )
      .subscribe(console.log);

  }

  saveCourse(changes) {
    return fromPromise(fetch(`/api/courses/1000`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': "application/json"
      }
    }));
  }

}
