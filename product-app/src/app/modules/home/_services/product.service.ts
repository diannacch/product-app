import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { Response } from '../_models/response';
import { ProductType } from '../_models/product-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productTypes: ProductType[] = [];
  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string,) { }

  private _controller = 'api/Product';

  getAllProducts(): Observable<Response<Product>> {
    return this.http.get<Response<Product>>(`${this.apiUrl}${this._controller}/GetAllProducts`);
  }

  getProductByFilter(idProductType: string, productCode: string): Observable<Response<Product>> {
    return this.http.get<Response<Product>>(`${this.apiUrl}${this._controller}/GetProductByFilter/${idProductType}/${productCode}`);
  }

  getProductById(idProduct: number): Observable<Response<Product>> {
    return this.http.get<Response<Product>>(`${this.apiUrl}${this._controller}/GetProductById/${idProduct}`);
  }

  createProduct(newProduct: Product): Observable<Response<Product>> {
    return this.http.post<Response<Product>>(`${this.apiUrl}${this._controller}/AddProduct`, newProduct);
  }

  updateProduct(updateProduct: Product): Observable<Response<Product>> {
    return this.http.put<Response<Product>>(`${this.apiUrl}${this._controller}/UpdateProduct`, updateProduct);
  }

  removeProduct(idProduct: number): Observable<Response<Product>> {
    return this.http.delete<Response<Product>>(`${this.apiUrl}${this._controller}/DeactivateProduct/${idProduct}`);
  }

  getProductTypes() {
    this.http.get<Response<ProductType>>(`${this.apiUrl}${this._controller}/GetProductTypes`).subscribe(result => {
      if (result.success == true) {
        this.productTypes = result.data;
      }
    })
  }
}
