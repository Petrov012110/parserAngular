import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { TreeServices } from '../../services/tree.services';


@Component({
  selector: 'nz-demo-tree-basic-controlled',
  styleUrls: ['./tree.component.scss'],
  templateUrl: './tree.component.html',
  providers: [TreeServices] 
})
export class TreeComponent implements OnInit  {
  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  nodes:any

  constructor(
    private treeService: TreeServices
    ) { }
    
    
    ngOnInit(): void {
      this.nodes = this.treeService.getAnswerTree();
      console.log('TREE', this.nodes);
      
      
    }


  

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}
