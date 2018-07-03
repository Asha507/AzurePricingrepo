import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { ResourcesService } from 'src/app/services/resources.service';
import { HttpClientModule } from '@angular/common/http';
import { EstimationsComponent } from './estimations/estimations.component';
import { MenuComponent } from './menu/menu.component';
import{RouterModule,Routes} from '@angular/router';
import { DataFilterPipe } from './data-filter.pipe'
import {DataTableModule} from "angular2-datatable";

const routes:Routes=[
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path:'Home',component:EstimationsComponent},
  {path:'Estimate',component:ProjectdetailsComponent}
 ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectdetailsComponent,
    EstimationsComponent,
    MenuComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ResourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
