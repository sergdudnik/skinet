import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { IBrand } from '../shared/models/brand'
import { IProduct } from '../shared/models/product'
import { IType } from '../shared/models/productType'
import { ShopService } from './shop.service'
import { ShopParams } from '../shared/models/shopParams'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) // a selector name - "#search" in html template, non-static bcs search element not always visible (ngIf)
  searchTerm!: ElementRef 
  // searchTerm is reference value set in DOM input element with "search" selector

  products!: IProduct[]
  brands!: IBrand[]
  types!: IType[]
  shopParams = new ShopParams()
  totalCount!: number

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response!.data
      this.shopParams.pageNumber = response!.pageIndex
      this.shopParams.pageSize = response!.pageSize
      this.totalCount = response!.count
    }, error => { 
      console.log(error)
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response]
    }, error => { 
      console.log(error)
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response]
    }, error => { 
      console.log(error)
    })
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onSortSelected(event: any){ // instead of "sort: string"
    this.shopParams.sort = event.target.value // instead of "this.sortSelected = sort"
    this.getProducts()
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event){ // eliminate doubling API requests if a page number not changed
      this.shopParams.pageNumber = event
      this.getProducts()
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value
    this.shopParams.pageNumber = 1 // all search results begin from page 1
    this.getProducts()
  }

  onReset(){
    this.searchTerm.nativeElement.value = ''
    this.shopParams = new ShopParams() // set default params values
    this.getProducts()
  }

}
