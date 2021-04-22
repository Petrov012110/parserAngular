import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

export interface CheckSelectedInterface {
    groups: any,
    trees: any
};

@Injectable()
export class CheckServices {
    public checkSelected: BehaviorSubject<CheckSelectedInterface> = new BehaviorSubject({
        groups: [],
        trees: [],
    });

    onSelectGroups(): Observable<CheckSelectedInterface> {
        return this.checkSelected.pipe(tap((res) => res.groups));
    }

    onSelectTrees(): Observable<CheckSelectedInterface> {
        return this.checkSelected.pipe(tap((res) => res.trees));
    }

}