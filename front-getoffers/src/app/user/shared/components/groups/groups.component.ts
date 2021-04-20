import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { GroupsServices } from '../../services/groups.services';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

  groups: string[] = [];
  selectedGroups: string[] = [];

  constructor(private groupService: GroupsServices) { }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(data => {
      data.forEach(el => {
        if (el.name) {
          this.groups.push(el.name)
        }
      })
    });
  }

  onGroupsChange(options: MatListOption[]) {
    this.selectedGroups = options.map(o => o.value);

    this.groupService.treeSelected.next({ ...this.groupService.treeSelected.value, groups: this.selectedGroups});
    console.log('HELLO SELECT', options.map(o => o.value));
  }

}
