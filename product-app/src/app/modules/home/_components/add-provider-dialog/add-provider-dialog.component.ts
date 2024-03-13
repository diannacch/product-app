import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ProviderService } from '../../_services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormStateService } from '../../_services/form-state.service';
import { SpinnerDialogService } from '../../_services/spinner-dialog.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-provider-dialog',
  templateUrl: './add-provider-dialog.component.html',
  styleUrls: ['./add-provider-dialog.component.scss']
})
export class AddProviderDialogComponent implements OnInit, OnDestroy {

  protected _onDestroy$ = new Subject<void>;

  constructor(private spinner: SpinnerDialogService,
    private formService: FormStateService,
    private providerService: ProviderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<AddProviderDialogComponent>) { }


  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  ngOnInit(): void {
    this.formService.initializeProviderForm();
  }

  onCancel() {
    this.dialogRef.close(false);
  }
  onAdd() {
    var provider = this.formService.providerStateForm.getRawValue();
    provider.status = true;
    provider.id = 1;
    provider.nombre_Proveedor = "";
    provider.id_Producto = this.data;
    this.providerService.addProvider(provider)
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
  get idProductControlValue(): UntypedFormControl {
    return this.formService.idProducto.value as UntypedFormControl;
  }

  get idProviderControl(): UntypedFormControl {
    return this.formService.idProveedor as UntypedFormControl;
  }

  get providerCodeControl(): UntypedFormControl {
    return this.formService.claveProveedor as UntypedFormControl;
  }

  get priceControl(): UntypedFormControl {
    return this.formService.costoProveedor as UntypedFormControl;
  }

  get requiredFielsdAndValid() {
    return this.formService.providerStateForm.valid;
  }

  get providersResult() {
    return this.providerService.providersResults;
  }

}
