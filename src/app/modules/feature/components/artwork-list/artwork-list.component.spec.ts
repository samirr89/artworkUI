import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ARTWORK_OBJECT } from 'src/app/models/mocks';
import { ArtworkListComponent } from './artwork-list.component';

describe('ArtworkListComponent', () => {
  let component: ArtworkListComponent;
  let fixture: ComponentFixture<ArtworkListComponent>;
  let artworkObject;
  let _artworkService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ArtworkListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    artworkObject = ARTWORK_OBJECT;
    _artworkService = jasmine.createSpyObj(['getArtworkList', 'setData']);
    component = new ArtworkListComponent(_artworkService);
  });
  it('should set artworkObject correctly from the service', () => {
    _artworkService.getArtworkList.and.returnValue(of(ARTWORK_OBJECT));
    fixture.detectChanges();
    expect(fixture.componentInstance.artworkObject).toEqual(ARTWORK_OBJECT);
  });



  it('should have initially 0 artworkList', () => {
    fixture.detectChanges();
    expect(component.artworkList.length).toEqual(0);
  });


});
