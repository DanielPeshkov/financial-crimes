import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { FormPageComponent } from './components/pages/form-page/form-page.component';
import { OthersComponent } from './others/others.component';
import { OtherComponent } from './other/other.component';
import { MortgagesComponent } from './mortgages/mortgages.component';
import { MortgageComponent } from './mortgage/mortgage.component';
import { LaunderingsComponent } from './launderings/launderings.component';
import { LaunderingComponent } from './laundering/laundering.component';
import { EmbezzlementsComponent } from './embezzlements/embezzlements.component';
import { EmbezzlementComponent } from './embezzlement/embezzlement.component';
import { InvestmentsComponent } from './investments/investments.component';
import { InvestmentComponent } from './investment/investment.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { InstitutionComponent } from './institution/institution.component';

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
    {
        path: 'mortgage',
        component: MortgagesComponent,
    },
    {
        path: 'mortgage/report',
        component: MortgageComponent,
    },
    {
        path: 'embezzlement',
        component: EmbezzlementsComponent,
    },
    {
        path: 'embezzlement/report',
        component: EmbezzlementComponent,
    },
    {
        path: 'investment',
        component: InvestmentsComponent,
    },
    {
        path: 'investment/report',
        component: InvestmentComponent,
    },
    {
        path: 'institution',
        component: InstitutionsComponent,
    },
    {
        path: 'institution/report',
        component: InstitutionComponent,
    },
];
