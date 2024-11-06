import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { FormPageComponent } from './components/pages/form-page/form-page.component';
import { OthersComponent } from './others/others.component';
import { OtherComponent } from './other/other.component';
import { LaunderingsComponent } from './launderings/launderings.component';
import { LaunderingComponent } from './laundering/laundering.component';

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
        path: 'laundering',
        component: LaunderingsComponent,
    },
    {
        path: 'laundering/report',
        component: LaunderingComponent,
    },
];
