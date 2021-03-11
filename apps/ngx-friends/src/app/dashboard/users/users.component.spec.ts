import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [UsersComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
