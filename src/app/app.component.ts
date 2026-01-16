import { Component } from '@angular/core';
import { StoreComponent } from './store/store.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StoreComponent],
  template: `
    <h1>RxJS Electronic Store</h1>
    <app-store></app-store>
  `
})
export class AppComponent {}
