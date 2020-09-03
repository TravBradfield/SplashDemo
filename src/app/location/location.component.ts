import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  
  @Input() location;
  @Input() currentOrigin;

  locationDetails: any;


  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    console.log('Location: ', this.location);
    console.log('currentOrigin: ', this.currentOrigin);

    this.loadLocationDetails();
  }

  loadLocationDetails() {
    this.locationService.getLocationDetails(this.location.url).subscribe(locRes => {
      console.log('Location Result: ', locRes);
      this.locationDetails = locRes;
    })
  }

}
