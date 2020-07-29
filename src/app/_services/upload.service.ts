import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Image } from '../_models/image';
import { ImageRaw } from '../_models/image-raw';
import { ImageFactory } from '../_models/image-factory';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(data) {
    return this.http.post<any>(
      `${environment.apiUrl}/upload`,
      data,
    );
  }

  // damit die upload-komponenten generisch bleiben
  // ToDo: in getCourse (API) auch benutzen
  getAll(ressourceType: string, ressourceId: number): Observable<Image[]> {
    return this.http.post<ImageRaw[]>(
      `${environment.apiUrl}/listFiles`, {objectType: ressourceType, objectId: ressourceId})
      .pipe(
        retry(3),
        map((imagesRaw => ImageFactory.fromRaw(imagesRaw))),
        catchError(this.errorHandler)
      );
  }

  // HTTP DELETE meistens geblockt auf Server
  remove(imageId: number): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/removeFile`,
      { id: imageId },
      { responseType: 'text'}
    );
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

}
