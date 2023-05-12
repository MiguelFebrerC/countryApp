import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`);
  }
  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${country}`);
  }
  searchRegion(region: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`);
  }
  searchCoutryAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries: Country[]) =>
        countries.length > 0 ? countries[0] : null
      ),
      catchError(() => of(null))
    );
  }
}
