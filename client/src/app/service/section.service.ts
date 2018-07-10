import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../model/category";
import {environment} from "../../environments/environment";

@Injectable()
export class SectionService {

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${environment.serverUrl}section/getAllCategories`);
  }
}
