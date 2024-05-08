import { Component } from '@angular/core';
import { ProjectModel, ServiceModel, ProjectService } from '../services/project-service-service';
import { AgentModel, AgentService } from '../services/agent-service';
import { PoolModelBlock, PoolService } from '../services/pool-service';
import { InitialDataService } from '../services/initialData-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProjectServiceComponent } from './modal-project-service/modal-project-service.component';
import { arrItem } from '../token/token.component';
import { InvestmentService } from '../services/investment-service';
import * as e from 'express';
import { JsonService } from '../services/json-service';

@Component({
  selector: 'app-project-services',
  templateUrl: './project-services.component.html',
  styleUrls: ['./project-services.component.css']
})
export class ProjectServicesComponent {
  showStaking: boolean = false;
  showFarming: boolean = false;
  showService: boolean = false;
  showCurves: boolean = false;
  showStakingService: boolean = false;
  showFarmingService: boolean = false;

  staking: boolean = false;
  farming: boolean = false;

  stakingSign: any = '+';
  farmingSign: any = '+';

  algorithmValue = 'Exponential';
  unstakingFactor = "choose";
  reward = "choose";
  algorithm: boolean = true;
  select: any;

  public value: string = '';

  public agentArr: AgentModel [] = this.agentService.getArr();
  public poolArr: PoolModelBlock [] = this.projectService.getPool();

  public stakingArr: ProjectModel [] = this.projectService.getStakingArr();
  public farmingArr: ProjectModel [] = this.projectService.getFarmingArr();

  public stakingService: ServiceModel [] = this.projectService.getStakingService();
  public farmingService: ServiceModel [] = this.projectService.getFarmingService();

  myMap = new Map<any, ServiceModel[] []>();
  public sourceArr: arrItem[] = [];

  constructor(public dialog: MatDialog,
              private projectService: ProjectService, 
              private agentService: AgentService,
              private poolService: PoolService,
              private initialDataService: InitialDataService,
              private investmentService: InvestmentService,
              private jsonService: JsonService) {}

  eventStaking(id: number) {
    if (this.projectService.stakingArr[id].flag == true) {
      this.projectService.stakingArr[id].flag = false
    }
  }
  eventFarming(id: number) {
    if (this.projectService.farmingArr[id].flag == true) {
      this.projectService.farmingArr[id].flag = false
    }
  }

  eventStakingAgent(i: number, agents: any) {
    this.projectService.stakingArr[i].source = Number(agents)
    this.projectService.stakingArr[i].source_optionId = this.sourceArr[agents].id;
    this.projectService.stakingArr[i].source_optionValue = this.sourceArr[agents].name;
    this.projectService.stakingArr[i].source_optionType = this.sourceArr[agents].type;
  }

  eventStakingPool(i: number, pools: any) {
    this.projectService.stakingArr[i].pool = this.poolArr[pools].poolTitle;
    this.projectService.stakingArr[i].poolTitle_optionValue = this.poolArr[pools].poolTitle;
    this.projectService.stakingArr[i].poolTitle_optionId = +pools;
  }

  eventFarmingAgent(i: number, agents: any) {
    this.projectService.farmingArr[i].source = Number(agents)
    this.projectService.farmingArr[i].source_optionId = this.sourceArr[agents].id;
    this.projectService.farmingArr[i].source_optionValue = this.sourceArr[agents].name;
    this.projectService.farmingArr[i].source_optionType = this.sourceArr[agents].type;
  }

  eventFarmingPool(i: number, pools: any) {
    this.projectService.farmingArr[i].pool = this.poolArr[pools].poolTitle;
    this.projectService.farmingArr[i].poolTitle_optionValue = this.poolArr[pools].poolTitle;
    this.projectService.farmingArr[i].poolTitle_optionId = +pools;
  }

