import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  mapStyle: String[] = ["satellite", "terrain", "roadmap", "hybrid"];
  map: any
  display: any = false;

  constructor() {
    let contentOverlay, labelIndex = 0;;
    const labels = "123456789";
    const contentString = '<div id="content" style="height: 200px; width: 201px;">' +
      '<div id="img">' +
      "<img src='https://images.unsplash.com/photo-1561780339-45013972bece?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcmJ1Y2tzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'  alt='no img found'  width='200px' height='100px'>" +
      "</div>" +
      '<p>12344</p>' +
      '<p>Global coffee co,road</p>' +
      "</div>";

    const loader = new Loader({
      apiKey: "AIzaSyBiJCPoQxIu7asv0dtz3ipWLNSFTNkNJtc",
      libraries: ["geometry"]
    });

    loader.load().then(() => {
      new google.maps.Map(document.querySelector("#map") as HTMLElement, {
        center: { lat: 40.74, lng: -74.18 },
        zoom: 2,
      });
      const imageBounds = {
        north: 40.773941,
        south: 40.712216,
        east: -74.12544,
        west: -74.22655,
      }
      let myLatlng = new google.maps.LatLng(40.74, -74.18);

      let marker: any, marker2: any
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      })
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
     
      //Add a style-selector control to the map radio button
      const styleControl = document.getElementById("style-selector-control") as HTMLElement;
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);
      // add to top right
      const arrow = document.getElementById("arrow-control") as HTMLElement;
      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(arrow);

      const scale = document.getElementById("ruler") as HTMLElement;
      this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(scale);

      const filter = document.getElementById("filter") as HTMLElement;
      this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(filter);

      const street = document.getElementById("street-control") as HTMLElement;
      this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(street);

      const lock = document.getElementById("lock") as HTMLElement;
      this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(lock)

      const zoomIn = document.getElementById("fa-plus") as HTMLElement;
      zoomIn.addEventListener("click", () => {
        console.log("clik")
        // this.map.zoom=3.1;
        console.log(this.map)



      })
      const reset = document.getElementById("fa-undo") as HTMLElement;
      reset.addEventListener("click", () => {
        console.log("reset");


      })



      contentOverlay = new google.maps.GroundOverlay(
        "https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
        imageBounds
      );
      contentOverlay.setMap(this.map);


      this.map.addListener("click", (e1: any) => {
        // console.log(e1);
        marker = new google.maps.Marker({
          position: e1.latLng,
          map: this.map,
          draggable: true,
          title: "Drag me!",
          label: labels[labelIndex++ % labels.length],

        });

        //  this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(
        //     document.querySelector('.p-sidebar') as HTMLElement
        //   );
        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
          this.display = true;
        });
        google.maps.event.clearListeners(this.map, "click");
        this.map.addListener("click", (e2: any) => {
          // console.log(e2.latLng)
          marker2 = new google.maps.Marker({
            position: e2.latLng,
            map: this.map,
            draggable: true,
            title: "Drag me!",
            label: labels[labelIndex++ % labels.length],

          }); 
          marker2.addListener("click", () => {
            infoWindow.open(this.map, marker2);
          });
          // google.maps.event.clearListeners(this.map, "click")
          // console.log(marker2, marker)

          const bounds = new google.maps.LatLngBounds(
            marker.getPosition() as google.maps.LatLng,
            marker2.getPosition() as google.maps.LatLng
          );
          this.map.fitBounds(bounds);

          google.maps.event.addListener(marker, "position_changed", distance);
          google.maps.event.addListener(marker2, "position_changed", distance);

          // To add the marker to the map, call setMap();
          // marker.setMap(map);
          // marker2.setMap(map)
          distance();


          function distance() {



            const path = [
              marker.getPosition() as google.maps.LatLng,
              marker2.getPosition() as google.maps.LatLng,
            ];
            // console.log(path);


            const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
              // marker.getPosition() as google.maps.LatLng,
              // marker2.getPosition() as google.maps.LatLng
              path[0],
              path[1]
            );
            (document.getElementById("distance") as HTMLInputElement).innerHTML =
              String(distanceInMeters);
            (document.getElementById("origin") as HTMLInputElement).innerHTML = String(
              path[0]
            );
            (document.getElementById("destination") as HTMLInputElement).innerHTML = String(
              path[1]
            );


          }

        });

      })


    })


  }
  styleChange(event: any) {
    console.log(event.target.value);
    this.map.setMapTypeId(event.target.value);
  }

  ngOnInit(): void {
  }

}


