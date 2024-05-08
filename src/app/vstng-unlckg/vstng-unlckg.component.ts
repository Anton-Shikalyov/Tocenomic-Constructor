import { Component } from '@angular/core';
import { VstngUnlckgService, VestingModel, UnlockingModel } from '../services/vstng-unlckg-service';
import { PoolModelBlock, PoolService } from '../services/pool-service';
import { AgentModel, AgentService } from '../services/agent-service';
import { InitialDataService } from '../services/initialData-service';
import { arrItem } from '../token/token.component';
import { InvestmentService } from '../services/investment-service';
import { JsonService } from '../services/json-service';

@Component({
  selector: 'app-vstng-unlckg',
  templateUrl: './vstng-unlckg.component.html',
  styleUrls: ['./vstng-unlckg.component.css']
})
export class VstngUnlckgComponent {
  public showVesting: boolean = false;
  public showUnlocking: boolean = false;

  public vesting: boolean = false;
  public unlocking: boolean = false;

  public vestingSign: any = '+';
  public unlockingSign: any = '+';
  public buff: any;

  public agentArr: AgentModel [] = this.vstUnlckService.getAgents();
  public poolArr: PoolModelBlock [] =  this.vstUnlckService.getPool();

  public unlockingArr: UnlockingModel [] = this.vstUnlckService.getUnlockingArr();
  public vestingArr: VestingModel[] = this.vstUnlckService.getVestingArr();

  public sourceArr: arrItem[] = [];
  public sourceArrUnfarming: arrItem[] = [];

  constructor(private vstUnlckService: VstngUnlckgService,
              public agentService: AgentService,
              private poolService: PoolService,
              private initialDataService: InitialDataService, 
              private investmentService: InvestmentService,
              private jsonService: JsonService) {}

  switchVesting() {
    if (this.vestingArr.length === 0 && this.vesting == false) {
      this.increaseVesting();
      this.vesting = true;
      this.vestingSign = '-';
      this.showVesting = true;
      this.showUnlocking = false;
      if (this.unlocking) {
        this.unlockingSign = 'View';
      } else {
        this.unlockingSign = '+';
      }
    }
    else if (!this.showVesting && this.vestingSign == 'View') {
      this.showUnlocking = false;
      this.showVesting = true;
      this.vestingSign = '-';
      if (this.unlocking) {
        this.unlockingSign = 'View';
      } else {
        this.unlockingSign = '+';
      }
    }
    else if (this.vestingArr.length > 0 && this.showVesting == true) {
      const result = window.confirm('Are you sure that you want to delete the vesting?');
      if (result) {
        this.vestingArr.splice(0, this.vestingArr.length);
        this.vesting = false;
        this.showVesting = false;
        this.vestingSign = '+';
      }
    }
  }

  switchUnlocking() {
    if (this.unlockingArr.length === 0 && this.unlocking == false) {
      this.increasePoolUnlocking();
      this.unlocking = true;
      this.unlockingSign = '-';
      this.showUnlocking = true;
      this.showVesting = false;
      if (this.vesting) {
        this.vestingSign = 'View';
      } else {
        this.vestingSign = '+';
      }
    }
    else if (!this.showUnlocking && this.unlockingSign == 'View') {
      this.showVesting = false;
      this.showUnlocking = true;
      this.unlockingSign = '-';
      if (this.vesting) {
        this.vestingSign = 'View';
      } else {
        this.vestingSign = '+';
      }
    }
    else if (this.unlockingArr.length > 0 && this.showUnlocking == true) {
      const result = window.confirm('Are you sure that you want to delete the unlocking?');
      if (result) {
        this.unlockingArr.splice(0, this.unlockingArr.length);
        this.unlocking = false;
        this.showUnlocking = false;
        this.unlockingSign = '+';
      }
    }
  }

  eventVestingAgent(i: number, source: number) {
    this.vstUnlckService.vestingArr[i].source = Number(source);
    this.vstUnlckService.vestingArr[i].source_optionId = this.sourceArr[source].id;
    this.vstUnlckService.vestingArr[i].source_optionValue = this.sourceArr[source].name;
    this.vstUnlckService.vestingArr[i].source_optionType = this.sourceArr[source].type;
  }

  eventUnlockingAgent(i: number, source: number) {
    this.vstUnlckService.unlockingArr[i].agent_source =  Number(source);
    this.vstUnlckService.unlockingArr[i].agent_optionId = this.sourceArrUnfarming[source].id;
    this.vstUnlckService.unlockingArr[i].agent_optionValue = this.sourceArrUnfarming[source].name;
    this.vstUnlckService.unlockingArr[i].agent_optionType = this.sourceArrUnfarming[source].type;
  }

