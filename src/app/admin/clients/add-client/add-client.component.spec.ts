import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddClientComponent } from "./add-client.component";
describe("AddClientComponent", () => {
  let component: AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AddClientComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
