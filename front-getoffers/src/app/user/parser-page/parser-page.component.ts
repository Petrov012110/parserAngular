import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parser-page',
  templateUrl: './parser-page.component.html',
  styleUrls: ['./parser-page.component.scss']
})
export class ParserPageComponent implements OnInit {
  title = 'angular-material-tab-router';  
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
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
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

}
