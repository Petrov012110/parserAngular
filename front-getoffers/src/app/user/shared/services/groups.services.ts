import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export type GroupsType = {
    name: string
    // href: string
    // hrefImage: string
}

@Injectable()
export class GroupsServices {
    constructor(private http: HttpClient) { }
    
    getGroups(): Observable<GroupsType[]> {
        return this.http.get(`http://212.119.243.127:5387/api/groups`)
            .pipe(map((response: {[key:string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        name: response[key].name,
                    }))
                })
            )
    }
    
}