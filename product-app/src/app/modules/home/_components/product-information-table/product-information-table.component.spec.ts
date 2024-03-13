import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationTableComponent } from './product-information-table.component';

describe('ProductInformationTableComponent', () => {
  let component: ProductInformationTableComponent;
  let fixture: ComponentFixture<ProductInformationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInformationTableComponent]
    });
    fixture = TestBed.createComponent(ProductInformationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
