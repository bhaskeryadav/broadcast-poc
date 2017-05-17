import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ServerComponent} from './server/server.component';
import {ClientComponent} from './client/client.component';

const routes: Routes = [
  { path: 'server',  component: ServerComponent },
  { path: 'client', component: ClientComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
