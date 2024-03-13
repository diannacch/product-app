import { Component, OnInit } from '@angular/core';
import { ProductService } from './modules/home/_services/product.service';
import { ProviderService } from './modules/home/_services/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _productService: ProductService,
    private _providerService: ProviderService) { }

  ngOnInit(): void {
    this._productService.getProductTypes();
    this._providerService.getProviders();
  }
  title = 'vehicle-app';
}
