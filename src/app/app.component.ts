import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    const http$ = Observable.create(observer => {
      fetch('/api/courses').then(
        res => res.json()
      ).then(body => {
        observer.next(body);
        observer.complet();
      }).catch(err => {
        observer.error(err);
      });

    });

  http$.subscribe(courses=> console.log(courses), ()=>{}, ()=>console.log('complete'))
  }
}
