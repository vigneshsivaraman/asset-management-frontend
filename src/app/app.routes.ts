import { AuthComponent } from "./components/auth/auth";
import { AuthGuard } from "./guards/auth-guard";
import { Routes } from "@angular/router";


export const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', component: AuthComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'log-in' }
];
