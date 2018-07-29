import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IceandfireService } from '../iceandfire.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-charactorview',
  templateUrl: './charactorview.component.html',
  styleUrls: ['./charactorview.component.css']
})
export class CharactorviewComponent implements OnInit {

  constructor(private _activatedrouter: ActivatedRoute, private _router: Router,
    public iceandfire: IceandfireService, private toastr: ToastrService, private _location: Location) { }

  public characterAllegiances = []
  public characterBooks = [];
  public charactorPovBooks = [];
  public characterDetails: any;
  public motherDetails = [];
  public fatherDetails = [];

  public spouseDetails = [];

  public loading = true;
  ngOnInit() {
    this.loading = true;

    setTimeout(() => {
      this.getCharactors()
    },
      2000);

  }


  /**
   * Location Back 
   */
  public backClicked() {
    this._location.back();
  }



  /**
   * get All Charactor Details 
   */
  public getCharactors() {
    let urlid: string = this._activatedrouter.snapshot.paramMap.get('url');

    this.iceandfire.getSingleDetails(urlid).subscribe(
      data => {
        console.log(data);
        this.characterDetails = data;
        this.getFatherDetails();
        this.getMotherDetails();
        this.getSpouseDetails();
        if (this.characterDetails.allegiances.length > 0) {
          this.getAllegiances();

        }
        if (this.characterDetails.books.length > 0) {

          this.getBooks();
        }
        if (this.characterDetails.povBooks.length > 0) {

          this.povAllBooks();
        }

        //console.log(this.characterAllegiances);
        //console.log(this.characterBooks);
        //console.log(this.charactorPovBooks);
        //console.log(this.motherDetails);
        //console.log(this.fatherDetails);
        //console.log(this.spouseDetails);
        this.toastr.success('All Charactors are Loaded', 'Success!');

      },
      error => {
        this.toastr.error('Error while Retreving Charactor data', 'Major Error');

      }
    );
    this.loading = false;

  }


  /**
   * get Allegiances Details 
   */
  public getAllegiances() {

    this.characterDetails.allegiances.forEach(element => {

      this.iceandfire.getSingleDetails(element).subscribe(
        data => {
          this.characterAllegiances.push(data);
        }
      );
    });
  }


  /**
   * get All Books Details 
   */

  public getBooks() {
    this.characterDetails.books.forEach(element => {

      //if(element !='https://anapioficeandfire.com/api/books/1'){
      this.iceandfire.getSingleDetails(element).subscribe(
        data => {
          this.characterBooks.push(data);
        }
      );
      // }
    });
  }



  /**
   * get POv Books Details 
   */
  public povAllBooks() {

    this.characterDetails.povBooks.forEach(element => {

      this.iceandfire.getSingleDetails(element).subscribe(
        data => {
          this.characterBooks.push(data);
        }
      );
    });
  }


  /**
   * get Father Details 
   */

  public getFatherDetails() {

    if (this.characterDetails.father != '') {
      this.iceandfire.getSingleDetails(this.characterDetails.father).subscribe(
        data => {
          this.fatherDetails.push(data);
          this.motherDetails.push(data);

        }
      );
    }
  }


  /**
   * get Mother Details 
   */
  public getMotherDetails() {
    if (this.characterDetails.mother != '') {
      this.iceandfire.getSingleDetails(this.characterDetails.mother).subscribe(
        data => {
          this.motherDetails.push(data);
        }
      );
    }
  }


  /**
   * get Spouse Details 
   */
  public getSpouseDetails() {


    if (this.characterDetails.spouse != '') {

      this.iceandfire.getSingleDetails(this.characterDetails.spouse).subscribe(
        data => {
          this.spouseDetails.push(data);
        }
      );
    }

  }

}
