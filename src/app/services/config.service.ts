import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: any = null;
  private _configUrl = 'assets/config/config.json'; // URL to web API
  constructor(private _http: HttpClient) {
    this.loadConfigs();
  }

  loadConfigs() {
    return this._http
      .get(this._configUrl)
      .pipe(
        catchError((error) => {
          console.error('Error loading config file', error);
          throw error;
        })
      )
      .subscribe((data: any) => {
        this._config = data;
      });
  }

  get firstName() {
    return this._config.firstName || '';
  }

  get lastName() {
    return this._config.lastName || '';
  }
}
