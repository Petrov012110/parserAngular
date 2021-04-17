import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ParsedGroupTypes, TableServices } from '../../services/table.services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tableService: TableServices
  ) { }
/**
 * Получаем id поста чтобы передать его в запрос 
 */
  ngOnInit(): void {
    // this.route.params.pipe(
    //   switchMap((params: Params) => {
    //     return this.tableService.getById(params['id'])
    //   })
    // ).subscribe((post: ParsedGroupTypes) => {
    //   console.log(post.name);
      
    // })

  }

}
