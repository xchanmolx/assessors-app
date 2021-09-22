import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IPagination } from '../shared/models/pagination';
import { IRealProperty } from '../shared/models/realProperty';
import { RealPropertyParams } from '../shared/models/realPropertyParams';

@Injectable({
  providedIn: 'root'
})
export class RealPropertyService {
  baseUrl = environment.apiUrl;
  image!: any;
  response!: any;

  constructor(private http: HttpClient) { }

  getRealProperties(realPropertyParams: RealPropertyParams) {
    let params = new HttpParams();

    if (realPropertyParams.search) {
      params = params.append('search', realPropertyParams.search);
    }

    params = params.append('sort', realPropertyParams.sort);
    params = params.append('pageIndex', realPropertyParams.pageNumber.toString());
    params = params.append('pageSize', realPropertyParams.pageSize.toString());

    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IPagination>(this.baseUrl + 'realProperties', { observe: 'response', params, headers })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getRealProperty(id: number) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IRealProperty>(this.baseUrl + 'realProperties/' + id, {headers});
  }

  searchLotNo(lotNoValue: string) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IRealProperty[]>(this.baseUrl + `realProperties/tracer?lotNo=${lotNoValue}`, {headers});
  }

  createRealProperty(values: any) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    
    return this.http.post<IRealProperty>(this.baseUrl + 'realProperties', values, {headers});
  }

  updateRealProperty(id: number, values: any) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.put<IRealProperty>(this.baseUrl + 'realProperties/' + id, values, {headers});
  }

  deleteRealProperty(id: number) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.delete<IRealProperty>(this.baseUrl + 'realProperties/' + id, {headers});
  }

  selectFile(event: any) {
    this.image = event.target.files[0];
  }

  uploadPhoto() {
    let formData = new FormData();
    formData.append('image', this.image);

    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    this.http.post(this.baseUrl + 'realProperties/upload', formData, {headers})
      .toPromise().then(
        response => {
          this.response = response;
        },
        error => {
          console.log(error);
        }
      );
  }
}
