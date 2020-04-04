import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule }   from '@angular/forms';

import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';
import { BanksComponent } from './banks/banks.component';
import { ChitsComponent } from './chits/chits.component';
import { FdsComponent } from './fds/fds.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ExpenseComponent } from './expense/expense.component';
import { AssetsComponent } from './assets/assets.component';
import { DownloadDataComponent } from './download-data/download-data.component';
import { EventsComponent } from './events/events.component';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    LoginComponent,
    BanksComponent,
    ChitsComponent,
    FdsComponent,
    JobDetailsComponent,
    ExpenseComponent,
    AssetsComponent,
    DownloadDataComponent,
    EventsComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
