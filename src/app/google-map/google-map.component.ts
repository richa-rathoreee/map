import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  arrow:any
  map: any;
  constructor() {
    const loader = new Loader({
      apiKey: "AIzaSyBiJCPoQxIu7asv0dtz3ipWLNSFTNkNJtc",
      libraries: ["geometry"]
    });
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 40.74, lng: -74.18 },
        zoom: 2,
      });
      let myLatlng = new google.maps.LatLng(40.74, -74.18);
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 2,
          center: myLatlng,
          // mapTypeId: "roadmap",
          disableDefaultUI: true,
          // streetViewControl: true,
          // streetViewControlOptions: {
          //   position: google.maps.ControlPosition.LEFT_CENTER,
          // },
          // zoomControl: true,
          // zoomControlOptions: {
          //   position: google.maps.ControlPosition.RIGHT_BOTTOM,
          // },
          // panControl: false,
          // scaleControl: true,
          // rotateControl: true
        });
      // set the position of the tool bar


    });
  


  }


  ngOnInit(): void {
     this.arrow = document.getElementById("arrow-control") as HTMLElement;
     console.log(this.arrow)

  }

  ngAfterViewInit() {
    
    
console.log(this.arrow)
    // add to top right
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.arrow);
    console.log("")

    // const scale = document.getElementById("ruler") as HTMLElement;
    // this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(scale);

    // const filter = document.getElementById("filter") as HTMLElement;
    // this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(filter);

    // const street = document.getElementById("street-control") as HTMLElement;
    // this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(street);

    // const lock = document.getElementById("lock") as HTMLElement;
    // this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(lock)
  }

}
