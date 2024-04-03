import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import{Mission} from '../models/mission'

@Injectable({
    providedIn: 'root'
})
export class SpacexService{
    private missionlistAPI = 'https://api.spacexdata.com/v3/launches'
    private missionfilterAPI = `https://api.spacexdata.com/v3/launches?launch_year={{year}}`
    
    constructor(private http: HttpClient){}

    getMissionList(): Observable<Mission[]>{
        return this.http.get<Mission[]>(this.missionlistAPI)
    }

    getMissionListByYear(year: string): Observable<Mission[]>{
        return this.http.get<Mission[]>(this.missionfilterAPI)
    }

    getMissionDetail(flight_number: string): Observable<Mission>{
        const missiondetailsAPI = `https://api.spacexdata.com/v3/launches/${flight_number}`
        console.log("API: ", missiondetailsAPI)
        return this.http.get<Mission>(missiondetailsAPI)
    }
}