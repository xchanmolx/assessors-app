import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod'; // Production
// import { environment } from 'src/environments/environment'; // Development
import { IAgricultural } from '../shared/models/agricultural';
import { KindOfLandsParams } from '../shared/models/kindOfLandsParams';
import { ICommercial } from '../shared/models/commercial';
import { ICountAgriculturalLands } from '../shared/models/countAgriculturalLands';
import { IIndustrial } from '../shared/models/industrial';
import { IResidential } from '../shared/models/residential';
import { ICountCommercialLands } from '../shared/models/countCommercialLands';
import { ICountIndustrialLands } from '../shared/models/countIndustrialLands';
import { ICountResidentialLands } from '../shared/models/countResidentialLands';
import { BarangayParams } from '../shared/models/barangayParams';
import { ICountBarangay } from '../shared/models/countBarangay';
import { IBarangay } from '../shared/models/barangay';

@Injectable({
  providedIn: 'root'
})
export class KindOfLandsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAgriculturals(agriculturalParams: KindOfLandsParams) {
    let params = new HttpParams();

    if (agriculturalParams.search) {
      params = params.append('search', agriculturalParams.search);
    }

    return this.http.get<ICountAgriculturalLands>(this.baseUrl + 'agricultural', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createAgricultural(values: IAgricultural) {
    return this.http.post<IAgricultural>(this.baseUrl + 'agricultural', values);
  }

  updateAgricultural(id: number, values: IAgricultural) {
    return this.http.put<IAgricultural>(this.baseUrl + 'agricultural/' + id, values);
  }

  deleteAgricultural(id: number) {
    return this.http.delete<IAgricultural>(this.baseUrl + 'agricultural/' + id);
  }

  getCommercials(commercialParams: KindOfLandsParams) {
    let params = new HttpParams();

    if (commercialParams.search) {
      params = params.append('search', commercialParams.search);
    }

    return this.http.get<ICountCommercialLands>(this.baseUrl + 'commercial', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createCommercial(values: ICommercial) {
    return this.http.post<ICommercial>(this.baseUrl + 'commercial', values);
  }

  updateCommercial(id: number, values: ICommercial) {
    return this.http.put<ICommercial>(this.baseUrl + 'commercial/' + id, values);
  }

  deleteCommercial(id: number) {
    return this.http.delete<ICommercial>(this.baseUrl + 'commercial/' + id);
  }

  getIndustrials(industrialParams: KindOfLandsParams) {
    let params = new HttpParams();

    if (industrialParams.search) {
      params = params.append('search', industrialParams.search);
    }

    return this.http.get<ICountIndustrialLands>(this.baseUrl + 'industrial', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createIndustrial(values: IIndustrial) {
    return this.http.post<IIndustrial>(this.baseUrl + 'industrial', values);
  }

  updateIndustrial(id: number, values: IIndustrial) {
    return this.http.put<IIndustrial>(this.baseUrl + 'industrial/' + id, values);
  }

  deleteIndustrial(id: number) {
    return this.http.delete<IIndustrial>(this.baseUrl + 'industrial/' + id);
  }

  getResidentials(residentialParams: KindOfLandsParams) {
    let params = new HttpParams();

    if (residentialParams.search) {
      params = params.append('search', residentialParams.search);
    }

    return this.http.get<ICountResidentialLands>(this.baseUrl + 'residential', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createResidential(values: IResidential) {
    return this.http.post<IResidential>(this.baseUrl + 'residential', values);
  }

  updateResidential(id: number, values: IResidential) {
    return this.http.put<IResidential>(this.baseUrl + 'residential/' + id, values);
  }

  deleteResidential(id: number) {
    return this.http.delete<IResidential>(this.baseUrl + 'residential/' + id);
  }

  getBarangays(barangayParams: BarangayParams) {
    let params = new HttpParams();

    if (barangayParams.search) {
      params = params.append('search', barangayParams.search);
    }

    return this.http.get<ICountBarangay>(this.baseUrl + 'barangay', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createBarangay(values: IBarangay) {
    return this.http.post<IBarangay>(this.baseUrl + 'barangay', values);
  }

  updateBarangay(id: number, values: IBarangay) {
    return this.http.put<IBarangay>(this.baseUrl + 'barangay/' + id, values);
  }

  deleteBarangay(id: number) {
    return this.http.delete<IBarangay>(this.baseUrl + 'barangay/' + id);
  }
  
}
