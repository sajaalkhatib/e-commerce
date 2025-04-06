import { Component } from '@angular/core';
import { ShopService } from '../../../Services/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  productContainer: any;
  constructor(private _shop: ShopService) { }
  ngOnInit() {
    this.ViewAllProducts();
  }


  ViewAllProducts() {
    this._shop.getAllProducts().subscribe((data) => {
      this.productContainer = data;
    })
  }

  DeleteProduct(id: any) {
    // Show deleting loader
    Swal.fire({
      title: 'Deleting...',
      text: 'Please wait while the Product is being deleted.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this._shop.deleteProducts(id).subscribe(
      () => {
        Swal.fire('Deleted!', 'The Product has been deleted.', 'success');
        this.ViewAllProducts(); // Refresh category list
      },
      (error) => {
        Swal.fire('Error', 'Failed to delete the product. Please try again.', 'error');
        console.error('Error deleting category:', error);
      }
    );
  }

}
