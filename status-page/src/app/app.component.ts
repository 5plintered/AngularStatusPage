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
  userData = userData;
  statusTiles = data.entries;

  userName = "Not Logged In"
  currentUser: any = null;
  
  constructor(public dialog: MatDialog){
    
  }

  public LoadUser(userIndex: number = -1) {
    this.currentUser = userIndex == -1 ? null : userData[userIndex];
    this.userName = this.currentUser == null ? "Not Logged In" : `Hello ${userData[userIndex].userDetails.firstName}` ;
    
    if(this.currentUser != null) {
      var roles: string[] = this.currentUser.authorisation.roles;
      this.statusTiles = [];
      
      if(roles.includes("REGION_PERTH")){
        var perthStatuses = data.entries.filter(entry => entry.region == "Perth");
        this.statusTiles = this.statusTiles.concat(perthStatuses)
      }
      
      if(roles.includes("REGION_HOUSTON")){
        var houstonStatuses = data.entries.filter(entry => entry.region == "Houston");
        this.statusTiles = this.statusTiles.concat(houstonStatuses)
      }
    }
  }

  public UserIsAuthorised() {
    return this.currentUser && this.currentUser.authorisation.roles.includes("ADMIN_IT");
  }

  public openDialog() {
    let dialogRef = this.dialog.open(EventFormComponent, {
      height: '75%',
      width: '75%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public getStatusColor(status: string) {
    switch (status) {
      case "Cluster Disruption":
        return "one";
      case "Slurm Maintenance":
        return "two";
      case "Webpage Disruption":
        return "three";
      default:
        return "default";
    }
  }
}