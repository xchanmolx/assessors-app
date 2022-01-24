import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment.prod'; // Production
import { environment } from 'src/environments/environment'; // Development
import { ICountMunicipalityCityDistrict } from '../shared/models/countMunicipalityCityDistrict';
import { ICountProvince } from '../shared/models/countProvince';
import { ICountStaff } from '../shared/models/countStaff';
import { IMunicipalityCityDistrict } from '../shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from '../shared/models/municipalityCityDistrictParams';
import { IProvince } from '../shared/models/province';
import { ProvinceParams } from '../shared/models/provinceParams';
import { IStaff } from '../shared/models/staff';
import { StaffParams } from '../shared/models/staffParams';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(this.baseUrl + 'admin/usersWithRoles', {headers});
  }

  updateUserRoles(user: IUser, roles: {}) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<IUser>(this.baseUrl + 'admin/editRoles/' + user.userName, roles, {headers});
  }

  getStaffs(staffParams: StaffParams) {
    let params = new HttpParams();

    if (staffParams.search) {
      params = params.append('search', staffParams.search);
    }

    return this.http.get<ICountStaff>(this.baseUrl + 'staff', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createStaff(values: IStaff) {
    return this.http.post<IStaff>(this.baseUrl + 'staff', values);
  }

  updateStaff(id: number, values: IStaff) {
    return this.http.put<IStaff>(this.baseUrl + 'staff/' + id, values);
  }

  deleteStaff(id: number) {
    return this.http.delete<IStaff>(this.baseUrl + 'staff/' + id);
  }

  getMunicipalityCityDistricts(municipalityCityDistrictParams: MunicipalityCityDistrictParams) {
    let params = new HttpParams();

    if (municipalityCityDistrictParams.search) {
      params = params.append('search', municipalityCityDistrictParams.search);
    }

    return this.http.get<ICountMunicipalityCityDistrict>(this.baseUrl + 'municipalityCityDistrict', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createMunicipalityCityDistrict(values: IMunicipalityCityDistrict) {
    return this.http.post<IMunicipalityCityDistrict>(this.baseUrl + 'municipalityCityDistrict', values);
  }

  updateMunicipalityCityDistrict(id: number, values: IMunicipalityCityDistrict) {
    return this.http.put<IMunicipalityCityDistrict>(this.baseUrl + 'municipalityCityDistrict/' + id, values);
  }

  deleteMunicipalityCityDistrict(id: number) {
    return this.http.delete<IMunicipalityCityDistrict>(this.baseUrl + 'municipalityCityDistrict/' + id);
  }

  getProvinces(provinceParams: ProvinceParams) {
    let params = new HttpParams();

    if (provinceParams.search) {
      params = params.append('search', provinceParams.search);
    }

    return this.http.get<ICountProvince>(this.baseUrl + 'province', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  createProvince(values: IProvince) {
    return this.http.post<IProvince>(this.baseUrl + 'province', values);
  }

  updateProvince(id: number, values: IProvince) {
    return this.http.put<IProvince>(this.baseUrl + 'province/' + id, values);
  }

  deleteProvince(id: number) {
    return this.http.delete<IProvince>(this.baseUrl + 'province/' + id);
  }
}
