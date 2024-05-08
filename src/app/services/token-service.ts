import { Injectable } from '@angular/core';
import { PoolService, PoolModelBlock, PoolModel } from './pool-service';
import { AgentModel, AgentService } from './agent-service';
import { arrItem } from '../token/token.component';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
    constructor(private poolService: PoolService, 
                private agentService: AgentService ) {}

    public poolType: PoolModel [] = this.poolService.getPoolTypeArr();
    public agents: AgentModel [] = this.agentService.getArr();
    public pool: PoolModelBlock [] = this.poolService.getPoolBlock();
    public token: Token[] = [new Token('Action ' + 1, 0, 
                                      this.agents[0].source.id, 
                                      this.agents[0].source.name, 
                                      this.agents[0].source.type, 0, 0, 
                                      this.poolType[0].poolType, "poolType",0,0, 
                                      this.agents[0].source.id, 
                                      this.agents[0].source.name,
                                      this.agents[0].source.type, "No",{}, true)];

    decreaseToken(i: number) {
      if (this.token.length > 1) {
        this.token.splice(i, 1); 
      }
    }
  
    increaseToken() {
      this.token.push(new Token('Action ' + (this.token.length + 1), 0, 
                                        this.agents[0].source.id, 
                                        this.agents[0].source.name, 
                                        this.agents[0].source.type, 0, 0, 
                                        this.poolType[0].poolType, "poolType",0,0, 
                                        this.agents[0].source.id, 
                                        this.agents[0].source.name,
                                        this.agents[0].source.type, "No",{}, true));
    }

    getToken() {
      return this.token;
    }

    getAgents() {
      return this.agents;
    }

    getPools() {
      return this.pool;
    }
}

export class Token {
    public action: string;
    public source: number;
    public source_optionId: number;
    public source_optionValue: string;
    public source_optionType: string;
    public currencyType: number;
    public currencyType_optionId: number;
    public currencyType_optionValue: string;
    public currencyType_optionType: string;
    public valuePercentes: number;
    public destination: number;
    public destionation_optionId: number;
    public destionation_optionValue: string;
    public destionation_optionType: string;
    public preCondition: string;
    public preConditionValue: {};
    public flag: boolean = true;
  
    constructor(action: string, 
                source: number, 
                source_optionId: number, 
                source_optionValue: string, 
                source_optionType: string,
                currencyType: number, 
                currencyType_optionId: number, 
                currencyType_optionValue: string, 
                currencyType_optionType: string,
                valuePercentes: number, 
                destination: number,
                destionation_optionId: number,
                destionation_optionValue: string,
                destionation_optionType: string,
                preCondition: string, 
                preConditionValue: {},
                flag: boolean) {
      this.action = action;
      this.source = source;
      this.source_optionId = source_optionId;
      this.source_optionValue = source_optionValue; 
      this.source_optionType = source_optionType; 
      this.currencyType = currencyType;   
      this.currencyType_optionId = currencyType_optionId; 
      this.currencyType_optionValue = currencyType_optionValue;
      this.currencyType_optionType = currencyType_optionType;
      this.valuePercentes = valuePercentes,
      this.destination = destination;
      this.destionation_optionId = destionation_optionId;
      this.destionation_optionValue = destionation_optionValue;
      this.destionation_optionType = destionation_optionType;
      this.preCondition = preCondition;
      this.preConditionValue = preConditionValue;  
      this.flag = flag;
    }
  }