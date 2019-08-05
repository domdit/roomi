import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SignupComponent} from "./signup/signup.component";
import {HeaderComponent} from "./header/header.component";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {TabsComponent} from "./tabs/tabs.component";
import {CreateGroupModalPage} from "./create-group-modal/create-group-modal.page";
import {CreateGroupModalPageModule} from "./create-group-modal/create-group-modal.module";

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        HeaderComponent,
        LoginComponent,
        HomeComponent,
        TabsComponent
    ],
  entryComponents: [],
  imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      CreateGroupModalPageModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: function tokenGetter() {
            return localStorage.getItem('token');
          }
        }
      }),

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
