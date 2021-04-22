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

export interface SelectedInterface {
    groups: any,
    trees: any
};

@Injectable()
export class GroupsServices {

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
            )
    }


}