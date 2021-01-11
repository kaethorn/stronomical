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

  it(`should have no error by default`, () => {
    const app = fixture.componentInstance;
    expect(app.error).toEqual('');
  });

  it('should render coordinates', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-content').textContent)
      .toContain('Locating');
  });
});
