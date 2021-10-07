import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private readonly http: HttpClient) { }

  searchService(newEntry: any): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
    //.append('Access-Control-Allow-Headers', 'Content-Type')
    // .append('Access-Control-Allow-Methods', 'GET')
    // .append('Access-Control-Allow-Origin', '*')

    let url = "http://138.68.105.71/dashboard_filter";
    //let url = "http://127.0.0.1:5000/dashboard_filter";
    console.log(newEntry);
    return this.http.post(url, newEntry);
  }

  searchTwo(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
    //.append('Access-Control-Allow-Origin', '*')

    let url = "http://138.68.105.71/dashboard_filter";
    //let url = "http://127.0.0.1:5000/dashboard_filter";
    //let data={"pos_words": "darm", "neg_words": "", "author": "Matzik", "labels": ["", "", ""], "dates": ["2021-06-24", "2021-06-30"]}
    return this.http.post<any>(url, data, { headers });

  }

  authorGraphService(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
    let url = "http://138.68.105.71/author_growth_graph";
    //let url = "http://127.0.0.1:5000/author_growth_graph";
    return this.http.post<any>(url, data, { headers });
  }

  sourceGraphService(data:any):Observable<any>{
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
    //let url = "http://138.68.105.71/source_growth_graph"; 
    let url = "http://127.0.0.1:5000/source_growth_graph"   
    return this.http.post<any>(url, data, { headers });
  }

  networkGraphService():Observable<any>{
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
    let url = "http://138.68.105.71/visual_graph"; 
    //let url = "http://127.0.0.1:5000/visual_graph";   
    return this.http.post<any>(url, { headers });
  }


}
