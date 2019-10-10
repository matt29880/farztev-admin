import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TripsService } from '../trips/trips.service';
import { Trip } from './trip';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  templateUrl: 'trip.component.html',
  styleUrls: ['trip.component.css']
})
export class TripComponent implements OnInit {

  constructor(public tripsService: TripsService, private route: ActivatedRoute, private router: Router) {
  }
  dataAvailable = false;
  tripId: number;
  trip: Trip;
  @ViewChild('f') form: NgForm;

  ngOnInit() {
    this.initializeEmptyArticle();

    if (this.route.snapshot.paramMap.get('id') == 'new') {
      return;
    }
    // The JavaScript (+) operator converts the string to a number
    this.tripId = +this.route.snapshot.paramMap.get('id');
    if (this.tripId != null) {
      this.getTrip().subscribe(trip => { this.trip = trip;this.dataAvailable = true; });
    }
  }

  initializeEmptyArticle() {
    this.trip = new Trip();
    this.trip.online = false;
  }

  getTrip(): Observable<Trip> {
    return this.tripsService.getTrip(this.tripId);
  }
  deleteTrip(): void {
    if (confirm("Are you sure to want to remove the trip '" + this.trip.name + "' ?")) {
      this.tripsService.deleteTrip(this.tripId).subscribe(response => console.log("Trip deleted !"));
      this.router.navigate(['trips'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    if (this.trip.id == null) {
      this.tripsService.insertTrip(this.trip).subscribe(trip => { this.trip = trip; console.log("Trip inserted !");this.router.navigate(['trips'], {relativeTo: this.route.parent}); });
    } else {
      this.tripsService.updateTrip(this.tripId, this.trip).subscribe(response => {console.log("Trip updated !");this.router.navigate(['trips'], {relativeTo: this.route.parent});});
    }
  } 
}
