import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDetailsComponent } from './brands-details.component';

describe('BrandsDetailsComponent', () => {
  let component: BrandsDetailsComponent;
  let fixture: ComponentFixture<BrandsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandsDetailsComponent]
    });
    fixture = TestBed.createComponent(BrandsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
