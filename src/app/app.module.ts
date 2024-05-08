import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockTemplateComponent } from './block-template/block-template.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { InitialDataComponent } from './initial-data/initial-data.component';
import { InvestmentRoundsComponent } from './investment-rounds/investment-rounds.component';
import { AgentsComponent } from './agents/agents.component';
import { PoolsComponent } from './pools/pools.component';
import { VstngUnlckgComponent } from './vstng-unlckg/vstng-unlckg.component';
import { PoolService } from './services/pool-service';
import { AgentService } from './services/agent-service';
import { VstngUnlckgService } from "./services/vstng-unlckg-service";
import { ProjectServicesComponent } from './project-services/project-services.component';
import { MatSelectModule } from '@angular/material/select';
import { TokenComponent } from './token/token.component';
import { TokenService } from './services/token-service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InvestmentService } from './services/investment-service';
import { OverlayModule } from '@angular/cdk/overlay';
import { MyModalComponent } from './my-modal/my-modal.component';
import { InitialDataService } from './services/initialData-service';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from './services/json-service';
import { ModalProjectServiceComponent } from './project-services/modal-project-service/modal-project-service.component';
import {LoaderComponent} from './utils/loader/loader.component';
import {MainComponent} from './main/main.component';
import { MaterialModule } from './material.module';
import {ReportComponent} from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockTemplateComponent,
    InitialDataComponent,
    InvestmentRoundsComponent,
    AgentsComponent,
    PoolsComponent,
    VstngUnlckgComponent,
    ProjectServicesComponent,
    TokenComponent,
    MyModalComponent,
    ModalProjectServiceComponent,
    LoaderComponent,
    MainComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    ModalModule.forRoot(),
    OverlayModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [PoolService, AgentService, VstngUnlckgService, TokenService, InvestmentService, InitialDataService, JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
