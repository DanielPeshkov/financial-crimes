import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { FormPageComponent } from './components/pages/form-page/form-page.component';
import { OthersComponent } from './others/others.component';
import { OtherComponent } from './other/other.component';
import { MortgagesComponent } from './mortgages/mortgages.component';
import { MortgageComponent } from './mortgage/mortgage.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "form/:formtype",
        component: FormPageComponent
    }, 
    {
        path: 'other',
        component: OthersComponent,
    },
    {
        path: 'other/report',
        component: OtherComponent,
    },
    {
        path: 'mortgage',
        component: MortgagesComponent,
    },
    {
        path: 'mortgage/report',
        component: MortgageComponent,
    },
];
