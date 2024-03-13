import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterState!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,) { }

  initializeFilterForm() {
    this.filterState = this.fb.group({
      id_Tipo_Producto: new UntypedFormControl('', [Validators.required]),
      clave_Producto: new UntypedFormControl('', [Validators.required]),
    });
  }

  get filterProductType(): UntypedFormControl {
    return this.filterState?.get('id_Tipo_Producto') as UntypedFormControl;
  }

  get filterProductCode(): UntypedFormControl {
    return this.filterState?.get('clave_Producto') as UntypedFormControl;
  }
}
