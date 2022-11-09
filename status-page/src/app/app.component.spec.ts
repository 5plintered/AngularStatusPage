import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import data from '../assets/jsonData.json';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AppComponent', () => {

  var app: AppComponent;
  var fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSliderModule, MatToolbarModule,
        MatToolbarModule,
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'status-page'`, () => {
    expect(app.title).toEqual('status-page');
  });

  it('should render the ToolBar', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('Status Page');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('status-page app is running!');
  });
  
  it('should render status data', () => {
    app.mydata = data.entries;
    fixture.detectChanges();

    var expectations = [
      "PERTH - Slurm maintenance",
      "HOUSTON - Cluster Disruption"
    ]

    const compiled = fixture.nativeElement as HTMLElement;
    var renderedEntries = Array.from(compiled.querySelectorAll("mat-grid-tile mat-grid-tile-header"));
    var renderedTitles = renderedEntries.map( entry => { var element = entry as HTMLElement;
      return element.innerText;
    })
    expect(renderedTitles).toEqual(expectations);
  });
  
  it('should render open the login menu on click', () => {
    app.mydata = data.entries;
    fixture.detectChanges();
    
    let button = fixture.debugElement.nativeElement.querySelector('#UserMenuButton');
    button.click();
    fixture.detectChanges();
    let menu = document.querySelector(".cdk-overlay-container #cdk-overlay-0");

    expect(menu).toBeTruthy();
  });
  
  it('should show the username when logged in', () => {
    app.mydata = data.entries;
    fixture.detectChanges();
    let username = fixture.debugElement.nativeElement.querySelector('#username') as HTMLElement;
    expect(username.textContent).toEqual("Not Logged In");
    app.LoadUser(0);
    fixture.detectChanges();
    expect(username.textContent).toEqual("Hello Wilson");
  });
  
  it('should show the create card when admin is logged in', () => {
    app.mydata = data.entries;
    fixture.detectChanges();
    let createCard = fixture.debugElement.nativeElement.querySelector('#createCard') as HTMLElement;
    expect(createCard).toBeFalsy();
    
    app.LoadUser(0)
    fixture.detectChanges();
    
    createCard = fixture.debugElement.nativeElement.querySelector('#createCard') as HTMLElement;
    expect(createCard).toBeTruthy();

  }); 


});
