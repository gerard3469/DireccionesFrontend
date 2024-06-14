import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl +'/contacts';

  constructor(private http: HttpClient) { }

  getContacts(page: number = 1, perPage: number = 10,searchTerm: string = ''): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('perPage', perPage.toString());
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<any>(this.apiUrl, { params });
  }
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
