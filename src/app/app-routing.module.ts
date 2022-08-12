import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkListComponent } from './modules/feature/components/artwork-list/artwork-list.component';
const routes: Routes = [
  { path: "", component: ArtworkListComponent },
  { path: "artwork", component: ArtworkListComponent,},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
