import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ProductProvider } from '../_models/products-providers';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  productState!: UntypedFormGroup;
  providerState!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) { }

  initializeProductForm() {
    this.productState = this.fb.group({
      id: new UntypedFormControl(''),
      clave_Producto: new UntypedFormControl('', [Validators.required]),
      id_Tipo_Producto: new UntypedFormControl('', [Validators.required]),
      nombre_Producto: new UntypedFormControl('', [Validators.required]),
      status: new UntypedFormControl(''),
      precio_Venta: new UntypedFormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    });
  }

  initializeProviderForm() {
    this.providerState = this.fb.group({
      id_Proveedor: new UntypedFormControl('', [Validators.required]),
      id_Producto: new UntypedFormControl(''),
      clave_Proveedor: new UntypedFormControl('', [Validators.required]),
      costo: new UntypedFormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      status: new UntypedFormControl('')
    });
  }

  setProductInformatio(product: Product) {
    this.productState?.patchValue(product);
  }

  setProviderInformation(provider: ProductProvider) {
    this.providerState?.patchValue(provider);
  }

  get productStateForm(): UntypedFormGroup {
    return this.productState as UntypedFormGroup;
  }

  get claveProducto(): UntypedFormControl {
    return this.productState?.get('clave_Producto') as UntypedFormControl;
  }

  get idTipoProducto(): UntypedFormControl {
    return this.productState?.get('id_Tipo_Producto') as UntypedFormControl;
  }

  get nombreProducto(): UntypedFormControl {
    return this.productState?.get('nombre_Producto') as UntypedFormControl;
  }

  get status(): UntypedFormControl {
    return this.productState?.get('status') as UntypedFormControl;
  }

  get precioVenta(): UntypedFormControl {
    return this.productState?.get('precio_Venta') as UntypedFormControl;
  }

  get providerStateForm(): UntypedFormGroup {
    return this.providerState as UntypedFormGroup;
  }

  get idProveedor(): UntypedFormControl {
    return this.providerState?.get('id_Proveedor') as UntypedFormControl;
  }

  get idProducto(): UntypedFormControl {
    return this.providerState?.get('id_Producto') as UntypedFormControl;
  }

  get claveProveedor(): UntypedFormControl {
    return this.providerState?.get('clave_Proveedor') as UntypedFormControl;
  }

  get costoProveedor(): UntypedFormControl {
    return this.providerState?.get('costo') as UntypedFormControl;
  }
  get statusProveedor(): UntypedFormControl {
    return this.providerState?.get('status') as UntypedFormControl;
  }
}
