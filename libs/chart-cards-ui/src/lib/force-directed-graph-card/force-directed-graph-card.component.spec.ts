import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceDirectedGraphCardComponent } from './force-directed-graph-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonMaterialModule } from '@ngf/material';

describe('ForceDirectedGraphCardComponent', () => {
  let component: ForceDirectedGraphCardComponent;
  let fixture: ComponentFixture<ForceDirectedGraphCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonMaterialModule
      ],
      declarations: [ForceDirectedGraphCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceDirectedGraphCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
