
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AquilaModules } from './models/aquila.model';
import { ArtworkListComponent } from './modules/feature/components/artwork-list/artwork-list.component';
import { CoreModule } from './modules/core/core.module';
import { HeaderComponent } from './modules/core/header/header.component';
import { ArtworkService } from './services/artwork.service';
import { HttpLocalClient } from './services/http-local-client.service';




@NgModule({
  declarations: [
    AppComponent,
    ArtworkListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...AquilaModules
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
