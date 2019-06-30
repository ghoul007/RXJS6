
import { Component, OnInit } from '@angular/core';
import { Observable, of, concat, throwError, timer } from 'rxjs';
import { map, delay, catchError, retryWhen, delayWhen, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  result$: Observable<any[]>;

  ngOnInit() {



    this.result$ = this.createHttpObserver()
      .pipe(
        map(res => res['payload']),
        shareReplay(),
        retryWhen(err => {
          debugger
          return err.pipe(
            delayWhen(() => timer(2000))
          )
        }
        )
        // catchError(err => {
        // of([])
        // return throwError(err)
        // })
      )
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
        observer.complete();
      }).catch(err => {
        observer.error(err);
      });

    });

  }
}
