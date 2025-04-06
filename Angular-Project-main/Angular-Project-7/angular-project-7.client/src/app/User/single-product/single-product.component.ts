import { Component } from '@angular/core';
import { ShopService } from '../../Services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  constructor(private _ser: ShopService, private activee: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.getDet()
  }

  id: any;
  product: any;

  getDet() {
    this.id = this.activee.snapshot.paramMap.get('id');

    this._ser.getAllProducts().subscribe((data) => {
      this.product = data.find((p: any) => p.id == this.id);

      console.log(this.product)
    })
  }

  shareOnFacebook(): void {
    const currentUrl = "https://localhost:52305/Product-Details/1";
    console.log('Current URL:', currentUrl);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    console.log('Facebook Share URL:', facebookShareUrl);

    const popup = window.open(facebookShareUrl, '_blank', 'width=600,height=400');

    if (!popup) {
      alert("Could not open the share window. Please check your browser's popup settings.");
    } else {
      popup.focus();
    }
  }
}
