import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirdService {

  private API_URL = 'https://xeno-canto.org/api/2/recordings?query=cnt:guatemala';

  constructor(private http: HttpClient) {}

  getBirds(): Observable<any> {
    this.http.get(this.API_URL).subscribe(
      data => {
        console.log('Datos recibidos:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );

    return this.http.get(this.API_URL);
  }
}
