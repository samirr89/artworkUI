import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArtworkService } from './artwork.service';
import { ARTWORK_OBJECT } from '../models/mocks';
import { environment } from 'src/environments/environment.prod';
describe('ArtworkService', () => {
  let service: ArtworkService;
  let url = environment.client.base_url;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArtworkService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getArtworkList and return an object of ArtworkObject', () => {
    service.getArtworkList(20, 1).subscribe((res) => {
      expect(res).toEqual(ARTWORK_OBJECT);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/artworks?limit=20&page=1`,
    });
    req.flush(ARTWORK_OBJECT);
  });
});