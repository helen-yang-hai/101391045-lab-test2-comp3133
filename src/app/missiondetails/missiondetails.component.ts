import { Component, OnInit, Input } from '@angular/core';
import {Mission} from '../models/mission'
import {SpacexService} from '../network/spacexapi.service'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css'
})
export class MissiondetailsComponent implements OnInit{

  @Input() mission: any

  constructor(private spacexService: SpacexService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const flight_number = params['flight_number']
      console.log("params: ", flight_number)
      this.spacexService.getMissionDetail(flight_number).subscribe((data: Mission) => {
        console.log("mission detail", data)
        this.mission = data;
        console.log("mission-detail: ", this.mission)
      });
    })
  }

}
