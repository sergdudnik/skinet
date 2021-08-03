import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;  // The bang operator tells the compiler to temporarily 
                                // relax the "not null" constraint that it might otherwise demand. 
                                // It says to the compiler: "As the developer, I know better than you 
                                // that this variable cannot be null or undefined right now".

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product)
  }

}
