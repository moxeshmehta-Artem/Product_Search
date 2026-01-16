import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'iPhone 15', category: 'Mobile', price: 80000 },
    { id: 2, name: 'Samsung Galaxy S24', category: 'Mobile', price: 75000 },
    { id: 3, name: 'MacBook Air', category: 'Laptop', price: 120000 },
    { id: 4, name: 'Dell XPS 13', category: 'Laptop', price: 110000 },
    { id: 5, name: 'Sony Headphones', category: 'Accessories', price: 15000 },
    { id: 6, name: 'Apple Watch', category: 'Accessories', price: 45000 }
  ];

  private productSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productSubject.asObservable();

  searchProducts(term: string): Observable<Product[]> {
    return this.products$.pipe(
      map(products =>
        products.filter(p =>
          p.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}
