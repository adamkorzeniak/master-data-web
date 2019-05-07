import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../model/IProduct';
import { ProductService } from '../service/product-repository.service';

@Component({
  selector: 'md-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public searchedName: string;
  public productForm: FormGroup;
  public productList: IProduct[];
  public product: IProduct;
  public productSelected: boolean;
  public creatingProduct: boolean;
  public editingProduct: boolean;

  constructor(private fb: FormBuilder,
    private productService: ProductService) { }

  public ngOnInit() {
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.productForm = this.fb.group({
      name: null,
      characteristic: null,
      baseUnit: 'gram',
      calories: null,
      carbs: null,
      fats: null,
      proteins: null
    });
  }
  public retrieveProducts(name: string): void {
    this.productService.queryProducts(name).subscribe(
      products => this.productList = products
    );
  }

  public searchProducts(): void {
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.retrieveProducts(this.searchedName);
  }

  public selectProduct(index: number): void {
    this.productSelected = true;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.product = this.productList[index];
    this.productForm.setValue({
      name: this.product.name,
      characteristic: this.product.characteristic,
      baseUnit: this.product.baseUnit,
      calories: this.product.calories,
      carbs: this.product.carbs,
      proteins: this.product.proteins,
      fats: this.product.fats
    });
    this.productForm.disable();
  }

  public displayEmptyProduct(): void {
    this.productSelected = false;
    this.creatingProduct = true;
    this.editingProduct = false;
    this.productForm.reset();
    this.productForm.enable();
  }

  public submitProduct(): void {
    const body = {...this.product, ...this.productForm.value};
    if (this.product && this.product.id) {
      this.productService.updateProduct(this.product.id, body).subscribe(
        () => this.clearForm()
      );
    } else {
      this.productService.createProduct(body).subscribe(
        () => this.clearForm()
      );
    }
  }

  public discardProduct(): void {
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.productList = [];
    this.productForm.reset();
  }

  public editProduct(): void {
    this.productSelected = true;
    this.creatingProduct = false;
    this.editingProduct = true;
    this.productForm.enable();
  }

  private clearForm() {
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.productForm.reset();
  }

}
