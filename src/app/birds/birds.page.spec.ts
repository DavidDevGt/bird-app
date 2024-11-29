import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirdsPage } from './birds.page';

describe('BirdsPage', () => {
  let component: BirdsPage;
  let fixture: ComponentFixture<BirdsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
