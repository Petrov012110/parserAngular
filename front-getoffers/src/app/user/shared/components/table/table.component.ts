import { Component, OnInit } from '@angular/core';
import { ParsedGroupTypes, TableServices } from '../../services/table.services';


/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  tableData: any[] = [];
  page = 1;
  pageSize = 10;
  constructor(private tableService: TableServices) {

  }

  addFavorites(post: string) {

  }

  ngOnInit() {
    this.tableService.getAll().subscribe(data => this.tableData = data)
  }
}

