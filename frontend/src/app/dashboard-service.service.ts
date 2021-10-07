import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private readonly http: HttpClient) { }
  public searchService(newEntry: any): Observable<any> {
    let url = "";
    return this.http.post(url, newEntry);
  }

  // updateBookingStatus(bookingId, status): Observable<any>{
  //   const url = apiURL+"/bookings/update-booking-status/"+bookingId+"?status="+status;
  //   // curl -X PUT "http://localhost:9090/bookings/update-booking-status/1202?status=2" -H "accept: */*"
  //   let headers= new HttpHeaders()
  //     headers = headers.set("Authorization", "bearer " + localStorage.getItem("token"));
  //     //headers = headers.set('Access-Control-Allow-Origin', '*');
  //   return this.http.post<any>(url, {})
  // }
}
