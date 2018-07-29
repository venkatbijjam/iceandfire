import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IceandfireService } from '../iceandfire.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})
export class BookviewComponent implements OnInit {

  constructor(private _activatedrouter: ActivatedRoute, private _router: Router, 
    public iceandfire: IceandfireService,private toastr: ToastrService,private _location: Location) { }
  public books;
  public character;
  public houses;
  public bookCharators = [];
  public bookPovCharators = [];
public loading=true;

  public fullDetails: any;
  ngOnInit() {
    this.loading=true;

    setTimeout(()=>{
      this.getBookDetails()},
      2000);

  }

  
/**
 * Location Back
 */
  public backClicked() {
    this._location.back();
  }

  
/**
 * get All Book Details 
 */
  public getBookDetails(){
    let urlid: string = this._activatedrouter.snapshot.paramMap.get('url');
 
    this.iceandfire.getSingleDetails(urlid).subscribe(
      data => {
        console.log(data);
        this.fullDetails = data;
        if (data.url.includes('/books/')) {
          this.books = true;
          this.getBooksCharactors();
         // console.log(this.bookPovCharators);
         // console.log(this.bookCharators);
        }
      this.toastr.success('Book Data is Loaded', 'Success!');

      },
      error => {
        this.toastr.error('Book data is not loaded', 'Major Error');
       
      }
    );
  this.loading= false;


  }


  
/**
 * get Charactor Details 
 */
  public getBooksCharactors() {

    if (this.books) {

      for (var i = 0; i < 3; i++) {

        if (this.fullDetails.characters[i] != undefined) {
          this.iceandfire.getSingleDetails(this.fullDetails.characters[i]).subscribe(

            data => {

              this.bookCharators.push(data);
            }
          );
        }
        if (this.fullDetails.povCharacters[i] != undefined) {

          this.iceandfire.getSingleDetails(this.fullDetails.povCharacters[i]).subscribe(

            data => {
              this.bookPovCharators.push(data);
            }
          );

        }

      }

    }
  }



}
