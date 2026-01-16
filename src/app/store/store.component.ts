import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  interval,
  map
  , filter
} from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>🛒 Electronic Store</h2>

    <input
      type="text"
      placeholder="Search products..."
      [formControl]="searchControl"
    />

    <p>🔥 Offer ends in: {{ timer$ | async }} seconds</p>

    <div *ngIf="(products$ | async)?.length === 0">
      No products found
    </div>

    <div class="card" *ngFor="let product of products$ | async">
      <h3>{{ product.name }}</h3>
      <p>Category: {{ product.category }}</p>
      <p>Price: ₹{{ product.price }}</p>
    </div>
  `,
  styles: [`
    input { padding: 8px; width: 250px; margin-bottom: 10px; }
    .card { border: 1px solid #ccc; padding: 10px; margin: 8px 0; }
  `]
})
export class StoreComponent {
  private _productService = inject(ProductService);

  searchControl = new FormControl('');

  products$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(term =>
      this._productService.searchProducts(term || '')
    )
  );

  timer$ = interval(1000).pipe(
    filter((val:any) => val <= 20),
    map(val => 20 - val)
  );

  
}
