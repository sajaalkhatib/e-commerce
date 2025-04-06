import { Component } from '@angular/core';
import { ShopService } from '../../Services/shop.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  categories: any[] = [];
  displayedCategories: any[] = [];
  discountedProducts: any[] = [];

  constructor(private ser: ShopService) { }

  ngOnInit() {
    this.getTopCategories()
    this.getProductsOnSale()
    this.getTopRated()
  }

  getTopCategories() {
    this.ser.getAllCategories().subscribe(categories => {
      this.categories = categories; 
      this.displayedCategories = categories.slice(0, 6);
    });
  }

  getProductsOnSale() {
    this.ser.getAllProducts().subscribe(products => {
      this.discountedProducts = products
        .filter(product => product.discount) 
        .sort((a, b) => this.extractDiscount(b.discount) - this.extractDiscount(a.discount))
        .slice(0, 6);
    });
  }

  extractDiscount(discount: string): number {
    return parseInt(discount.replace('%', '')) || 0; 
  }


  ////Display Top Rated Products
  topRatedProducts: any[] = [];

  getTopRated() {
    this.ser.getTopRatedProducts().subscribe(products => {
      this.topRatedProducts = products;
      console.log(this.topRatedProducts)
    });
  }

  generateStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      '★'.repeat(fullStars) +
      '☆'.repeat(emptyStars)
    );
  }

  calculateOldPrice(price: number, discount: string): string {
    const discountValue = parseFloat(discount);
    if (!isNaN(discountValue) && discountValue > 0) {
      return (price / (1 - discountValue / 100)).toFixed(2);
    }
    return price.toFixed(2);
  }
}
