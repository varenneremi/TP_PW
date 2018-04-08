import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgIf } from '@angular/common';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { APIkey } from '../../app/tmdb'
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPage: any;
  results:  Observable <Result[]>;
  shakeSubscription: Subscription;
  //platform: Platform;
  //shake: Shake;

  constructor(public http : HttpClient, public alertCtrl: AlertController, public navCtrl: NavController, public platform: Platform, 
    public shake: Shake) {
    this.pushPage = DetailsPage;
    this.results = Observable.of([]);
   
  //this.results = tabresults;
  }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())  
      .switchMap(() => this.shake.startWatch())
      .switchMap(() => this.discoverMovies())        
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }
  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
  }


  fetchResults(query:string): Observable<Result[]> {
    let url : string = 'https://api.themoviedb.org/3/search/movie'
    return this.http.get(url,
    {
      params:
      { 
        query: query,
        api_key : APIkey
      }
    }).pluck('results');
  }

  private discoverMovies(): Observable<Result[]> {
    let url : string = 'https://developers.themoviedb.org/3/discover/movie'
    return this.http.get(url,
      {
        params:
        { 
          api_key : APIkey,
          primary_release_date : '2018'
        }
      }).pluck('results');
  }

  private showRandomMovieAlert(results: Result[]):void {
    var film = results[Math.floor(Math.random()*results.length)];
    let confirm = this.alertCtrl.create({
      title: film.title,
      message: film.overview,
      buttons: [
        {
          text: 'Cancel',
          
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(this.pushPage, film);
          }
        }
      ]
    });
    confirm.present();
  }

  getResults(ev: any) {
    this.results = Observable.of([]);
    let val = ev.target.value;

    if(val != '') {
      this.results = this.fetchResults(val) ;
      document.getElementById("No Results").style.display="none";
    }
    else {
      this.results = Observable.of([]);
      document.getElementById("No Results").style.display="block";
    }
  }
}

export interface Result {
  title:string;
  overview:string;
  release_date:string;
  poster_path:string;
  original_title:string;
  original_language:string;
  popularity:number;

}
/*
const tabresults: Result[] = [
  {
    title: 'Star Wars IV: La guerre des étoiles', 
    id : 4,
    release_date: '25 Mai 1977',
    poster_path: 'https://vignette.wikia.nocookie.net/fr.starwars/images/4/43/La_guerre_des_%C3%A9toiles_%28Roman%29.jpg/revision/latest?cb=20110315235125' 
  },
  
  {title: 'Star Wars V: L empire contre-attaque',
   id: 5,
   release_date: '20 Mai 1980',
   poster_path: 'https://media.senscritique.com/media/000016185716/source_big/L_Empire_contre_attaque.png'
  },

  {title: 'Star Wars VI: Le retour du Jedi',
  id: 6,
  release_date: '27 Mai 1983',
  poster_path: 'http://is3.mzstatic.com/image/thumb/Video3/v4/a5/16/13/a51613fb-0e6e-864f-d8a4-48b1dbaa00ea/source/1200x630bb.jpg'
}
];
*/
