import { Component, OnInit } from '@angular/core';
import {Mission} from '../models/mission'
import {SpacexService} from '../network/spacexapi.service'
import {Router} from '@angular/router'

@Component({
  //standalone: true,
  //imports:[NgFor],
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.css'
})
export class MissionlistComponent implements OnInit {

  missions: any[] = []
  selectedMission?: Mission
  launch_years: string[] = []
  selectedYear: string | null = null

  constructor(private spacexService: SpacexService, private router: Router) { }

  ngOnInit(): void {
    this.spacexService.getMissionList().subscribe((data: Mission[]) => {
      console.log("mission list", data)
      this.missions = data;
      this.getAllLaunchYear();
    });
  }

  onSelect(mission: Mission): void {
    this.selectedMission = mission
    console.log("selected mission: ", this.selectedMission)
    console.log('flight number: ', this.selectedMission.flight_number)
    const flight_number = this.selectedMission.flight_number
    this.router.navigate(['/', flight_number])
  }

  private getAllLaunchYear(): void {
    const launchYearsSet = new Set<string>();
    this.missions.forEach(mission => {
      if (mission.launch_year){
        launchYearsSet.add(mission.launch_year);
      }
    })
    this.launch_years = Array.from(launchYearsSet)
  }

  onSelectedYear(year: string): void {
    this.selectedYear = year;
  }

  getFilteredMissions(): Mission[] {
    return this.selectedYear ? this.missions.filter(mission => mission.launch_year === this.selectedYear) : this.missions;
  }


}
