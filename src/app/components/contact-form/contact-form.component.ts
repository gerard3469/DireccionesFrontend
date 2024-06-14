import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  isEditMode: boolean = false;
  contactId?: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phones: this.fb.array([]),
      emails: this.fb.array([]),
      addresses: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));;
    if (this.contactId) {
      this.isEditMode = true;
      this.loadContact(this.contactId);
    }
  }

  loadContact(id: number): void {
    this.contactService.getContact(id).subscribe(data => {
      this.contactForm.patchValue({
        first_name: data.first_name,
        last_name:data.last_name,
        
      });
      data.phones.forEach(phone => this.addPhone(phone.phone));
      data.emails.forEach(email => this.addEmail(email.email));
      data.addresses.forEach(address => this.addAddress(address.address));
    });
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addPhone(phone: string = ''): void {
    this.phones.push(this.fb.control(phone, Validators.required));
  }

  addEmail(email: string = ''): void {
    this.emails.push(this.fb.control(email, [Validators.required, Validators.email]));
  }

  addAddress(address: string = ''): void {
    this.addresses.push(this.fb.control(address, Validators.required));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.isEditMode && this.contactId) {
        
        this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(contact => {
          this.showSuccessToast('Contact update success','#189586');
          this.router.navigate(['/']);
        });
      } else {
        this.contactService.addContact(this.contactForm.value).subscribe(() => {
          this.showSuccessToast('Contact create success','#189586');
          this.router.navigate(['/']);
        });
      }
    } else{
      this.showSuccessToast('Validate fields','#cb3837');
    }
  }

  private showSuccessToast(message: string, color: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: color,
      }
    }).showToast();
  }

  getCurrentError(field: string): string {
    const errorsObject = this.contactForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if (!errors)
      return '';

    return errors[0];
  }
  hasError(field: string): boolean {
    const errorsObject = this.contactForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if (errors.length && (this.contactForm.get(field)?.touched || this.contactForm.get(field)?.dirty)) {
      return true;
    }

    return false;
  }
}
