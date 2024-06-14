import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

const routes: Routes = [
  { path: 'contactList', component: ContactListComponent },
  { path: '', redirectTo: 'contactList', pathMatch: 'full' },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'edit/:id', component: ContactFormComponent },
  { path: 'new', component: ContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