  switchAlgorithm(i: number, j: number, algorithm: string) {
    const currentValue = this.myMap.get(this.select) || [];
    switch (algorithm) {
      case 'Exponential': {
        currentValue[i][j].algorithm = 'Linear';
        currentValue[i][j].angularCoefficient = undefined;
        currentValue[i][j].risingCoefficient = undefined;
        break;
      }
      case 'Linear': {
        currentValue[i][j].algorithm = 'Exponential';
        currentValue[i][j].angularCoefficient = 0;
        currentValue[i][j].risingCoefficient = 0;
        break;
      }
      default:
        break;
    }
      this.myMap.set(this.select, currentValue);
      this.projectService.myMap = this.myMap;
  }      
            
  switchStaking() {
    if (this.stakingArr.length === 0 && this.staking == false) {
      this.increaseStaking();
      this.staking = true;
      this.stakingSign = '-';
      this.showStaking = true;
      this.showStakingService = false;
      this.showFarmingService = false;
      this.showFarming = false;
      this.showService = false;
      this.showStakingService = false;
      if (this.farming) {
        this.farmingSign = 'View';
      }
    }
    else if (!this.showStaking && this.stakingSign == 'View') {
      this.showStakingService = false;
      this.showFarmingService = false;
      this.showService = false;
      this.showFarming = false;
      this.showStaking = true;
      if (this.farming) {
        this.farmingSign = 'View';
      } else {
        this.farmingSign = '+';
      }
      this.stakingSign = '-';
    }
    else if (this.stakingArr.length > 0 && this.showStaking == true) {
      const result = window.confirm('Are you sure that you want to delete the staking?');
      if (result) {
        this.stakingArr.splice(0, this.stakingArr.length);
        this.showStakingService = false;
        this.showFarmingService = false;
        this.staking = false;
        this.showService = false;
        this.showStaking = false;
        this.stakingSign = '+';
        this.projectService.stakingArrService.length = 0;
      }
    }
    this.projectService.stakingPool.emit(this.staking);
  }

  switchFarming() {
    if (this.farmingArr.length === 0 && this.farming == false) {
      this.increaseFarming();
      this.farming = true;
      this.farmingSign = '-';
      this.showFarming = true;
      this.showStaking = false;
      this.showStakingService = false;
      this.showFarmingService = false;
      this.showService = false;
      if (this.staking) {
        this.stakingSign = 'View';
      }
    }
    else if (!this.showFarming && this.farmingSign == 'View') {
      this.showStakingService = false;
      this.showFarmingService = false;
      this.showService = false;
      this.showStaking = false;
      this.showFarming = true;
      this.farmingSign = '-';
      if (this.staking) {
        this.stakingSign = 'View';
      } else {
        this.stakingSign = '+';
      }
    }
    else if (this.farmingArr.length > 0 && this.showFarming == true) {
      const result = window.confirm('Are you sure that you want to delete the farming?');
      if (result) {
        this.farmingArr.splice(0, this.farmingArr.length);
        this.showStakingService = false;
        this.showFarmingService = false;
        this.farming = false;
        this.showService = false;
        this.showFarming = false;
        this.farmingSign = '+';
        this.projectService.farmingArrService.length = 0;
      }
    }
  }

  decreaseStaking(i: number) {
    this.projectService.decreaseStaking(i);
    this.stakingArr = this.projectService.getStakingArr();
  }

  increaseStaking() {
    this.projectService.increaseStaking();
    this.stakingArr = this.projectService.getStakingArr();
  }

  decreaseFarming(i: number) {
    this.projectService.decreaseFarming(i);
    this.farmingArr = this.projectService.getFarmingArr();
  }

  increaseFarming() {
    this.projectService.increaseFarming();
    this.farmingArr = this.projectService.getFarmingArr();
  }

  eventServise(event: Event){
    this.projectService.myMap = this.myMap;
    this.myMap = this.projectService.getMap();
  }

  eventStakingServise(event: Event){
    this.projectService.myMap = this.myMap;
    this.myMap = this.projectService.getMap();
  }

  increaseServiceList() {
   this.projectService.increaseServiceList(this.select);
   this.myMap = this.projectService.getMap();
  }

