import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNuevoForm } from './cliente-nuevo-form';

describe('ClienteNuevoForm', () => {
  let component: ClienteNuevoForm;
  let fixture: ComponentFixture<ClienteNuevoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteNuevoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteNuevoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
