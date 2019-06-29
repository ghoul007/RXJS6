
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<any[]>;
  advancedCourses$: Observable<any[]>;

  ngOnInit() {
    const http$ = this.createHttpObserver();

    const course$ = http$.pipe(
      map(res => res['payload']),
      shareReplay()
    );

    this.beginnerCourses$ = course$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER')),
      tap(r => console.log('ff' + r))
      );
    this.advancedCourses$ = course$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );

    // course$.subscribe(
    //   courses => {
    //     console.log(courses)
    //   },
    //   () => { },
    //   () => console.log('complete'))
  }
  /**
   *
   *
   * @memberof HomeComponent
   */
  createHttpObserver(): Observable<any[]> {
    return Observable.create(observer => {
      fetch('/api/courses').then(
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
