import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerDialogService } from '../../_services/spinner-dialog.service';
import { FormStateService } from '../../_services/form-state.service';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit, OnDestroy {
  protected _onDestroy$ = new Subject<void>;

  constructor(private spinner: SpinnerDialogService,
    private formService: FormStateService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  ngOnInit(): void {
    this.formService.productState.reset();
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onAdd() {
    this.spinner.startSpinner();
    const product = this.formService.productStateForm.getRawValue();
    product.status = true;
    product.id = product.id ?? 1;
    this.productService.createProduct(product)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(result => {
        if (result.success === true) {
          this.spinner.closeSpinner();
          this.openSnackBar("Producto Agregado Correctamente")
        }
        this.spinner.closeSpinner();
      });
    this.dialogRef.close(true);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }

  get productNameControl(): UntypedFormControl {
    return this.formService.nombreProducto as UntypedFormControl;
  }

  get productCodeControl(): UntypedFormControl {
    return this.formService.claveProducto as UntypedFormControl;
  }

  get priceControl(): UntypedFormControl {
    return this.formService.precioVenta as UntypedFormControl;
  }

  get productTypeControl(): UntypedFormControl {
    return this.formService.idTipoProducto as UntypedFormControl;
  }

  get requiredFielsdAndValid() {
    return this.formService.productStateForm.valid;
  }
}
