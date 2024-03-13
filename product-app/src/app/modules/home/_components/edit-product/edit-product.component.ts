import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { Subject, forkJoin, switchMap, takeUntil } from 'rxjs';
import { SpinnerDialogService } from '../../_services/spinner-dialog.service';
import { FormStateService } from '../../_services/form-state.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Product } from '../../_models/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductProviderVM } from '../../_models/ViewModels/product-providers-vm';
import { ProviderService } from '../../_services/provider.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCATION } from 'src/app/const/const';
import { MatDialog } from '@angular/material/dialog';
import { AddProviderDialogComponent } from '../add-provider-dialog/add-provider-dialog.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected _onDestroy$ = new Subject<void>;
  providers: ProductProviderVM[] = [];
  columnNames!: string[];
  dataSource = new MatTableDataSource<ProductProviderVM>(this.providers);
  displayedColumns: string[] = ['clave_Proveedor', 'nombre_Proveedor', 'costo', 'remove', 'edit'];
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private providerService: ProviderService,
    private spinner: SpinnerDialogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formState: FormStateService,
    @Inject(LOCATION) private location: Location,) { }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  ngOnInit(): void {
    this.formState.initializeProductForm();
    this.getInformation();
  }

  getInformation() {
    forkJoin({
      products: this.productService.getProductById(this.productId),
      providers: this.providerService.getProvidersByIdProduct(this.productId)
    }).pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(({ products, providers }) => {
      if (products.success === true) {
        var product = products.data[0];
        this.productStateForm.patchValue(product);
        this.dataSource = new MatTableDataSource(providers.data);
        this.dataSource.paginator = this.paginator;
      }
      this.spinner.closeSpinner();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }

  remove(rowInfo: ProductProviderVM) {
    if (confirm("Estas seguro que quieres eliminar el registro?") == true) {
      this.removeProvider(rowInfo.id)
    }
  }

  removeProvider(idProvider: number) {
    this.providerService.removeProvider(idProvider)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(result => {
        if (result.success === true) {
          this.getProvidersById();
        }
      });
  }

  edit(rowInfo: ProductProviderVM) {

  }

  addProvider() {
    this.dialog.open(AddProviderDialogComponent, {
      data: this.productId,
      ariaModal: true,
      disableClose: true,
    }).afterClosed().subscribe((response) => {
      if (response == true) {
        this.location.reload();
      }
    });
  }

  save() {
    this.spinner.startSpinner();
    var product = this.productStateForm.getRawValue();
    this.productService.updateProduct(product)
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(response => {
        if (response.success === true) {
          this.location.reload();

        } else {
          this.openSnackBar("No se puedo actualizar el producto, intente de nuevo mas tarde");
        }
        this.spinner.closeSpinner();
      });
  }

  getProvidersById() {
    this.spinner.startSpinner();
    this.providerService.getProvidersByIdProduct(this.productId)
      .pipe(
        takeUntil(this._onDestroy$)
      ).subscribe(response => {
        if (response.success === true) {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
        }
        this.spinner.closeSpinner();
      });
  }

  get productId() {
    return Number(this.route.snapshot.params["id"]);
  }

  get productStateForm(): UntypedFormGroup {
    return this.formState.productStateForm as UntypedFormGroup;
  }

  get productNameControl(): UntypedFormControl {
    return this.formState.nombreProducto as UntypedFormControl;
  }

  get productCodeControl(): UntypedFormControl {
    return this.formState.claveProducto as UntypedFormControl;
  }

  get statusControl(): UntypedFormControl {
    return this.formState.status as UntypedFormControl;
  }

  get productTypeControl(): UntypedFormControl {
    return this.formState.idTipoProducto as UntypedFormControl;
  }

  get requiredFielsdAndValid() {
    return this.formState.productStateForm.valid;
  }
  get isLoading() {
    return this.spinner.isLoading;
  }
}
