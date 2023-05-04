import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface HeadersType {
  name: string; // name header
  key: string; // name to storage
}

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  url401 = '';
  reload = 0;

  public urlApi = environment.urlApi;

  constructor(
    private http: HttpClient,
    public storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  getHeaders(extraValues?: any): HttpHeaders {
    if (!extraValues) {
      extraValues = { 'Content-Type': 'application/json' };
    }
    return new HttpHeaders({
      ...extraValues,
    });
  }

  public getAll(
    extension: string,
    extraParams?: {
          [param: string]:
            | string
            | number
            | null | undefined | Date;
        }
  ): Promise<any> {
    let params = '';
    if(extraParams){
      Object.keys(extraParams)?.forEach((param) =>{
        params= params + param + '=' + extraParams[param] + '&';
      })
      params = params.substring(0, params.length - 1)
    }
    return lastValueFrom(
      this.http.get<any>(this.urlApi + extension +(params? ('?'+ params) : ''), {
        headers: this.getHeaders(),
      }),
      { defaultValue: [] }
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error;
      });
  }

  public getById(
    extension: string,
    id: string,
    extraParams?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
  ): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(this.urlApi + extension + '/' + id, {
        headers: this.getHeaders(),
        params: { ...extraParams },
      })
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error;
      });
  }

  public post(element: any, extension: string): Promise<any> {
    this.cleanObject(element);
    return firstValueFrom(
      this.http.post<any>(this.urlApi + extension, element, {
        headers: this.getHeaders(),
      })
    )
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error;
      });
  }

  cleanObject(element: any) {
    Object.keys(element).forEach((key) => {
      if (element[key] === null) {
        delete element[key];
      }
    });
  }
}
