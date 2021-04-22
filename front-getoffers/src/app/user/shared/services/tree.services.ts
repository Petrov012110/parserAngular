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
    treeData: any;
    constructor(private http: HttpClient) {
        
    }

    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] { return this.dataChange.value; }

    getTree(): Observable<any> {
        return this.http.get(`http://212.119.243.127:5387/api/classificator`)
    }


    getAnswerTree() {
        this.treeSub = this.getTree().subscribe( vl => {
            const classificator: ClassificatorType = vl;
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
            this.treeData = resData;
            console.log('TREE1', this.treeData);
            
            // setClassificator(resData);

        })

    }


   
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    

    ngOnDestroy() {
        if(this.treeSub) {
            this.treeSub.unsubscribe()
          }
    }
}