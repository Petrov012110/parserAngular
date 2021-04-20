import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs/internal/types';
import { GroupsServices } from '../shared/services/groups.services';

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

  groups: any[] = [];

  private subscriptions: SubscriptionLike[] = [];
  constructor(
    private groupService: GroupsServices,
    private router: Router,

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

  getCheckedTree() {
    // console.log(this._selectedItems);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      })
    );

    this.subscriptions.push(
      this.groupService.onSelectGroups().subscribe((groups: any) => {
        this.groups = groups.groups;
        console.log('GROUPS HERE', groups);
      })
    );
  }

  onSubmit() {
    if (this.groups.length) {
      // отправляем на сервер
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
