import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesComponent } from './coordinates.component';
import { CoordinatesModule } from './coordinates.module';

describe('CoordinatesComponent', () => {
  let component: CoordinatesComponent;
  let fixture: ComponentFixture<CoordinatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatesModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have default coordinates`, () => {
    const app = fixture.componentInstance;
    expect(app.coordinates).toEqual('Locating…');
  });

  it('should render coordinates', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Locating');
  });
});
