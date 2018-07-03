import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.scss'],
  providers: [Location]
})
export class SingleCountryComponent implements OnInit {
  public country;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: CountriesService,
    private location: Location,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
    // get country
    this.route.params.subscribe(routeParams => {
      // console.log(routeParams);
      this.http.getSingleCountry(routeParams.name).subscribe(
        data => {
          this.country = data;
          this.toastr.success(`Loaded Details of ${this.country.name} 😍`);
          // console.log(this.country);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  // go back
  public goBackToPreviousPage() {
    this.location.back();
  }
}
