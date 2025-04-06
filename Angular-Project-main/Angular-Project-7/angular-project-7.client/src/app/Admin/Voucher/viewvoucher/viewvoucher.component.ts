import { Component } from '@angular/core';
import { ShopService } from '../../../Services/shop.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-viewvoucher',
  templateUrl: './viewvoucher.component.html',
  styleUrl: './viewvoucher.component.css'
})
export class ViewvoucherComponent {
  Voucher: any;
  constructor(private service: ShopService, private _router: Router) { }

  ngOnInit() {
    this.gitAllVoucher();
  }

  gitAllVoucher() {
    this.service.getAllVouchers().subscribe((data) => {
      this.Voucher = data;
    })
  }
  navigateToEdit(id: any) {
    this._router.navigate(['/dashboard/editvoucher', id]);
  }
  deleteVoucher(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff6f91', // Light pink color
      cancelButtonColor: '#ff4c6a',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteVouchers(id).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Voucher deleted successfully.',
            icon: 'success',
            confirmButtonColor: '#ff6f91' // Light pink color
          });
          this.gitAllVoucher();
        }, error => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the voucher.',
            icon: 'error',
            confirmButtonColor: '#ff6f91' // Light pink color
          });
        });
      }
    });
  }
}
