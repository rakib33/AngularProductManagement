import { Routes } from '@angular/router';
import { DirtyWarning } from '../Services/dirty-warning';
import { ProductListComponent } from '../PageContents/product-list.component';
import { ContactsComponent } from '../PageContents/contacts.component';

export const routes: Routes = [
    { path: "", redirectTo: "product-list", pathMatch: "full", canDeactivate: [DirtyWarning]  },
    { path: 'product-list', component: ProductListComponent, canDeactivate: [DirtyWarning] },
    { path: 'contacts', component: ContactsComponent, canDeactivate: [DirtyWarning] }    
];