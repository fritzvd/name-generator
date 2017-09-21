import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NameGeneratorService } from '../../services/name-generator.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NameGeneratorService]
})
export class HomePage {

  franchise:string;
  name:string;
  log: string;
  constructor(public navCtrl: NavController, private nameGeneratorService:NameGeneratorService) {

  }

  onFranChange (franchise) {
    this.nameGeneratorService.initializeNamegen(franchise);
  }

  genName():void {
    this.name = this.nameGeneratorService.getName()
    this.log = this.nameGeneratorService.getCheck();
  }

}
