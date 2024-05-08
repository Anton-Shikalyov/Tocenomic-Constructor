import { Injectable, EventEmitter } from '@angular/core';
import { arrItem } from '../token/token.component';

@Injectable({
  providedIn: 'root'
})

export class AgentService {

  myEvent1: EventEmitter<any> = new EventEmitter<any>();

  public arr: AgentModel [] = [new AgentModel( 'Agent 1', 0, 0, new arrItem(0, "Agent 1", "agent"))]; 
  private agents: string [] = [];

    constructor() {}
    decreaseAgents(i: number) {
        this.arr.splice(i, 1);
    }
  
    increaseAgents() {
      this.arr.push(new AgentModel( 'Agent ' + (this.arr.length + 1), 0, 0, new arrItem((this.arr.length), 'Agent ' + (this.arr.length + 1), "agent"))); 
    }

    getArr() {
      return this.arr;
    }

    getAgents() {
      this.agents.length = 0;
      this.arr.forEach(element => {
        this.agents.push(element.agentName);
      });
      return this.agents;
    }
}

export class AgentModel {
  public agentName: any;
  public agentShare: any;
  public tokensAmount: any;
  public source: any;

  constructor(agentName: any, agentShare: any, tokensAmount: any, source: any) {
      this.agentName = agentName;
      this.agentShare = agentShare;
      this.tokensAmount = tokensAmount;
      this.source = source;
  }
}