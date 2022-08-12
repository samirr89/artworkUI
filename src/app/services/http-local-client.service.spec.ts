import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpLocalClient } from "./http-local-client.service";
describe('HttpLocalClient testing', () => {
    let httpLocalClient: HttpLocalClient;
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpLocalClient = TestBed.inject(HttpLocalClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should initialized', () => {
        expect(httpLocalClient).toBeTruthy();
    });
    it(`should have as BASE_URL 'https://api.artic.edu/api/v1'`, () => {
        const service = new HttpLocalClient(httpClient)
        expect(service.BASE_URL).toEqual('https://api.artic.edu/api/v1');
    });

});