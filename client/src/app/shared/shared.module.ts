import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component'

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent 
    // if we want this module like a shared module (should be declared both in "declarations" and "exports")
  ]
})
export class SharedModule { }
