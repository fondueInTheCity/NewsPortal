import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Tag} from '../model';
import {environment} from '../../environments/environment';

@Injectable()
export class SectionService {

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${environment.serverUrl}section/getAllCategories`);
  }

  getTags() {
    return this.http.get<Tag[]>(`${environment.serverUrl}section/getAllTags`);
  }
}
