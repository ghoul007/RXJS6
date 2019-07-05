
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 constructor(private store: Store){


 }
  ngOnInit() {
    this.store.init();
    // const http$ = this.createHttpObserver();

    // const course$ = http$.pipe(
    //   map(res => res['payload'])
    // );
    // course$.subscribe(
    //   courses => console.log(courses),
    //   () => { },
    //   () => console.log('complete'))
  }

}
