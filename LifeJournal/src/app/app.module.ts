import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from '../material.module';
import { AgChartsAngularModule } from 'ag-charts-angular';


import { PaymentsComponent } from './payments/payments.component';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalEntryComponent } from './goal-entry/goal-entry.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { TimeSpanPickerComponent } from './Utils/time-span-picker/time-span-picker.component';
import { CurrencyExchangeComponent } from './currency-exchange/currency-exchange.component';



const routes: Routes = [
  { path: 'app-payments', component: PaymentsComponent },
  { path: 'app-wishlists', component: WishlistsComponent },
  { path: 'app-goals', component: GoalsComponent },
  { path: 'app-currency-exchange', component: CurrencyExchangeComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    WishlistsComponent,
    GoalsComponent,
    GoalEntryComponent,
    GoalDetailsComponent,
    TimeSpanPickerComponent,
    CurrencyExchangeComponent

  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    AgChartsAngularModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
