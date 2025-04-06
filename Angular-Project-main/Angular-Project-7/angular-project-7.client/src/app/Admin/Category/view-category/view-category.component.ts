import { Component } from '@angular/core';
import { ShopService } from '../../../Services/shop.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css'
})
export class ViewCategoryComponent {
  categoryContainer: any;
  categoryLength: any;
  constructor(private _shop: ShopService) { }
  ngOnInit() {
    this.ViewAllCategories();
  }


  ViewAllCategories() {
    this._shop.getAllCategories().subscribe((data) => {
      this.categoryContainer = data;
      this.categoryLength = this.categoryContainer.length;
    })
  }



  //DeleteCategory(id: any) {

  //  //if()
  //  if (confirm("Are you sure you want to delete this Category?")) {
  //    this._shop.deleteCategory(id).subscribe(() => {
  //      alert("Category deleted");
  //      this.ViewAllCategories();
  //    })
  //  }
  //}



  DeleteCategory(id: number) {
    // Show loading indicator while fetching category data
    Swal.fire({
      title: 'Checking Category...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Fetch category by ID to check if it has products
    this._shop.getCategoryByCategoryId(id).subscribe(
      (categoryC) => {
        Swal.close(); // Close loading popup
        //this.categoryContainer = categoryC;

        if (this.categoryContainer.length > 0) {
          // Show confirmation if category contains products
          Swal.fire({
            title: 'This category contains products!',
            text: 'Are you sure you want to delete it?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff6f91', // Light pink color
            cancelButtonColor: '#ff4c6a',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.confirmDelete(id);
            }
          });
        } else {
          // If no products, delete immediately
          this.confirmDelete(id);
        }
      },
      (error) => {
        Swal.close();
        Swal.fire('Error', 'Failed to fetch category details. Please try again.', 'error');
        console.error('Error fetching category:', error);
      }
    );
  }


  confirmDelete(categoryId: number) {
    this._shop.deleteCategory(categoryId).subscribe(() => {
      Swal.fire("Deleted!", "Category has been deleted.", "success");
      this.ViewAllCategories();
      // Refresh list after delete
    }, error => {
      Swal.fire("Error!", "Failed to delete the category.", "error");
    });
  }
}

