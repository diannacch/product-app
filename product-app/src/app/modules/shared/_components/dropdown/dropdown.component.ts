import { Component, Input } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { ProductService } from 'src/app/modules/home/_services/product.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  constructor(private prodService: ProductService) { }
  @Input() control = new UntypedFormControl('');
  get filters() {
    return this.prodService.productTypes;
  }
}