  eventVestingPool(i: number, pools: any) {
    this.vstUnlckService.vestingArr[i].pool = +pools;
    this.vstUnlckService.vestingArr[i].poolTitle_optionValue = this.poolArr[pools].poolTitle;
    this.vstUnlckService.vestingArr[i].poolTitle_optionId = +pools;
  }
  
  eventServiseVesting(event: Event,){
    this.vstUnlckService.vestingArr = this.vestingArr;
    this.vestingArr = this.vstUnlckService.getVestingArr();
  }

  eventServiseUnlocking(event: Event){
    this.vstUnlckService.unlockingArr = this.unlockingArr;
    this.unlockingArr = this.vstUnlckService.getUnlockingArr();
  }

  stakingPoolEvent(x: any) {
    this.vstUnlckService.stakingPool.emit();
  }

  decreaseVesting(i: number) {
    this.vstUnlckService.decreasePoolVesting(i);
    this.vestingArr = this.vstUnlckService.getVestingArr();
  }

  increaseVesting() {
    this.vstUnlckService.increasePoolVesting();
    this.vestingArr = this.vstUnlckService.getVestingArr();
  }


  decreasePoolUnlocking(i: number) {
    this.vstUnlckService.decreasePoolUnlocking(i);
    this.unlockingArr = this.vstUnlckService.getUnlockingArr();
  }

  increasePoolUnlocking() {
    this.vstUnlckService.increasePoolUnlocking();
    this.unlockingArr = this.vstUnlckService.getUnlockingArr();
  }

  updateDataDestination() {
    this.sourceArr.length = 0;
    this.agentService.arr.forEach((element) => {
      this.sourceArr.push(element.source);
    });
    this.investmentService.arr.forEach((element) => {
      this.sourceArr.push(element.source);
    });
  }

  updateDataUnfarming() {
    this.sourceArrUnfarming.length = 0;
    this.agentService.arr.forEach((element) => {
      this.sourceArrUnfarming.push(element.source);
    });
    this.poolService.arrBlock.forEach((element) => {
      this.sourceArrUnfarming.push(element.source);
    });
    this.investmentService.arr.forEach((element) => {
      this.sourceArrUnfarming.push(element.source);
    });
  }

  ngOnInit() {
    this.updateDataDestination();
    this.updateDataUnfarming();

    this.agentService.myEvent1.subscribe((data: any) => {
      this.updateDataDestination();
      this.updateDataUnfarming();
    });
    this.investmentService.myEvent1.subscribe((data: any)  => {
      this.updateDataDestination();
      this.updateDataUnfarming();
    });
    setInterval(() => {
      if (this.jsonService.uploadedUnVes == true) {
        this.updateDataDestination();
        this.updateDataUnfarming();
        this.jsonService.uploadedUnVes = false;
      }
    }, 1000);
    this.poolService.myEvent2.subscribe((data: any) => {
      let id: number = 0;
      this.vstUnlckService.vestingArr.forEach(element => {
        id = element.poolTitle_optionId;
        element.poolTitle_optionValue = this.poolService.arrBlock[id].poolTitle;
      });
      this.updateDataUnfarming();
    });
    
    this.initialDataService.updateData.subscribe((data: any) => {
      if (this.unlockingArr.length != 0) {
        this.switchUnlocking();
      }
      if (this.unlockingArr.length < 0) {
        this.switchVesting();
      }
    })
  }
  ngAfterViewInit() {
    this.initialDataService.updateData.subscribe((data: any) => {
      if (this.vestingArr.length > 0) {
        this.vesting = true;
        this.vestingSign = '-';
        this.showVesting = true;
        this.showUnlocking = false;
        if (this.unlocking) {
          this.unlockingSign = 'View';
        } else {
          this.unlockingSign = '+';
        }   
      }
        if (!this.showVesting && this.vestingSign == 'View') {
          this.showUnlocking = false;
          this.showVesting = true;
          this.vestingSign = '-';
          if (this.unlocking) {
            this.unlockingSign = 'View';
          } else {
            this.unlockingSign = '+';
          }
        }
      if (this.unlockingArr.length > 0) {
        this.unlocking = true;
        this.unlockingSign = '-';
        this.showUnlocking = true;
        this.showVesting = false;
        if (this.vesting) {
          this.vestingSign = 'View';
        } else {
          this.vestingSign = '+';
        }
      }
        if (!this.showUnlocking && this.unlockingSign == 'View') {
          this.showVesting = false;
          this.showUnlocking = true;
          this.unlockingSign = '-';
          if (this.vesting) {
            this.vestingSign = 'View';
          } else {
            this.vestingSign = '+';
          }
      }
    })
  }
}