  decreaseServiceList(key: any, i: number) {
    this.projectService.decreaseServiceList(this.select, i);
    this.myMap = this.projectService.getMap();
    const keysArray = Array.from(this.projectService.myMap.keys());
    this.select = keysArray[(keysArray.length-1)];
    this.projectService.projectServicesEvent.emit();
  }

  addServiceList() { 
    if (this.staking) {
      this.stakingSign = 'View'
    } else {
      this.stakingSign = '+'
    }
    if (this.farming) {
      this.farmingSign = 'View'
    } else {
      this.farmingSign = '+'
    }
    this.showStakingService = false;
    this.showFarmingService = false;
    this.showStaking = false;
    this.showFarming = false;
    this.showService = true;
    this.projectService.addServiceList(this.value);
    this.myMap = this.projectService.getMap();
    this.stakingService = this.projectService.getStakingService();
    this.select = this.value;
    this.value = '';
    this.projectService.projectServicesEvent.emit();
  }

  onSelectChange() {
    if (this.staking) {
      this.stakingSign = 'View'
    } else {
      this.stakingSign = '+'
    }
    if (this.farming) {
      this.farmingSign = 'View'
    } else {
      this.farmingSign = '+'
    }
    this.showStakingService = false;
    this.showFarmingService = false;
    this.showStaking = false;
    this.showFarming = false;
    this.showService = true;
  }

  showCurvesForStaking() {
    if (this.staking) {
      this.stakingSign = 'View'
    } else {
      this.stakingSign = '+'
    }
    if (this.farming) {
      this.farmingSign = 'View'
    } else {
      this.farmingSign = '+'
    }
    this.showService = false;
    this.showStaking = false;
    this.showFarming = false;
    this.showFarmingService = false;
    this.showStakingService = true;
    if (this.stakingService.length === 0) {
      this.projectService.increaseStakingService();
    }
    this.stakingService = this.projectService.getStakingService();
    this.projectService.projectServicesEvent.emit();
  }

  showCurvesForFarming() {
    if (this.staking) {
      this.stakingSign = 'View'
    } else {
      this.stakingSign = '+'
    }
    if (this.farming) {
      this.farmingSign = 'View'
    } else {
      this.farmingSign = '+'
    }
    this.showService = false;
    this.showStaking = false;
    this.showFarming = false;
    this.showStakingService = false;
    this.showFarmingService = true;
    if (this.farmingService.length === 0) {
      this.projectService.increaseFarmingService();
    }
    this.farmingService = this.projectService.getFarmingService();
    this.projectService.projectServicesEvent.emit();
  }

  increaseStakingService() {
    this.projectService.increaseStakingService();
    this.stakingService = this.projectService.getStakingService();
   }
 
   decreaseStakingService(key: number) {
     this.projectService.decreaseStakingService(key);
     this.stakingService = this.projectService.getStakingService();
   }

   increaseFarmingService() {
    this.projectService.increaseFarmingService();
    this.stakingService = this.projectService.getFarmingService();
   }
 
   decreaseFarmingService(key: number) {
     this.projectService.decreaseFarmingService(key);
     this.stakingService = this.projectService.getFarmingService();
   }

  switchAlgorithmStaking(i: number, algorithm: string) {
    switch (algorithm) {
      case 'Exponential': {
        this.projectService.stakingArrService[i].algorithm = 'Linear';
        this.projectService.stakingArrService[i].angularCoefficient = undefined;
        this.projectService.stakingArrService[i].risingCoefficient = undefined;
        break;
      }
      case 'Linear': {
        this.projectService.stakingArrService[i].algorithm = 'Exponential';
        this.projectService.stakingArrService[i].angularCoefficient = 0.9;
        this.projectService.stakingArrService[i].risingCoefficient = 1;
        break;
      }
      default:
        break;
    }
  }

  switchAlgorithmFarming(i: number, algorithm: string) {
    switch (algorithm) {
      case 'Exponential': {
        this.projectService.farmingArrService[i].algorithm = 'Linear';
        this.projectService.farmingArrService[i].angularCoefficient = undefined;
        this.projectService.farmingArrService[i].risingCoefficient = undefined;
        break;
      }
      case 'Linear': {
        this.projectService.farmingArrService[i].algorithm = 'Exponential';
        this.projectService.farmingArrService[i].angularCoefficient = 0.9;
        this.projectService.farmingArrService[i].risingCoefficient = 1;
        break;
      }
      default:
        break;
    }
    console.log( this.projectService.farmingArrService[i]);
  }

