import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionLike } from 'rxjs/internal/types';
import { CheckSelectedInterface, CheckServices } from '../shared/services/check.services';
import { GroupsServices } from '../shared/services/groups.services';
import { parsePath, PathItemObjType } from '../shared/services/pathParser.services';
import { TableServices } from '../shared/services/table.services';
import { ClassificatorType } from '../shared/services/tree.services';

@Component({
  selector: 'app-parser-page',
  templateUrl: './parser-page.component.html',
  styleUrls: ['./parser-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParserPageComponent implements OnInit, OnDestroy {

  
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  data: any = {
    "groups": [],
    "items": []
  }
  ;
  groups: any[] = [];
  items: any[] = [];

  private subscriptions: SubscriptionLike[] = [];
  constructor(
    private checkService: CheckServices,
    private router: Router,
    private tableService: TableServices

  ) {
    this.navLinks = [
      {
        label: 'Table',
        link: './table',
        index: 0
      }, {
        label: 'Favorites',
        link: './favorites',
        index: 1
      },
    ];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      })
    );

    this.subscriptions.push(
      this.checkService.onSelectGroups().subscribe((groups: any) => {
        this.groups = groups.groups;
        
      })
    );

    this.subscriptions.push(
      this.checkService.onSelectTrees().subscribe((trees: any) => {
        this.items = trees.items;
        console.log(trees);
        
      })
    );
  }

  public dataForBack: BehaviorSubject<CheckSelectedInterface> = new BehaviorSubject({
    groups: [],
    items: [{
    }],
});

  onSubmit() {
    if (this.groups.length && this.items.length) {

      console.log("СТРОКА, КОТОРУЮ ПЕРЕДАЕМ В parsePath",this.items);

      const paths: PathItemObjType[] = parsePath(this.items);
      const classificator: ClassificatorType = paths?.map((brand) =>({
        id: "0",
        name: brand.text || '',
        series: brand.children?.map((series) => ({
          name: series.text || '',
          models: series.children?.map((model) => ({
            name: model.text || ''
          }))
        })),
      })) || [];

      this.data["groups"] = this.groups
      this.data["items"] = classificator
      
      console.log("SUB", this.data);
      
      this.tableService.getAll(this.data).subscribe(data => {
        console.log(data);
        
      })
      // console.log(classificator);

      
      console.log('SEND');
    } else {
      console.log('NOT VALID. NOT SELECTED CHECKBOXes');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
