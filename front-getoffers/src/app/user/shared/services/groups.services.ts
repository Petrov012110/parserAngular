import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { catchError, map, tap } from "rxjs/operators";

export type GroupsType = {
    name: string
    // href: string
    // hrefImage: string
}

export interface TreeSelectedInterface {
    groups: any,
    trees: any
};

@Injectable()
export class GroupsServices {
    public treeSelected: BehaviorSubject<TreeSelectedInterface> = new BehaviorSubject({
        groups: [],
        trees: [],
    });

    constructor(private http: HttpClient) { }

    getGroups(): Observable<GroupsType[]> {
        return this.http.get(`http://212.119.243.127:5387/api/groups`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return Object
                        .keys(response)
                        .map(key => ({
                            ...response[key],
                            name: response[key].name,
                        }))
                }),
                // catchError(this.handleError.bind(this))
            )
    }

    private handleError(error: HttpErrorResponse) {
       
        
    }


    onSelectGroups(): Observable<TreeSelectedInterface> {
        return this.treeSelected.pipe(tap((res) => res.groups));
    }

    onSelectTrees(): Observable<TreeSelectedInterface> {
        return this.treeSelected.pipe(tap((res) => res.trees));
    }
}