  openModal(id: number, data: string) {
    this.dialog.open(ModalProjectServiceComponent, {
      data: {
        id: id,
        data: data
      }
      })
      if (data == "unstaking") {
        this.projectService.stakingArr[id].unFactorCondition = "view";
      }
      if (data == "staking") {
        this.projectService.stakingArr[id].rewardCondition = "view"; 
      }
      if (data == "unfarming") {
        this.projectService.farmingArr[id].unFactorCondition = "view";
      }
      if (data == "farming") {
        this.projectService.farmingArr[id].rewardCondition = "view"; 
      }
    };

    updateDataAgents() {
      this.sourceArr.length = 0;
      this.agentService.arr.forEach((element) => {
        this.sourceArr.push(element.source);
      });
      this.investmentService.arr.forEach((element) => {
        this.sourceArr.push(element.source);
      });
    }
  

  ngOnInit() {
    this.updateDataAgents();
    this.agentService.myEvent1.subscribe((data: any) => {
      this.updateDataAgents();
    });
    this.investmentService.myEvent1.subscribe((data: any)  => {
      this.updateDataAgents();
    });

    setInterval(() => {
      if (this.jsonService.uploadedService == true) {
        this.updateDataAgents();
        this.jsonService.uploadedService = false;
      }
    }, 1000);
    this.poolService.myEvent2.subscribe((data: any) => {
      let id: number = 0;
      this.projectService.stakingArr.forEach(element => {
        id = element.poolTitle_optionId;
        element.poolTitle_optionValue = this.poolService.arrBlock[id].poolTitle;
      });
      this.projectService.farmingArr.forEach(element => {
        id = element.poolTitle_optionId;
        element.poolTitle_optionValue = this.poolService.arrBlock[id].poolTitle;
      });
    });

    this.initialDataService.updateData.subscribe((data: any) => {
      if (this.farmingArr.length > 0) {
          this.farming = true;
          this.farmingSign = '-';
          this.showFarming = true;
          this.showStaking = false;
          this.showStakingService = false;
          this.showFarmingService = false;
          this.showService = false;
          if (this.staking) {
            this.stakingSign = 'View';
          }
        }
        if (!this.showFarming && this.farmingSign == 'View') {
          this.showStakingService = false;
          this.showFarmingService = false;
          this.showService = false;
          this.showStaking = false;
          this.showFarming = true;
          this.farmingSign = '-';
          if (this.staking) {
            this.stakingSign = 'View';
          } else {
            this.stakingSign = '+';
          }
        }
      if (this.stakingArr.length > 0) {
        this.staking = true;
        this.stakingSign = '-';
        this.showStaking = true;
        this.showStakingService = false;
        this.showFarmingService = false;
        this.showFarming = false;
        this.showService = false;
        this.showStakingService = false;
        if (this.farming) {
          this.farmingSign = 'View';
        }
      }
      if (!this.showStaking && this.stakingSign == 'View') {
        this.showStakingService = false;
        this.showFarmingService = false;
        this.showService = false;
        this.showFarming = false;
        this.showStaking = true;
        if (this.farming) {
          this.farmingSign = 'View';
        } else {
          this.farmingSign = '+';
        }
        this.stakingSign = '-';
      }
      if (this.myMap.size > 0) {
        this.showCurves = true;
      }
      this.myMap = this.projectService.getMap();
      const keysArray = Array.from(this.myMap.keys());
      this.select = keysArray[keysArray.length-1];
    });
  }
  
  ngOnChange() {
    this.updateDataAgents();
    this.agentService.myEvent1.subscribe((data: any) => {
      this.updateDataAgents();
    });
    this.investmentService.myEvent1.subscribe((data: any) => {
      this.updateDataAgents();
    });
  }
}
