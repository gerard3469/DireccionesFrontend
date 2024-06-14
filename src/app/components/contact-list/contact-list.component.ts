import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(page: number = 1): void {
    this.contactService.getContacts(page, this.itemsPerPage, this.searchTerm).subscribe(data => {
      this.contacts = data.data;
      this.currentPage = data.current_page;
      this.totalItems = data.total;
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.showSuccessToast("Contact deleted success");
      this.loadContacts();
    });
  }

  viewContact(id: number): void {
    this.router.navigate([`/contact/${id}`]);
  }

  editContact(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  addContact(): void {
    this.router.navigate(['/new']);
  }

  onPageChange(page: number): void {
    this.loadContacts(page);
  }

  onSearch(): void {
    this.loadContacts();
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#189586",
      }
    }).showToast();
  }
  
}
