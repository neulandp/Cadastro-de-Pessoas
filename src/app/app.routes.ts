import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PessoasListComponent } from './components/pessoas/pessoas-list/pessoas-list.component';
import { PessoasDetailsComponent } from './components/pessoas/pessoas-details/pessoas-details.component';
import { PessoaFormComponent } from './components/pessoas/pessoa-form/pessoa-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    children: [
      { path: 'pessoas', component: PessoasListComponent },
      { path: 'pessoas/new', component: PessoaFormComponent },
      { path: 'pessoas/edit/:id', component: PessoaFormComponent },
      { path: 'pessoas/:id', component: PessoasDetailsComponent }
    ]
  }
];