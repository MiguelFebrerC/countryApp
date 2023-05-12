import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  constructor(private countryService: CountryService) {}
  searchByRegion(term: string): void {
    this.countryService
      .searchRegion(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
