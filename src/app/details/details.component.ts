import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { IceandfireService } from '../iceandfire.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _activatedrouter: ActivatedRoute, private _router: Router, public iceandfire: IceandfireService) { }
  public books;
  public character;
  public houses;
  public bookCharators = [];
  public bookPovCharators = [];


  public fullDetails: any;
  ngOnInit() {

    let urlid: string = this._activatedrouter.snapshot.paramMap.get('url');
alert(urlid);
    this.iceandfire.getSingleDetails(urlid).subscribe(
      data => {
        console.log(data);
        this.fullDetails = data;
        if (data.url.includes('/books/')) {
          this.books = true;
          this.getBooksCharactors();
          console.log(this.bookPovCharators);
        console.log(this.bookCharators);
        }
      },
      error => {
        console.log("error");
      }
    );


  }

  public getBooksCharactors(){
    
    if (this.books) {

      for (var i = 0; i < 3; i++) {
       
        if(this.fullDetails.characters[i]!=undefined){
        this.iceandfire.getSingleDetails(this.fullDetails.characters[i]).subscribe(

          data => {
           
            this.bookCharators.push(data);
          }
        );
      }
      if(this.fullDetails.povCharacters[i]!=undefined){
       
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
