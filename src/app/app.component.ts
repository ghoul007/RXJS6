
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    const http$ = this.createHttpObserver();

    const course$ = http$.pipe(
      map(res => res['payload'])
    );
    course$.subscribe(
      courses => console.log(courses),
      () => { },
      () => console.log('complete'))
  }
  /**
   *
   *
   * @memberof AppComponent
   */
  createHttpObserver() {
    return Observable.create(observer => {
      fetch('/api/courses').then(
        res => res.json()
      ).then(body => {
        observer.next(body);
        observer.complet();
      }).catch(err => {
        observer.error(err);
      });

    });

  }
}
