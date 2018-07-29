import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { IceandfireService } from '../iceandfire.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-houseview',
  templateUrl: './houseview.component.html',
  styleUrls: ['./houseview.component.css']
})
export class HouseviewComponent implements OnInit {

  constructor(private _activatedrouter: ActivatedRoute, private _router: Router,
    public iceandfire: IceandfireService, private toastr: ToastrService, private _location: Location) {

    //this.route.params.subscribe( params => console.log(params));
  }

  public houseDetails: any;
  public founderDetails = [];
  public heirDetails = [];
  public overLordDetails = [];
  public cadetBranchesDetails = [];
  public swornMembers = [];
  public currentLordDetails = [];
  public loading = true;
  ngOnInit() {

    this.loading = true;

    setTimeout(() => {
      this.getHouses()
    },
      2000);

  }

  public backClicked() {
    this._location.back();
  }


  /* Get Book Details */

  public getHouses() {

    let urlid: string = this._activatedrouter.snapshot.paramMap.get('url');

    this.iceandfire.getSingleDetails(urlid).subscribe(
      data => {
        console.log(data);
        this.houseDetails = data;
        this.getCadetBranches();
        this.getFounder();
        this.getHeir();
        this.getOverLord();
        this.getSwornMembers();
        this.getCurrentLord();
        this.toastr.success('Houses Data Loaded', 'Success!');

        console.log(this.heirDetails);
        //console.log(this.overLordDetails);
        //console.log(this.cadetBranchesDetails);
        //console.log(this.swornMembers);
        //console.log(this.founderDetails);
        console.log(this.currentLordDetails);
        // this._router.navigate(['/house', {url: this.houseDetails.url}]);
        //this.router.navigate(['search', {term: term}]);

      },
      error => {
        this.toastr.error('House Data is not loaded', 'Major Error');
      }
    );
    this.loading = false;

  }


  /*get Fomder Details*/
  public getFounder() {

    if (this.houseDetails.founder != '') {

      this.iceandfire.getSingleDetails(this.houseDetails.founder).subscribe(
        data => {

          this.founderDetails.push(data);
        },
        error => {
          this.toastr.error('Error while getting Founder Details', 'Major Error');
        }
      );
    }
  }

  /**
   * Get Current Lord Details
   */
  public getCurrentLord() {
    if (this.houseDetails.currentLord != '') {

      this.iceandfire.getSingleDetails(this.houseDetails.currentLord).subscribe(

        data => {
          this.currentLordDetails.push(data);
        },
        error => {
          this.toastr.error('Error while getting Lord Details', 'Major Error');

        }
      );
    }

  }
  
  /**
   * Get Heir Details
   */
  public getHeir() {


    if (this.houseDetails.heir != '') {
      this.iceandfire.getSingleDetails(this.houseDetails.heir).subscribe(
        data => {


          this.heirDetails.push(data);
        },
        error => {
          this.toastr.error('Error while getting Heir Details', 'Major Error');

        }
      );
    }
  }

  
  /**
   * Get OverLord Details
   */
  public getOverLord() {
    if (this.houseDetails.overlord != '') {

      this.iceandfire.getSingleDetails(this.houseDetails.overlord).subscribe(

        data => {
          this.overLordDetails.push(data);

        },
        error => {
          this.toastr.error('Error while getting OverLord Details', 'Major Error');

        }
      );
    }
  }


  
  /**
   * Get Cadet Branches Details
   */
  public getCadetBranches() {

    this.houseDetails.cadetBranches.forEach(element => {

      this.iceandfire.getSingleDetails(element).subscribe(

        data => {
          this.cadetBranchesDetails.push(data);
        },
        error => {
          this.toastr.error('Error while getting CadetBranches Details', 'Major Error');

        }
      );
    });
  }

  
  /**
   * Get Sworn Members Details
   */
  public getSwornMembers() {

    for (var i = 0; i < 3; i++) {

      if (this.houseDetails.swornMembers[i] != undefined) {
        this.iceandfire.getSingleDetails(this.houseDetails.swornMembers[i]).subscribe(

          data => {
            this.swornMembers.push(data);
          },
          error => {
            this.toastr.error('Error while getting swornMembers Details', 'Major Error');

          }

        );
      }

    }
  }

}

