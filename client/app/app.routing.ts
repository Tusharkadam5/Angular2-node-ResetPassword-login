import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }   from './home/home.component';

import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { AuthToken } from './services/token.service';

const appRoutes: Routes = [
    {
		path: '',
		component: HomeComponent,
		canActivate: [AuthToken]
	},
    {
		path: 'login',
		component: LoginComponent
	},
    {
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'resetpassword/:token',
		component: ResetComponent
	},
    // otherwise redirect to home
    { path: '**', redirectTo: 'register' }
];


export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
