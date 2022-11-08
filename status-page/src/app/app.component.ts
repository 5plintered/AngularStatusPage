import { Component } from '@angular/core';
import data from '../assets/jsonData.json';

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'status-page';
  
  constructor(){
    console.log(data);

    "string".toLocaleUpperCase();

    
  }

  mydata = data.entries;

  tiles: Tile[] = [
    {text: 'One', color: 'lightblue'},
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'}
  ];
}
