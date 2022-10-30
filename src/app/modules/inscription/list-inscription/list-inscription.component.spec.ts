import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscriptionComponent } from './list-inscription.component';

describe('ListInscriptionComponent', () => {
  let component: ListInscriptionComponent;
  let fixture: ComponentFixture<ListInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
