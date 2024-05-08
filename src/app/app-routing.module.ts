import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'report', component: ReportComponent }, // Змінив '/report' на 'report'
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }