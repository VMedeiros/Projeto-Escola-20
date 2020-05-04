import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PrimeNgModule } from './view/shared/components/PrimeNg.module';
import { SharedComumModule } from './view/shared/sharedComum.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedComumModule,
        /* ---INTERFACE--- */
        PrimeNgModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
