import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NameGenerator } from './name-generator';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NameGeneratorService {
  constructor(private http:Http) {

  }

  lastNameGen:NameGenerator;
  firstNameGen:NameGenerator;
  chainlen:number = 2;
  data:any;
  transformer

  initializeNamegen (franchise) {
    this.getData(franchise)
    .subscribe(
      data => {
        this.data = data;
        if (data.first) {
          this.lastNameGen = new NameGenerator(this.chainlen, data.last)
          this.firstNameGen = new NameGenerator(this.chainlen, data.first)
        } else {
          this.firstNameGen = new NameGenerator(this.chainlen, data)
          this.lastNameGen = undefined
          this.transformer = (first => first)
        }
        if (data.transformer) {
          this.transformer = eval(`(${data.transformer})`)
        }
        this.transformer = this.transformer || function (first, last){ return `${first} ${last}`};
      }
    )
  }

  getData(franchise) {
    return this.http.get(`/assets/franchises/${franchise}.json`)
    .map(res => res.json())
  }

  getCheck () {
    return this.data[0];
  }

  getName () {
    if (this.lastNameGen) {
      return this.transformer(this.firstNameGen.newName(), this.lastNameGen.newName())
    } else {
      return this.transformer(this.firstNameGen.newName())
    }
  }

}
