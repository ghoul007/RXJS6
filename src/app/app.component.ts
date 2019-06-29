
import { Component, OnInit } from '@angular/core';
import { Observable, of, concat } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {

    const source1$ = of(1).pipe(delay(3000));
    const source2$ = of(2);

    const result$ = concat(source1$, source2$);

    result$.subscribe(res => console.log(res));
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
