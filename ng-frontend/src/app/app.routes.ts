import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { FormPageComponent } from './components/pages/form-page/form-page.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "form/:formtype",
        component: FormPageComponent
    }
];
