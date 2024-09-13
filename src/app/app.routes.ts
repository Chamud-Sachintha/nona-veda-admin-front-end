import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },

    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import("./modules/auth-module/auth-module.module").then(m => m.AuthModuleModule)
            }
        ]
    },

    {
        path: 'app',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import("./modules/dashboard-module/dashboard-module.module").then(m => m.DashboardModuleModule)
            }
        ]
    },
];
