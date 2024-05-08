import { Component, } from '@angular/core';
import { PoolService, PoolModel, PoolModelBlock } from '../services/pool-service';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from '../services/initialData-service';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { AgentService, AgentModel } from '../services/agent-service';
import { InvestmentService } from '../services/investment-service';
import { TokenService } from '../services/token-service';
import { ProjectService } from '../services/project-service-service';
import { arrItem } from '../token/token.component';
import { VstngUnlckgService } from '../services/vstng-unlckg-service';
import { roundUP } from '../utils/utils';
 
@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})

export class PoolsComponent {
  public arr: PoolModel [] = this.poolService.getArr();
  public poolType: string [] = [];
  public arrBlock: PoolModelBlock [] = this.poolService.getPoolBlock();
  public agents: AgentModel [] = [];
  public tokenAmount: number = 0;  
  public stakedTokens: number = 0;  
  public stakingShow = false; 
  public percent: number = 0;
  constructor (private vstngUnlcking: VstngUnlckgService, 
               private projectService: ProjectService, 
               private poolService: PoolService, 
               private agentService: AgentService, 
               private investmentService: InvestmentService, 
               public dialog: MatDialog, 
               private initialDataService: InitialDataService) {}

  updatePool(x: Event, i: number) {
    this.poolService.arrBlock[i].source.name = this.poolService.arrBlock[i].poolTitle;
    this.poolService.myEvent2.emit(2);
  }

  selectPoolType(k: number, i: number) {
    this.poolService.arrBlock[i].poolType_optionValue = this.arr[k].poolType;
    this.poolService.arrBlock[i].poolType = +k;
    this.poolService.arrBlock[i].poolType_optionId = +k;
}

  valuechange(newValue: Event) {
    this.poolService.arr = this.arr;
    let id = 0;
    this.poolService.arrBlock.forEach(element => {
      element.poolType_optionValue = this.poolService.arr[element.poolType_optionId].poolType;
    });
    this.poolService.myEvent2.emit(2);
  }

  onInputPoolShare(event: Event, i: number) {
    this.percent = 0;
    if (this.poolService.arrBlock[i].poolType_optionValue == this.poolService.arr[0].poolType) {
      this.agents = this.agentService.getArr();
      for (let i = 0; i < this.arrBlock.length; i++) {
        
        this.percent += roundUP(this.arrBlock[i].poolShare); 
      }
      for (let k = 0; k < this.agents.length; k++) {
        this.percent += roundUP(this.agents[k].agentShare); 
      }
      if (this.tokenAmount == 0) {
        window.confirm('Enter the token amount in intial data');
      }
      // if (this.percent > 100) {
      //   window.confirm('You are already over 100%');
      // } else {
        this.poolService.arrBlock[i].amount = roundUP(this.tokenAmount /100 * this.poolService.arrBlock[i].poolShare);
        this.poolService.arrBlock = this.arrBlock;
      // } 
    }
  }

  onInputPoolAmount(event: Event, i: number) {
    this.percent = 0;
    if (this.tokenAmount == 0) {
      window.confirm('Enter the token amount in intial data');
    }
    if (this.poolService.arrBlock[i].poolType_optionValue == this.poolService.arr[0].poolType) {
      for (let i = 0; i < this.arrBlock.length; i++) {
        this.percent += roundUP(this.arrBlock[i].poolShare); 
      }
      for (let k = 0; k < this.agents.length; k++) {
        this.percent += roundUP(this.agents[k].agentShare); 
      }
      let poolShare = roundUP((this.arrBlock[i].amount / this.tokenAmount) * 100);
      // if (this.percent > 100) {
      //   window.confirm('You are already over 100%');
      // } else {
        this.poolService.arrBlock[i].poolShare = poolShare;
      } 
    // }
    
  }

  increasePool() {
    this.poolService.increasePool();
    this.poolType = this.poolService.getPoolType();
  }

  decreasePool(i: number) {
    if (i != 0) {
      this.poolService.decreasePool(i); 
    }
  }  

  increasePoolBLock() {
    this.poolService.increasePoolBLock();
    this.arrBlock = this.poolService.getPoolBlock();
    this.poolService.myEvent2.emit(2);
  }

  decreasePoolBlock(i: number) {
    this.poolService.decreasePoolBlock(i);
    this.poolService.myEvent2.emit(2);
  }

  openModal() {
    this.dialog.open(MyModalComponent, {
      data: {
        contain: 'graf'
      }
    });
  }


  ngOnInit() {
    this.vstngUnlcking.stakingPool.subscribe((data: any) => {

      this.stakedTokens = 0;
      this.vstngUnlcking.unlockingArr.forEach(element => {
        if (element.destination == 'StakedTokens') {
          this.stakedTokens++;
        }
      });
      if (this.stakedTokens > 0) {
        
      }
      if (this.stakedTokens >= 1) {
        if (this.poolService.arrBlock[this.poolService.arrBlock.length-1].poolTitle != 'stakingPool') {
          this.poolService.arrBlock.push(new PoolModelBlock('stakingPool',0,0, this.poolService.arr[0].poolType, 0, 0,new arrItem(this.poolService.arrBlock.length,'stakingPool', "pool")));
        }
      }
      if (this.stakedTokens == 0) {
        if (this.poolService.arrBlock[this.poolService.arrBlock.length-1].poolTitle == 'stakingPool' && this.stakedTokens == 0 && this.stakingShow == false) {
        this.poolService.arrBlock.pop();
        }
      }
    });

    this.projectService.stakingPool.subscribe((data: any) => {
      this.stakingShow = data;
      if (this.stakingShow == true) {
        if (this.poolService.arrBlock[this.poolService.arrBlock.length-1].poolTitle != 'stakingPool') {
          this.poolService.arrBlock.push(new PoolModelBlock('stakingPool',0,0, this.poolService.arr[0].poolType, 0, 0,new arrItem(this.poolService.arrBlock.length,'stakingPool', "pool")));
        }
      }
      if (this.stakingShow  == false) {
        if (this.poolService.arrBlock[this.poolService.arrBlock.length-1].poolTitle == 'stakingPool' && this.stakedTokens == 0 && this.stakingShow == false) {
          this.poolService.arrBlock.pop();
        }
      }
    });

    this.initialDataService.myEventToken.subscribe((data: number) => {
      this.tokenAmount = this.initialDataService.arr[1];
      this.poolService.arr[0].poolType = this.initialDataService.arr[0];
      this.arrBlock.forEach(element => {
        element.amount = roundUP(this.tokenAmount / 100 * element.poolShare);
      });
    });
    this.initialDataService.updateData.subscribe((data: number) => {
      this.arr = this.poolService.getArr();
      this.arrBlock = this.poolService.getPoolBlock();
    })
  }
}
