import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleItemComponent } from './bundle-item.component';

describe('BundleItemComponent', () => {
  let component: BundleItemComponent;
  let fixture: ComponentFixture<BundleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundleItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
