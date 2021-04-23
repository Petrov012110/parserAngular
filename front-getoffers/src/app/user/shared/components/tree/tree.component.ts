import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CheckServices } from '../../services/check.services';
import { ClassificatorType, TreeServices } from '../../services/tree.services';


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
  selectedGroups: string[] = [];
  constructor(
    private treeService: TreeServices,
    private checkService: CheckServices
    ) { }
    
    
    ngOnInit(): void {
      this.treeService.getTree().subscribe(((data) => {
        const classificator: ClassificatorType = data;
        const resData = classificator.map((brand) => ({
          title: brand.name,
          key: brand.name,
          children: brand.series?.map((seriesItem) => ({
            title: seriesItem.name,
            key: `${brand.name}/${seriesItem.name}`,
            children: seriesItem.models?.map((model) => ({
              title: model.name,
              key: `${brand.name}/${seriesItem.name}/${model.name}`,
            }))
          }))
        }));
        this.nodes = resData
      }
      ));
    }




  

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event.keys);
    this.checkService.checkSelected.next({ ...this.checkService.checkSelected.value, items: event.keys});
  }
}
