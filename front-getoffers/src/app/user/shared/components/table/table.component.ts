import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class TableComponent implements OnInit {

  tableData: any[] = [];
  tableDataNew: any[] = [];
  page = 1;
  pageSize = 10;

  constructor(private tableService: TableServices) {

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
    this.tableService.getAll().subscribe(data => {
      if (!data) return;

      data.forEach((res) => {
        if (res.data.length) {
          res.data.forEach((res2: any) => {
            res2['name'] = res.name;
            this.tableDataNew.push(res2);
          })
        }
      });
      console.log('DAT', this.tableDataNew);
      
      this.tableData = this.paginate(this.tableDataNew, 10, this.page);
    });
  }
}

