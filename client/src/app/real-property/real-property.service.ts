import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment.prod'; // Production
import { environment } from 'src/environments/environment'; // Development
import { ICountMergeLand } from '../shared/models/mergeLand';
import { IMergeYears } from '../shared/models/mergeYears';
import { IOwnerNamePhotos } from '../shared/models/ownerNamePhotos';
import { IPagination } from '../shared/models/pagination';
import { IPhoto } from '../shared/models/photo';
import { PhotoParams } from '../shared/models/photoParams';
import { IRealProperty } from '../shared/models/realProperty';
import { RealPropertyParams } from '../shared/models/realPropertyParams';

@Injectable({
  providedIn: 'root'
})
export class RealPropertyService {
  baseUrl = environment.apiUrl;
  formFiles: string[] = [];

  constructor(private http: HttpClient) { }

  getRealProperties(realPropertyParams: RealPropertyParams) {
    let params = new HttpParams();

    if (realPropertyParams.search) {
      params = params.append('search', realPropertyParams.search);
    }

    if (realPropertyParams.taxableExempt) {
      params = params.append('taxableExempt', realPropertyParams.taxableExempt);
    }

    if (realPropertyParams.year) {
      params = params.append('year', realPropertyParams.year);
    }

    if (realPropertyParams.propertyLocation) {
      params = params.append('propertyLocation', realPropertyParams.propertyLocation);
    }

    params = params.append('sort', realPropertyParams.sort);
    params = params.append('pageIndex', realPropertyParams.pageNumber.toString());
    params = params.append('pageSize', realPropertyParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'realProperties', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getMergeYears() {
    return this.http.get<IMergeYears[]>(this.baseUrl + 'realProperties/merge-years');
  }

  getRealPropertiesSingleUseLand(realPropertyParams: RealPropertyParams) {
    let params = new HttpParams();

    if (realPropertyParams.year) {
      params = params.append('yearOne', realPropertyParams.year);
    }

    if (realPropertyParams.yearTwo) {
      params = params.append('yearTwo', realPropertyParams.yearTwo);
    }

    if (realPropertyParams.kindOfLand) {
      params = params.append('kindOfLand', realPropertyParams.kindOfLand);
    }

    return this.http.get<ICountMergeLand>(this.baseUrl + 'realProperties/land', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getRealPropertiesMixUseLands(realPropertyParams: RealPropertyParams) {
    let params = new HttpParams();

    if (realPropertyParams.year) {
      params = params.append('yearOne', realPropertyParams.year);
    }

    if (realPropertyParams.yearTwo) {
      params = params.append('yearTwo', realPropertyParams.yearTwo);
    }

    if (realPropertyParams.kindOfLand) {
      params = params.append('kindOfLand', realPropertyParams.kindOfLand);
    }

    return this.http.get<ICountMergeLand>(this.baseUrl + 'realProperties/lands/mixuse', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getRealPropertyPhotos(id: number) {
    return this.http.get<IOwnerNamePhotos>(this.baseUrl + 'realProperties/photo/' + id);
  }

  searchLotNo(lotNoValue: string) {
    return this.http.get<IRealProperty[]>(this.baseUrl + `realProperties/tracer?lotNo=${lotNoValue}`);
  }

  createRealProperty(values: any) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    
    return this.http.post<IRealProperty>(this.baseUrl + 'realProperties', values, {headers});
  }

  onPhotoFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) { 
      this.formFiles.push(event.target.files[i]);
    }
  }

  uploadPhoto(photoParams: PhotoParams) {
    let params = new HttpParams();

    if (photoParams.taxDecId) {
      params = params.append('taxDecId', photoParams.taxDecId);
    }

    params = params.append('subDirectory', photoParams.subDirectory);

    let formData = new FormData();

    for (let i = 0; i < this.formFiles.length; i++) {
      formData.append('formFiles', this.formFiles[i]);
    }

    return this.http.post(this.baseUrl + 'photos', formData, { params });
  }

  deletePhoto(id: number, photoParams: PhotoParams) {
    let params = new HttpParams();

    params = params.append('subDirectory', photoParams.subDirectory);

    return this.http.delete<IPhoto>(this.baseUrl + 'photos/' + id, { params });
  }

  updateRealProperty(id: number, values: any) {
    return this.http.put<IRealProperty>(this.baseUrl + 'realProperties/' + id, values);
  }

  deleteRealProperty(id: number, photoParams: PhotoParams) {
    let params = new HttpParams();

    params = params.append('subDirectory', photoParams.subDirectory);

    return this.http.delete<IRealProperty>(this.baseUrl + 'realProperties/' + id, { params });
  }

}
