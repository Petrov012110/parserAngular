import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { map } from 'rxjs/operators'

export type ParsedDataType = {
    postId: string;
    text: string;
    date: number;
    price: string | number;
    post: string;
    hrefImg?: string[];
  };
  
  export type ParsedGroupType = {
    name: string;
    data: ParsedDataType[];
  }

  export interface ParsedGroupTypes  {
    name: string;
    data: ParsedDataType[];
  }
  
@Injectable({providedIn: 'root'})
export class TableServices {
    
    constructor(private http: HttpClient) { }

    getAll(data: object): Observable<ParsedGroupType[]> {
        return this.http.post(`http://212.119.243.127:5387/api/get_data`, data)
            .pipe(map((response: {[key:string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        name: response[key].name
                    }))
                })
            )
    }
    /**
     * Получаем пост для того чтобы открыть в отдельном окне 
    */
    getById(id: string) {
        return this.http.get( '')
    }
}