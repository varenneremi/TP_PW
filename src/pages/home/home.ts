import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: Result[];

  constructor(public navCtrl: NavController) {
  
  //this.results = tabresults;

  }

  getResults(ev: any) {
    this.results = [];

    let val = ev.target.value;

    if(val != '') {
      this.results = tabresults;
    }
    else {
      this.results = [];
    }
  }
}
export interface Result {
  title:string;
  author:string;
  date:object;
  image:string;
}

const tabresults: Result[] = [
  {
    title: 'Star Wars IV: La guerre des étoiles', 
    author: 'George Lucas',
    date: '25 Mai 1977',
    image: 'https://vignette.wikia.nocookie.net/fr.starwars/images/4/43/La_guerre_des_%C3%A9toiles_%28Roman%29.jpg/revision/latest?cb=20110315235125' 
  },
  
  {title: 'Star Wars V: L empire contre-attaque',
   author: 'George Lucas',
   date: '20 Mai 1980',
   image: 'https://media.senscritique.com/media/000016185716/source_big/L_Empire_contre_attaque.png'
  },
  {title: 'Star Wars VI: Le retour du Jedi',
  author: 'George Lucas',
  date: '27 Mai 1983',
  image: 'http://is3.mzstatic.com/image/thumb/Video3/v4/a5/16/13/a51613fb-0e6e-864f-d8a4-48b1dbaa00ea/source/1200x630bb.jpg'
}
];
