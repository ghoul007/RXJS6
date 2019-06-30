import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, concat } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('search') search;
  course$: any;
  lesson$: any ;
  constructor() { }

  searchCourse = srch => this.createHttpObserver('/api/lessons?courseId=1?filter=' + srch)
    .pipe(
      map(res => res['payload'])
    )


  ngOnInit() {

    this.course$ = this.createHttpObserver('/api/courses/1')
      ;
  }

  ngAfterViewInit() {
    const search$ = fromEvent<any>(this.search.nativeElement, 'input')
      .pipe(
        map(event => event.target.value),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(search => this.createHttpObserver(search).pipe(
          map(res => res['payload'])
        )
        ));

    this.lesson$ =   concat(this.createHttpObserver(),search$) ;
  }


  /**
  *
  *
  * @memberof AppComponent
  */
  createHttpObserver(s = "") {
    return Observable.create(observer => {
      fetch('/api/lessons?courseId=1&filter=' + s).then(
        res => res.json()
      ).then(body => {
        observer.next(body);
        observer.complete();
      }).catch(err => {
        observer.error(err);
      });

    });

  }
}
