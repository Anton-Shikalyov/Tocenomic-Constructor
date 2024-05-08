import { Injectable, EventEmitter } from '@angular/core';
import { AgentModel, AgentService } from './agent-service';
import { PoolService, PoolModelBlock } from './pool-service';
import { InitialDataService } from './initialData-service';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
    projectServicesEvent: EventEmitter<any> = new EventEmitter<any>();

    public agents: AgentModel [] = this.agentService.getArr();
    public pool: PoolModelBlock [] = this.poolService.getPoolBlock();
    public numStakingArr = 0;
    public numFarmingArr = 0;

    public stakingArr: ProjectModel [] = [];
    public farmingArr: ProjectModel [] = [];

    public stakingArrService: ServiceModel [] = [];
    public farmingArrService: ServiceModel [] = [];

    myMap = new Map<any, ServiceModel[] []>();
  
    myEvent1: EventEmitter<any> = new EventEmitter<any>();
    stakingPool: EventEmitter<any> = new EventEmitter<any>();
    constructor(private poolService: PoolService, 
                private agentService: AgentService,
                private initialDataService: InitialDataService ) {}

    decreaseStaking(item: number) {
      if (this.stakingArr.length > 1) {
        this.stakingArr.splice(item, 1);
        this.getStakingArr();
      }
      if (this.stakingArr.length == 0) {
        this.stakingArrService.length = 0;
      }
    }
  
    increaseStaking() {
      this.numStakingArr++;
      this.stakingArr.push(new ProjectModel(this.numStakingArr, 0, this.agents[0].source.id, this.agents[0].agentName, this.agents[0].source.type, 0, {}, "choose", {}, "choose", this.pool[0].poolTitle, 0, this.pool[0].poolTitle, true));
    }

    decreaseFarming(item: number) {
      if (this.farmingArr.length > 1) {
        this.farmingArr.splice(item, 1);
        this.getFarmingArr();
      }
      if (this.farmingArr.length == 0) {
        this.farmingArrService.length = 0;
      }
    }
  
    increaseFarming() {                 
      this.numFarmingArr++;
      this.farmingArr.push(new ProjectModel(this.numStakingArr, 0, this.agents[0].source.id, this.agents[0].agentName, this.agents[0].source.type, 0, {}, "choose", {}, "choose", this.pool[0].poolTitle, 0, this.pool[0].poolTitle, true));
    }


    addServiceList(key: any) { 
      const arrays = this.myMap.get(key);
      this.myMap.set(key, [[new ServiceModel(1 + <number>(arrays?.length) || 1, 1, this.initialDataService.arr[5] || 0, 1000, 1000, 'Exponential', 1, 0.9)]]);
      this.myEvent1.emit(key);
    }

    increaseServiceList(key: any) {
      const arrays = this.myMap.get(key);
      if (this.myMap.has(key)) {
        const currentValue: any = this.myMap.get(key);
        currentValue.push([new ServiceModel(1 + <number>(arrays?.length) || 1, 1, this.initialDataService.arr[5] || 0,1000, 1000, 'Exponential', 1, 0.9)]);
        this.myMap.set(key, currentValue);
      } else {
        this.myMap.set(key,[[new ServiceModel(1 + <number>(arrays?.length) || 1, 1, this.initialDataService.arr[5] || 0, 1000, 1000, 'Exponential', 1, 0.9)]]);
      }
    }

    decreaseServiceList(key: any, i: number) {
      if (this.myMap.has(key)) {
        const currentValue: any  = this.myMap.get(key);
          currentValue.splice(i, 1);
          if (currentValue == 0) {
            this.myMap.delete(key);
          }
      }
    }

    increaseStakingService() {
      this.stakingArrService.push((new ServiceModel(this.stakingArrService.length + 1,  1, this.initialDataService.arr[5] || 0, 1000, 1000, 'Exponential', 1, 0.9)));
    }

    decreaseStakingService(key: any) {
      if (this.stakingArrService.length > 1) {
        this.stakingArrService.splice(key, 1); 
      }
    }

    increaseFarmingService() {
      this.farmingArrService.push((new ServiceModel(this.farmingArrService.length + 1, 1, this.initialDataService.arr[5] || 0, 1000, 1000, 'Exponential', 1, 0.9)));
    }

    decreaseFarmingService(key: any) {
      if (this.farmingArrService.length > 1) {
        this.farmingArrService.splice(key, 1); 
      }
    }

    getMap() {
      return this.myMap;
    }

    getAgents() {
      return this.agents;
    }

    getPool() {
      return this.pool;
    }

    getStakingArr() {
        return this.stakingArr;
    }

    getFarmingArr() {
      return this.farmingArr;
    }

    getStakingService() {
      return this.stakingArrService;
    }

    getFarmingService() {
      return this.farmingArrService;
    }

}

export class ProjectModel {
  public num: number = 0;
  public source: number = 0;
  public source_optionId: number = 0;
  public source_optionValue: string = '';
  public source_optionType: string = '';
  public agentShare: number;
  public unFactor: {};
  public unFactorCondition: string = "choose";
  public precondition: {};
  public rewardCondition: string = "choose";
  public pool: string;
  public poolTitle_optionId: number;
  public poolTitle_optionValue: string;
  public flag: boolean;

  constructor(num: number,  source: number, source_optionId: number, source_optionValue: string, source_optionType: string, agentShare: number, unFactor: {}, unFactorCondition: string, 
    precondition: {}, rewardCondition: string, pool: string, poolTitle_optionId: number, poolTitle_optionValue: string, flag: boolean) {
    this.num = num;
    this.source = source,
    this.source_optionId = source_optionId,
    this.source_optionValue = source_optionValue,
    this.source_optionType = source_optionType,true
    this.agentShare = agentShare;
    this.unFactor = unFactor;
    this.unFactorCondition = unFactorCondition;
    this.precondition = precondition;
    this.rewardCondition = rewardCondition;
    this.pool = pool;
    this.poolTitle_optionId = poolTitle_optionId;
    this.poolTitle_optionValue = poolTitle_optionValue;
    this.flag = flag;
  }
}

export class ServiceModel {
  public curve: number = 1;
  public salesStart: number = 0;
  public salesEnd: number = 0
  public salesMin: number = 0;
  public salesMax: number = 0;
  public algorithm: string = 'Exponential';
  public angularCoefficient?: number;
  public risingCoefficient?: number;

  constructor(curve: number, salesStart: number, salesEnd: number ,salesMin: number, salesMax: number, algorithm: string, angularCoefficient?: number, risingCoefficient?: number) {
    this.curve = curve;
    this.salesStart = salesStart;
    this.salesEnd = salesEnd;
    this.salesMin = salesMin;
    this.salesMax = salesMax;
    this.algorithm = algorithm;
    this.angularCoefficient = angularCoefficient;
    this.risingCoefficient = risingCoefficient;
  }
}