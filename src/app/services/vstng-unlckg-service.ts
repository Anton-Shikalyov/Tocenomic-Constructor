import { Injectable, EventEmitter } from '@angular/core';
import { AgentModel, AgentService } from './agent-service';
import { PoolService, PoolModelBlock } from './pool-service';


@Injectable({
  providedIn: 'root'
})

export class VstngUnlckgService {
    stakingPool: EventEmitter<any> = new EventEmitter<any>();

    private agents: AgentModel [] = this.agentService.getArr();
    private pool: PoolModelBlock [] = this.poolService.getPoolBlock();

    public vestingArr: VestingModel [] = [];
    public unlockingArr: UnlockingModel [] = [];

    constructor(private poolService: PoolService, 
                private agentService: AgentService ) {}

    decreasePoolVesting(item: number) {
      if (this.vestingArr.length > 1) {
        this.vestingArr.splice(item, 1);
        this.getVestingArr();
      }
    }
  
    increasePoolVesting() {
      this.vestingArr.push(new VestingModel(this.agents[0].agentName, this.vestingArr.length, 0, this.agents[0].source.name, this.agents[0].source.type, this.pool[0].poolTitle, 0, this.pool[0].poolTitle, 0, 0, 0, 'StakedTokens'));
    }

    decreasePoolUnlocking(item: number) {
      if (this.unlockingArr.length > 1) {
        this.unlockingArr.splice(item, 1);
        this.getVestingArr();
      }
    }
  
    increasePoolUnlocking() {
      this.unlockingArr.push(new UnlockingModel(this.unlockingArr.length, 0, this.agents[0].source.name, this.agents[0].source.type, 0, 0, 0, 'StakedTokens'));
    }

    getAgents() {
      return this.agents;
    }

    getPool() {
      return this.pool;
    }

    getVestingArr() {
      return this.vestingArr;
    }

    getUnlockingArr() {
      return this.unlockingArr;
    }

}

export class VestingModel {
    public agentName: any;
    public source: number = 0;
    public source_optionId: number = 0;
    public source_optionValue: string = "";
    public source_optionType: string = "";
    public pool: any;
    public poolTitle_optionId: number;
    public poolTitle_optionValue: string;
    public startVesting: any;
    public endVesting: any;
    public vestingCoeff: any;
    public rewardSource: string = "";
  
    constructor(agentName: any, 
                source: number,
                source_optionId: number,
                source_optionValue: string,
                source_optionType: string,
                pool: any, 
                poolTitle_optionId: number, 
                poolTitle_optionValue: string, 
                startVesting: any, 
                endVesting: any, 
                vestingCoeff: any,
                rewardSource: string) {
        this.agentName = agentName;
        this.source = source;
        this.source_optionId = source_optionId;
        this.source_optionValue = source_optionValue;
        this.source_optionType = source_optionType;
        this.pool = pool;
        this.poolTitle_optionId = poolTitle_optionId;
        this.poolTitle_optionValue = poolTitle_optionValue;
        this.startVesting = startVesting;
        this.endVesting = endVesting;
        this.vestingCoeff = vestingCoeff;
        this.rewardSource = rewardSource;
    }
}

export class UnlockingModel {
  public agent_source: number = 0;
  public agent_optionId: number = 0;
  public agent_optionValue: string = "";
  public agent_optionType: string = "";
  public startUnlocking: any;
  public endUnlocking: any;
  public initialUnlocking: any;
  public destination: string = "";

  constructor(agent_source: number,
              agent_optionId: number,
              agent_optionValue: string,
              agent_optionType: string,
              startUnlocking: any, 
              endUnlocking: any, 
              initialUnlocking: any,
              destination: string) {
      this.agent_source = agent_source;
      this.agent_optionId = agent_optionId;
      this.agent_optionValue = agent_optionValue;
      this.agent_optionType = agent_optionType;
      this.startUnlocking = startUnlocking;
      this.endUnlocking = endUnlocking;
      this.initialUnlocking = initialUnlocking;
      this.destination = destination;
  }
}