import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtworkObject } from '../modules/feature/models/artwork.model';
import { HttpLocalClient } from './http-local-client.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor(private httpLocalClient: HttpLocalClient) { }
  getArtworkList(pageSize: number, page: number): Observable<ArtworkObject> {
    const url = `/artworks?limit=${pageSize}&page=${page}`;
    return this.httpLocalClient.getT<ArtworkObject>(url);
  }


}
