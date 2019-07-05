import {NgModule} from '@angular/core';
import {ListComponent} from './list/list.component';
import {CreateOrEditComponent} from './create-or-edit/create-or-edit.component';
import {DetailsComponent} from './details/details.component';
import {TodosRoutingModule} from './todos.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent, CreateOrEditComponent, DetailsComponent],
  imports: [
    // Built in modules

    // My Modules
    SharedModule,
    TodosRoutingModule,
    // 3party Modules
  ]
})
export class TodosModule {
}
