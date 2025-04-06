import { Component } from '@angular/core';
import { ShopService } from '../../../Services/shop.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  categoryContainer: any
  categoryId: any

  constructor(private _shop: ShopService, private _active: ActivatedRoute) { }

  ngOnInit() {
    let category = this._active.snapshot.paramMap.get("id");
    this._shop.getCategoryByCategoryId(category).subscribe((data) => {
      this.categoryContainer = data
    })
  }

  updateCategory(data: any) {
    this.categoryId = this._active.snapshot.paramMap.get("id");
    this._shop.editCategory(this.categoryId, data).subscribe(() => {

      Swal.fire({
        title: 'Success!',
        text: 'Category updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6f91' // Custom color for the confirmation button
      });
    })
  }
}
