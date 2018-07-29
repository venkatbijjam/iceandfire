import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { sortJsonArray } from 'sort-json-array';
import { IceandfireService } from '../iceandfire.service';
import { ActivatedRoute, Router } from '@angular/router'
import { NgForOf } from '../../../node_modules/@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

  public data;
  constructor(private _route: ActivatedRoute, private _router: Router, public iceandfire: IceandfireService,
    private toastr: ToastrService) {

  }

  public term;

  public books = 'books';
  public booksDetails;
  public characters = 'characters';
  public charactersDetails;
  public houses = 'houses';
  public housesDetails;
  //public image= url('book.jpg');
  public retrivalDetails = ["books", "characters", "houses"];

  public gameOfThrones = [];
  public test = [];
  public showSpinner: boolean = false;
  public display1 = true;
  public loading = true;
  ngOnInit() {
   this.loading = true;
    //this.onCloseHandled();
    setTimeout(() => {
      this.dataLoading()
    },
      2000);
    //this.gameOfThrones =this.gameOfThrones.sort();
   }



  /** Loading Books,Houese and Charactor Data*/

  public dataLoading() {
    this.retrivalDetails.forEach(element => {

      this.iceandfire.getDetails(element).subscribe(

        data => {
          if (element == "books") {

            this.booksDetails = data;
            this.pushDatatoArray(this.booksDetails);
            this.toastr.success('Books Data Loaded', 'Success!');

          }
          else if (element == "characters") {
            this.charactersDetails = data;
            this.pushDatatoArray(this.charactersDetails);
            this.toastr.success('Characters Data Loaded', 'Success!');
          }
          else {
            this.housesDetails = data;
            this.pushDatatoArray(this.housesDetails);
            this.toastr.success('Houses Data Loaded', 'Success!');

          }

        },
        error => {
          this.toastr.error(element + ' is not Data Loaded', 'Major Error');

        }
      );


    });
    this.loading = false;


  }

  /**
   * pushDatatoArray
   */

  public pushDatatoArray = (pushdetails): any => {
    pushdetails.forEach(element => {
      this.gameOfThrones.push(element);

    });

  }





}
