import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// import { MaterialModule } from '@angular/material';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';

import { MsgService } from './services/msg.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthToken } from './services/token.service';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
    ],
  declarations: [
    AppComponent,
    HomeComponent,
	LoginComponent,
	RegisterComponent,
	ResetComponent,
	AlertComponent
  ],
  providers: [
		AuthToken,
		MsgService,
        AuthService,
        UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
