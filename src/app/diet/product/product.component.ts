import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../model/IProduct';

@Component({
  selector: 'md-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productForm: FormGroup;
  public productList: IProduct[];
  public productSelected: boolean;
  public creatingProduct: boolean;
  public editingProduct: boolean;

  constructor(private fb: FormBuilder) { }

  public ngOnInit() {
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.productForm = this.fb.group({
      name: null,
      unit: 'gram',
      calories: null,
      carbs: null,
      fats: null,
      proteins: null
    });
  }

  public searchProducts(): void {
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.productList = this.products;
  }

  public selectProduct(index: number): void {
    this.productSelected = true;
    this.creatingProduct = false;
    this.editingProduct = false;
    const product = this.products[index];
    this.productForm.setValue({
      name: product.name,
      unit: product.baseUnit,
      calories: product.calories,
      carbs: product.carbs,
      proteins: product.proteins,
      fats: product.fats
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
    this.productSelected = false;
    this.creatingProduct = false;
    this.editingProduct = false;
    this.productList = [];
    this.productForm.reset();
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

  private products: IProduct[] = [
    {
    id: 1,
    name: "kanapka",
    baseUnit: "gram",
    calories: 500,
    carbs: 30,
    proteins: 15,
    fats: 20
  }
]

}
