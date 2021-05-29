import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(){
  firebase.initializeApp({
     apiKey:'AIzaSyBBiKDluXN7-yCpo2plszIV-uwLycuG02Y',
     authDomain:'ng-recipe-book-ba334-default-rtdb.firebaseio.com'
  })
  }
  // loadedFeature = 'recipe';
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
}
