import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider'
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import data from '../assets/jsonData.json';

describe('AppComponent', () => {

  var app: AppComponent;
  var fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSliderModule, MatToolbarModule,
        MatToolbarModule,
        MatGridListModule],
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
});
