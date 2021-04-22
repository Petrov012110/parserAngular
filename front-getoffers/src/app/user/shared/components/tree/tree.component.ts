import { Component, OnInit, Injectable } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TodoItemFlatNode, TodoItemNode, TreeServices } from '../../services/tree.services';
import { animate, group, state, style, transition, trigger } from '@angular/animations';




@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  animations: [

    trigger('simpleFade', [
      transition(':enter', [
        style({ opacity:0 }),
        animate(350)
      ])])],
  providers: [TreeServices]
})
export class TreeComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  // _selectedItems: any[];


  constructor(
    private _database: TreeServices
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  // descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const result = descendants.some(child => this.checklistSelection.isSelected(child));
  //   return result && !this.descendantsAllSelected(node);
  // }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    // HERE IS WHERE THE PART OF THE MODEL RELATED TO THE CLICKED CHECKBOX IS UPDATED
    this.checklistSelection.toggle(node);

    // HERE WE GET POTENTIAL CHILDREN OF THE CLICKED NODE
    // const descendants = this.treeControl.getDescendants(node);

    // HERE IS WHERE THE REST OF THE MODEL (POTENTIAL CHILDREN OF THE CLICKED NODE) IS UPDATED
    // this.checklistSelection.isSelected(node) 
    //   ? this.checklistSelection.select(...descendants)
    //   : this.checklistSelection.deselect(...descendants);   
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    // this.checkAllParentsSelection(node);


  }

  /* Checks all the parents when a leaf node is selected/unselected */
  // checkAllParentsSelection(node: TodoItemFlatNode): void {
  //   let parent: TodoItemFlatNode | null = this.getParentNode(node);
  //   while (parent) {
  //     this.checkRootNodeSelection(parent);
  //     parent = this.getParentNode(parent);
  //   }
  // }

  /** Check root node checked state and change it accordingly */
  // checkRootNodeSelection(node: TodoItemFlatNode): void {
  //   const nodeSelected = this.checklistSelection.isSelected(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected = descendants.length > 0 && descendants.every(child => {
  //     return this.checklistSelection.isSelected(child);
  //   });
  //   if (nodeSelected && !descAllSelected) {
  //     this.checklistSelection.deselect(node);
  //   } else if (!nodeSelected && descAllSelected) {
  //     this.checklistSelection.select(node);
  //   }
  // }

  /* Get the parent node of a node */
  // getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
  //   const currentLevel = this.getLevel(node);

  //   if (currentLevel < 1) {
  //     return null;
  //   }

  //   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  //   for (let i = startIndex; i >= 0; i--) {
  //     const currentNode = this.treeControl.dataNodes[i];

  //     if (this.getLevel(currentNode) < currentLevel) {
  //       return currentNode;
  //     }
  //   }
  //   return null;
  // }

  ngOnInit() {
    console.log(this.checklistSelection.isSelected);

  }

  // const onCheck = (checkedKeys: any, info: any) => {
  //   const paths: PathItemObjType[] = parsePath(checkedKeys.checked);
  //   const classificator: ClassificatorType = paths?.map((brand) =>({
  //     id: "0",
  //     name: brand.text || '',
  //     series: brand.children?.map((series) => ({
  //       name: series.text || '',
  //       models: series.children?.map((model) => ({
  //         name: model.text || ''
  //       }))
  //     })),
  //   })) || [];
  //   onChange?.(classificator);
  // };

  onClick() {

    // const arr = this.checklistSelection.selected.map(s => {
    //   if (s.level == 0) {
    //     this._selectedItems[0].push({
    //       name : s.item
    //     }

    //     )

    //   } 
    //   if (s.level == 1) {
    //       this._selectedItems[0][0].push({
    //         series : s.item
    //       })
    //   }
    //   if (s.level == 2) {
    //     this._selectedItems[0][0][0].push({
    //       model : s.item
    //     })
    // }
    // });
    // console.log(this._selectedItems);

    // this._selectedItems = this.checklistSelection.selected.map(s => s.level);
    // console.log(this._selectedItems);

  }

  checkCheckBoxvalue(event: { checked: any; }) {
    console.log(event.checked)
  }


  //  /** Select the category so we can insert the new item. */
  //  addNewItem(node: TodoItemFlatNode) {
  //    const parentNode = this.flatNodeMap.get(node);
  //    this._database.insertItem(parentNode!, '');
  //    this.treeControl.expand(node);
  //  }

  //  /** Save the node to database */
  //  saveNode(node: TodoItemFlatNode, itemValue: string) {
  //    const nestedNode = this.flatNodeMap.get(node);
  //    this._database.updateItem(nestedNode!, itemValue);
  //  }

}
