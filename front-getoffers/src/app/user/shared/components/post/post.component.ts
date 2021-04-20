import { Component, OnInit } from '@angular/core';
// import { MatBreadcrumbService } from 'mat-breadcrumb';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    // private MatBreadcrumbService: MatBreadcrumbService
  ) { }
  /**
   * Получаем id поста чтобы передать его в запрос 
   */
  // updateBreadcrumb(): void {
  //   const breadcrumbs = [
  //     {
  //       label: 'page {{pageOneID}}',
  //       url: '/page1/:pageOneID'
  //     },
  //     {
  //       label: 'page {{pageTwoID}}',
  //       url: 'page1/:pageOneID/page2/:pageTwoID'
  //     },
  //     {
  //       label: 'page {{pageThreeID}}',
  //       url: 'page1/:pageOneID/page2/:pageTwoID/page3/:pageThreeID'
  //     },
  //     {
  //       label: 'Update Breadcrumb',
  //       url: ''
  //     }
  //   ];
  //   this.MatBreadcrumbService.updateBreadcrumb(breadcrumbs);
  // }
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
