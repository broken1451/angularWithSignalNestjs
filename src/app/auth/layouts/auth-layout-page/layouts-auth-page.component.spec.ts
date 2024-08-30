import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsAuthPageComponent } from './layouts-auth-page.component';

describe('LayoutsAuthPageComponent', () => {
  let component: LayoutsAuthPageComponent;
  let fixture: ComponentFixture<LayoutsAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutsAuthPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutsAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
