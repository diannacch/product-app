import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { ProductProviderVM } from '../_models/ViewModels/product-providers-vm';
import { Observable } from 'rxjs';
import { Response } from '../_models/response';
import { ProviderVM } from '../_models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  providersResults: ProviderVM[] = [];

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string,) { }

  private _controller = 'api/Provider';

  addProvider(newProvider: ProductProviderVM): Observable<Response<ProductProviderVM>> {
    return this.http.post<Response<ProductProviderVM>>(`${this.apiUrl}${this._controller}/AddProvider`, newProvider);
  }

  getProvidersByIdProduct(idProduct: number): Observable<Response<ProductProviderVM>> {
    return this.http.get<Response<ProductProviderVM>>(`${this.apiUrl}${this._controller}/GetProvidersByIdProduct/${idProduct}`);
  }
  removeProvider(idProvider: number): Observable<Response<ProductProviderVM>> {
    return this.http.delete<Response<ProductProviderVM>>(`${this.apiUrl}${this._controller}/DeactivateProvider/${idProvider}`);
  }

  getProviders() {
    this.http.get<Response<ProviderVM>>(`${this.apiUrl}${this._controller}/GetProviders`).subscribe(result => {
      if (result.success == true) {
        this.providersResults = result.data;
      }
    })
  }
}
