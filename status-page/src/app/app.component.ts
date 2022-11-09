import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import data from '../assets/jsonData.json';
import userData from '../assets/userData.json';
import { EventFormComponent } from './event-form/event-form.component';


export interface Tile {
  color: string;
  text: string;
}

export class User {

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'status-page';
  
  constructor(public dialog: MatDialog){
    
  }
  userData = userData;
  mydata = data.entries;

  userName = "Not Logged In"
  currentUser: any = null;

  

  public LoadUser(userIndex: number = -1) {
    this.currentUser = userIndex == -1 ? null : userData[userIndex];
    this.userName = this.currentUser == null ? "Not Logged In" : `Hello ${userData[userIndex].userDetails.firstName}` ;
  }

  public UserIsAuthorised() {
    return this.currentUser && this.currentUser.authorisation.roles.includes("ADMIN_IT");
  }

  public openDialog() {
    let dialogRef = this.dialog.open(EventFormComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
