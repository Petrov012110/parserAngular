import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ParserPageComponent } from 'src/app/user/parser-page/parser-page.component';
import { ParsedGroupTypes, TableServices } from '../../services/table.services';


/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy {

  tableData: any[] = [];
  tableSub: Subscription = new Subscription; 
  tableDataNew: any[] = [];
  page = 1;
  pageSize = 10;
  $tabelData!: Observable<[]>; 
  constructor(private tableService: TableServices,
    private parsPage: ParserPageComponent) {
   
  }
  
  onChangePagination(event: number) {
    this.page = +event;

    this.tableData = this.paginate(this.tableDataNew, 10, this.page);
  }

  addFavorites(post: string) {

  }

  paginate(array: any[], page_size: number, page_number: number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  ngOnInit() {
    this.$tabelData = this.parsPage.onSubmit()
    this.tableSub = this.parsPage.onSubmit().subscribe((data: any) => {
      console.log('ПОЛУЧАЕМ ДАННЫЕ В ТАБЛИЦУ',data);
      
      
      this.tableData = this.paginate(this.tableDataNew, 10, this.page);
    });
  }

  ngOnDestroy() {
    if(this.tableSub) {
      this.tableSub.unsubscribe()
    }
  }
}

