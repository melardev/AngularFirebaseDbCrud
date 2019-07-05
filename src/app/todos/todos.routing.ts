import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {DetailsComponent} from './details/details.component';
import {ModuleWithProviders} from '@angular/core';
import {CreateOrEditComponent} from './create-or-edit/create-or-edit.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'create', component: CreateOrEditComponent},
  {path: ':id', component: DetailsComponent},
  {path: ':id/edit', component: CreateOrEditComponent},
  {path: ':id/delete', component: DetailsComponent},
];

export const TodosRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
