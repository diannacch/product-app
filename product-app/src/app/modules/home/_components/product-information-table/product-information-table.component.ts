import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../_models/product';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../_services/product.service';
import { FilterService } from '../../_services/filter.service';
import { SpinnerDialogService } from '../../_services/spinner-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { Router } from '@angular/router';
import { WINDOWS_ROOT_OBJECT } from 'src/app/const/const';

@Component({
  selector: 'app-product-information-table',
  templateUrl: './product-information-table.component.html',
  styleUrls: ['./product-information-table.component.scss']
})
export class ProductInformationTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() editVehicleInfo = new EventEmitter<Product>();
  @Output() showVehicleInfo = new EventEmitter<Product>();
  products: Product[] = [];
  columnNames!: string[];
  dataSource = new MatTableDataSource<Product>(this.products);
  displayedColumns: string[] = ['nombre_Producto', 'clave_Producto', 'precio_Venta', 'remove', 'edit'];
  protected _onDestroy$ = new Subject<void>;
  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private spinner: SpinnerDialogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(WINDOWS_ROOT_OBJECT) private window: Window,
    public router: Router) { }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  ngOnInit(): void {
    this.getProducts();
    this.filterService.initializeFilterForm();
  }

  getProducts() {
    this.productService.getAllProducts()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(result => {
        if (result.success === true) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
        }
        this.spinner.closeSpinner();
      });
  }

  research() {
    this.spinner.startSpinner();
    this.getProducts();
  }

  search() {
    this.spinner.startSpinner();
    this.productService.getProductByFilter(this.filterProductTypeControl.value, this.filterProductCodeControl.value)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(result => {
        if (result.success === true) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
        }
        this.spinner.closeSpinner();
      });
  }

  remove(row: Product) {
    if (confirm("Estas seguro que quieres eliminar el registro?") == true) {
      this.removeFromDB(row.id)
    }
  }

  removeFromDB(idProduct: number) {
    this.productService.removeProduct(idProduct)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(result => {
        if (result.success === true) {
          this.getProducts();
        }
      });
  }

  edit(rowInfo: Product) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/edit-product'])
    );

    this.window?.open(`${url}/${rowInfo.id}`, '_blank');
  }

  addProduct() {
    this.dialog.open(AddProductDialogComponent, {
      ariaModal: true,
      disableClose: true,
    }).afterClosed().subscribe((response) => {
      if (response == true) {
        this.getProducts();
      }
    });

  }

  get filterProductTypeControl(): UntypedFormControl {
    return this.filterService.filterProductType as UntypedFormControl;
  }

  get filterProductCodeControl(): UntypedFormControl {
    return this.filterService.filterProductCode as UntypedFormControl;
  }

  get requiredFielsdAndValid() {
    return this.filterProductTypeControl.valid && this.filterProductCodeControl.valid;
  }

  get isLoading() {
    return this.spinner.isLoading;
  }
}
