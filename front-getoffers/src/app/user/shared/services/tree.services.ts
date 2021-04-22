import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children!: TodoItemNode[];
    item!: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    item!: string;
    level!: number;
    expandable!: boolean;
}

export type ModelType = {
    name: string;
};

export type SeriesType = {
    name: string;
    models?: ModelType[];
};

export type BrandType = {
    id: string;
    name: string;
    series?: SeriesType[];
};

export type ClassificatorType = BrandType[];

@Injectable({ providedIn: 'root' })
export class TreeServices implements OnDestroy {

    treeSub: Subscription = new Subscription;
    constructor(private http: HttpClient) {
        this.initialize();
    }

    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] { return this.dataChange.value; }

    getTree(): Observable<any> {
        return this.http.get(`http://212.119.243.127:5387/api/classificator`)
    }

    initialize() {
        let data;
        this.treeSub = this.getTree().subscribe( vl => {
          const classificator = vl as ClassificatorType;
          const resData: { [key: string]: any } = {};
          classificator.forEach((val) => {
            if (val.series) {
              resData[val.name] = {}
              val.series.forEach((seriesItem) => {
                if (seriesItem.models) {
                  resData[val.name][seriesItem.name] = {};
                  seriesItem.models.forEach((modelsItem) => {
                    resData[val.name][seriesItem.name][modelsItem.name] = null
                  });
                } else resData[val.name][seriesItem.name] = null
              })
            } else resData[val.name] = null
          });
          data = this.buildFileTree(resData, 0);
          this.dataChange.next(data);
        })
    }
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new TodoItemNode();
            node.item = key;
            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.item = value;
                }
            }
            return accumulator.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: TodoItemNode, name: string) {
        if (parent.children) {
            parent.children.push({ item: name } as TodoItemNode);
            this.dataChange.next(this.data);
        }
    }

    updateItem(node: TodoItemNode, name: string) {
        node.item = name;
        this.dataChange.next(this.data);
    }

    ngOnDestroy() {
        if(this.treeSub) {
            this.treeSub.unsubscribe()
          }
    }
}