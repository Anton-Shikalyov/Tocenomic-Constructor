import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TokenService, Token } from '../services/token-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  PoolModel,
  PoolModelBlock,
  PoolService,
} from '../services/pool-service';
import { AgentModel, AgentService } from '../services/agent-service';
import { InitialDataService } from '../services/initialData-service';
import { ProjectService } from '../services/project-service-service';
import { InvestmentService } from '../services/investment-service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent {
  modalRef!: BsModalRef;
  @ViewChild('myTemplate', { static: false }) myTemplate1: TemplateRef<any> = {} as TemplateRef<any>;

  constructor(
    private tokenService: TokenService,
    private poolService: PoolService,
    private modalService: BsModalService,
    private agentService: AgentService,
    private projectService: ProjectService,
    private initialDataService: InitialDataService,
    private investmentService: InvestmentService
  ) {}
  public activeTimeBtn = false;
  public activeTokenBtn = false;
  public activePoolBtn = false;

  public selectTime = true;
  public selectToken = true;
  public selectPool = true;

  public activeComponentTime: number = 0;
  public activeComponentToken: number = 0;
  public activeComponentPool: number = 0;
  public arrToken: Token[] = this.tokenService.getToken();

  public poolArr1: PoolModelBlock[] = this.tokenService.getPools();
  public poolArr: any[] = this.tokenService.getPools();
  public agentsArr: AgentModel[] = this.tokenService.getAgents();
  public poolStr: PoolModel[] = this.poolService.getPoolTypeArr();

  public agentPool: arrItem[] = [];
  public sourceArr: arrItem[] = [];

  // public preConditionValue: any;
  public andor: any = 'AND';
  public timeEqSign: any;
  public timeEqSign1: any;
  public timeEqSign2: any;
  public timeInputVal: any;
  public timeInputVal1: any;
  public timeInputVal2: any;

  public tokenEqSign: any;
  public tokenEqSign1: any;
  public tokenEqSign2: any;
  public tokenInputVal: any;
  public tokenInputVal1: any;
  public tokenInputVal2: any;

  public andorPool: any = 'AND';
  public poolEqSign: any;
  public poolInputVal: any;
  public poolEqSign1: any;
  public poolInputVal1: any;
  public poolEqSign2: any;
  public poolInputVal2: any;
  public poolId: any;
  public poolId1: any;
  selectedItem: any;

  eventToken(id: number) {
    if (this.tokenService.token[id].flag == true) {
      this.tokenService.token[id].flag = false
    }
  }

  onSelectSource(i: number, id: number) {
    this.tokenService.token[i].source = Number(id);
    this.tokenService.token[i].source_optionId = this.sourceArr[id].id;
    this.tokenService.token[i].source_optionValue = this.sourceArr[id].name;
    this.tokenService.token[i].source_optionType = this.sourceArr[id].type;
  }

  onSelectDestination(i: number, id: number) {
    this.tokenService.token[i].destination = Number(id);
    this.tokenService.token[i].destionation_optionId = this.agentPool[id].id;
    this.tokenService.token[i].destionation_optionValue = this.agentPool[id].name;
    this.tokenService.token[i].destionation_optionType = this.agentPool[id].type;
  }

  switchTime(i: number) {
    if (this.activeTimeBtn == true) {
      this.activeTimeBtn = false;
      this.selectTime = true;
      this.activeComponentTime = 4;
      this.timeEqSign = 0;
      this.timeEqSign1 = 0;
      this.timeEqSign2 = 0;
      this.timeInputVal = 0;
      this.timeInputVal1 = 0;
      this.timeInputVal2 = 0;
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        time: null,
      };
    } else {
      this.activeTimeBtn = true;
      this.selectTime = false;
    }
  }

  setTimeComponent(x: number, i: number, plus?: any) {
    const preconds: {
      time: any;
    } = {
      time: {},
    };
    if (this.activeComponentTime == x && plus != '+') {
      this.activeComponentTime = 4;
      this.timeEqSign = 0;
      this.timeEqSign1 = 0;
      this.timeEqSign2 = 0;
      this.timeInputVal = 0;
      this.timeInputVal1 = 0;
      this.timeInputVal2 = 0;
      this.tokenService.token[i].preCondition = 'No';
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        time: null,
      };
    } else {
      this.activeComponentTime = x;

      if (this.activeComponentTime == 1) {
        preconds.time = {
          monthly: true,
        };
      }
      if (this.activeComponentTime == 2) {
        preconds.time = {
          monthEasier: {
            eqSign: this.timeEqSign,
            inputVal: this.timeInputVal,
          },
        };
      }
      if (this.activeComponentTime == 3) {
        preconds.time = {
          monthHarder: {
            eqSign1: this.timeEqSign1,
            inputVal1: this.timeInputVal1,
            eqSign2: this.timeEqSign2,
            inputVal2: this.timeInputVal2,
          },
        };
      }
      this.tokenService.token[i].preCondition = 'Yes';
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        time: preconds.time,
      };
    }
    this.checkOnProperties(i);
  }

  switchTokenComponent(i: number) {
    if (this.activeTokenBtn == true) {
      this.activeTokenBtn = false;
      this.selectToken = true;
      this.activeComponentToken = 4;
      this.andor = 'AND';
      this.tokenEqSign = 0;
      this.tokenEqSign1 = 0;
      this.tokenEqSign2 = 0;
      this.tokenInputVal = 0;
      this.tokenInputVal1 = 0;
      this.tokenInputVal2 = 0;
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        tokenPrice: null,
      };
    } else {
      this.activeTokenBtn = true;
      this.selectToken = false;
    }
  }

  setTokenComponent(x: number, i: number, plus?: any) {
    const preconds: {
      tokenPrice: any;
    } = {
      tokenPrice: {},
    };
    if (this.activeComponentToken == x && plus != '+') {
      this.activeComponentToken = 4;
      this.andor = 'AND';
      this.tokenEqSign = 0;
      this.tokenEqSign1 = 0;
      this.tokenEqSign2 = 0;
      this.tokenInputVal = 0;
      this.tokenInputVal1 = 0;
      this.tokenInputVal2 = 0;
      this.tokenService.token[i].preCondition = 'No';
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        tokenPrice: null,
      };

    } else {
      if (x == 0) {
        preconds.tokenPrice.andor = this.andor;
      } else {
        this.activeComponentToken = x;
      }

      if (this.activeComponentToken == 1) {
        preconds.tokenPrice = {
          andor: this.andor,
          tokenPriceEasier: {
            eqSign: this.tokenEqSign,
            inputVal: this.tokenInputVal,
          },
        };
      }
      if (this.activeComponentToken == 2) {
        preconds.tokenPrice = {
          andor: this.andor,
          tokenPriceHarder: {
            eqSign1: this.tokenEqSign1,
            inputVal1: this.tokenInputVal1,
            eqSign2: this.tokenEqSign2,
            inputVal2: this.tokenInputVal2,
          },
        };
      }
      this.tokenService.token[i].preCondition = 'Yes';
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        tokenPrice: preconds.tokenPrice,
      };
    }
    this.checkOnProperties(i);
  }

  switchPoolComponent(i: number) {
    if (this.activePoolBtn == true) {
      this.activePoolBtn = false;
      this.selectPool = true;
      this.activeComponentPool = 4;
      this.andorPool = 'AND';
      this.poolEqSign = 0;
      this.poolInputVal = 0;
      this.poolEqSign1 = 0;
      this.poolInputVal1 = 0;
      this.poolEqSign2 = 0;
      this.poolInputVal2 = 0;
      this.poolId = 0;
      this.poolId1 = 0;
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        poolThreshold: null,
      };
    } else {
      this.activePoolBtn = true;
      this.selectPool = false;
    }
  }

  setPoolComponent(x: number, i: number, plus?: any) {
    const preconds: {
      poolThreshold: any;
    } = {
      poolThreshold: {},
    };
    if (this.activeComponentPool == x && plus != '+') {
      this.activeComponentPool = 4;
      this.andorPool = 'AND';
      this.poolEqSign = 0;
      this.poolInputVal = 0;
      this.poolEqSign1 = 0;
      this.poolInputVal1 = 0;
      this.poolEqSign2 = 0;
      this.poolInputVal2 = 0;
      this.poolId = 0;
      this.poolId1 = 0;
      this.tokenService.token[i].preCondition = 'No';
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        poolThreshold: null,
      };
    } else {
      if (x == 0) {
        preconds.poolThreshold.andor = this.andorPool;
      } else {
        this.activeComponentPool = x;
      }

      if (this.activeComponentPool == 1) {
        preconds.poolThreshold = {
          andor: this.andorPool,
          poolThresholdEasier: {
            eqSign: this.poolEqSign,
            inputVal: this.poolInputVal,
            poolId: this.poolId,
          },
        };
      }
      if (this.activeComponentPool == 2) {
        preconds.poolThreshold = {
          andor: this.andorPool,
          poolThresholdHarder: {
            eqSign1: this.poolEqSign1,
            inputVal1: this.poolInputVal1,
            eqSign2: this.poolEqSign2,
            inputVal2: this.poolInputVal2,
            poolId: this.poolId1,
          },
        };
      }
      this.tokenService.token[i].preCondition = 'Yes';
      this.tokenService.token[i].preConditionValue = {
        ...this.tokenService.token[i].preConditionValue,
        poolThreshold: preconds.poolThreshold,
      };
    }
    this.checkOnProperties(i);
  }

  decreaseToken(i: number) {
    this.tokenService.decreaseToken(i);
  }

  increaseToken() {
    this.tokenService.increaseToken();
  }

  openModal(template: TemplateRef<any>, i: number) {
    if (this.tokenService.token[i].preCondition == 'Yes' || this.tokenService.token[i].preCondition == 'Show') {
      this.activeTimeBtn = false;
      this.activeTokenBtn = false;
      this.activePoolBtn = false;
      this.selectTime = true;
      this.selectToken = true;
      this.selectPool = true;
      this.activeComponentTime = 4;
      this.activeComponentToken = 4;
      this.activeComponentPool = 4;

      this.andor = 'AND';
      this.andorPool = 'AND';

      this.timeEqSign = 'X';
      this.timeEqSign1 = 'X';
      this.timeEqSign2 = 'X';
      this.timeInputVal = 'X';
      this.timeInputVal1 = 'X';
      this.timeInputVal2 = 'X';

      this.tokenEqSign = 'X';
      this.tokenEqSign1 = 'X';
      this.tokenEqSign2 = 'X';
      this.tokenInputVal = 'X';
      this.tokenInputVal1 = 'X';
      this.tokenInputVal2 = 'X';

      this.poolEqSign = 'X';
      this.poolInputVal = 'X';
      this.poolEqSign1 = 'X';
      this.poolInputVal1 = 'X';
      this.poolEqSign2 = 'X';
      this.poolInputVal2 = 'X';
      this.poolId = this.poolService.arrBlock[0].poolTitle;
      this.poolId1 = this.poolService.arrBlock[0].poolTitle;
      let x: {
        value: any;
      } = {
        value: 0,
      };
      x.value = { ...this.tokenService.token[i].preConditionValue };

      if (x.value.hasOwnProperty('time')) {
        if (x.value.time != null) {
          this.activeTimeBtn = true;
          this.selectTime = false;
          if (x.value.time.hasOwnProperty('monthly')) {
            this.activeComponentTime = 1;
          }
          if (x.value.time.hasOwnProperty('monthEasier')) {
            this.activeComponentTime = 2;
            this.timeEqSign = x.value.time.monthEasier.eqSign;
            this.timeInputVal = x.value.time.monthEasier.inputVal;
          }
          if (x.value.time.hasOwnProperty('monthHarder')) {
            this.activeComponentTime = 3;
            this.timeEqSign1 = x.value.time.monthHarder.eqSign1;
            this.timeInputVal1 = x.value.time.monthHarder.inputVal1;
            this.timeEqSign2 = x.value.time.monthHarder.eqSign2;
            this.timeInputVal2 = x.value.time.monthHarder.inputVal2;
          }
        }
      }
      if (this.activeComponentTime == 4) {
        this.activeTimeBtn = false;
        this.selectTime = true;
      }

      if (x.value.hasOwnProperty('tokenPrice')) {
        if (x.value.tokenPrice != null) {
          this.activeTokenBtn = true;
          this.selectToken = false;
          if (x.value.tokenPrice.hasOwnProperty('andor')) {
            this.andor = x.value.tokenPrice.andor;
          }
          if (x.value.tokenPrice.hasOwnProperty('tokenPriceEasier')) {
            this.activeComponentToken = 1;
            this.tokenEqSign = x.value.tokenPrice.tokenPriceEasier.eqSign;
            this.tokenInputVal = x.value.tokenPrice.tokenPriceEasier.inputVal;
          }
          if (x.value.tokenPrice.hasOwnProperty('tokenPriceHarder')) {
            this.activeComponentToken = 2;
            this.tokenEqSign1 = x.value.tokenPrice.tokenPriceHarder.eqSign1;
            this.tokenInputVal1 = x.value.tokenPrice.tokenPriceHarder.inputVal1;
            this.tokenEqSign2 = x.value.tokenPrice.tokenPriceHarder.eqSign2;
            this.tokenInputVal2 = x.value.tokenPrice.tokenPriceHarder.inputVal2;
          }
        }
      }
      if (this.activeComponentToken == 4) {
        this.activeTokenBtn = false;
        this.selectToken = true;
      }

      if (x.value.hasOwnProperty('poolThreshold')) {
        if (x.value.poolThreshold != null) {
          this.activePoolBtn = true;
          this.selectPool = false;
          if (x.value.poolThreshold.hasOwnProperty('andor')) {
            this.andorPool = x.value.poolThreshold.andor;
          }
          if (x.value.poolThreshold.hasOwnProperty('poolThresholdEasier')) {
            this.activePoolBtn = true;

            this.activeComponentPool = 1;
            this.poolEqSign = x.value.poolThreshold.poolThresholdEasier.eqSign;
            this.poolInputVal =
              x.value.poolThreshold.poolThresholdEasier.inputVal;
          }
          if (x.value.poolThreshold.hasOwnProperty('poolThresholdHarder')) {
            this.activePoolBtn = true;

            this.activeComponentToken = 2;
            this.poolEqSign1 = x.value.poolThreshold.poolThresholdHarder.eqSign1;
            this.poolInputVal1 =
              x.value.poolThreshold.poolThresholdHarder.inputVal1;
            this.poolEqSign2 = x.value.poolThreshold.poolThresholdHarder.eqSign2;
            this.poolInputVal2 =
              x.value.poolThreshold.poolThresholdHarder.inputVal2;
          }
        }
      }
      if (this.activeComponentPool == 4) {
        this.activePoolBtn = false;
        this.selectPool = true;
      }

      this.modalRef = this.modalService.show(template);
    }
    else if (this.tokenService.token[i].preCondition == 'No') {
      this.tokenService.token[i].preConditionValue = 0;
    }
  }

  checkOnProperties(activeId: number) {
    let item: {
      value: any;
    } = {
      value: 0,
    };
    item.value = { ...this.tokenService.token[activeId].preConditionValue };

    if (item.value.hasOwnProperty('time')) {
      if (item.value.time != null) {
        this.selectTime = false;
        this.activeTimeBtn = true;
        if (item.value.time.hasOwnProperty('monthly')) {
          this.activeComponentTime = 1;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
        if (item.value.time.hasOwnProperty('monthEasier')) {
          this.activeComponentTime = 2;
          this.timeEqSign = item.value.time.monthEasier.eqSign;
          this.timeInputVal = item.value.time.monthEasier.inputVal;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
        if (item.value.time.hasOwnProperty('poolThreshold')) {
          this.activeComponentTime = 3;
          this.timeEqSign1 = item.value.time.poolThreshold.eqSign1;
          this.timeInputVal1 = item.value.time.poolThreshold.nputVal1;
          this.timeEqSign2 = item.value.time.poolThreshold.eqSign2;
          this.timeInputVal2 = item.value.time.poolThreshold.inputVal2;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
      }
    }

    if (item.value.hasOwnProperty('tokenPrice')) {
      if (item.value.tokenPrice != null) {
        this.selectToken = false;
        this.activeTokenBtn = true;
        if (item.value.tokenPrice.hasOwnProperty('andor')) {
          this.andor = item.value.tokenPrice.andor;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
        if (item.value.tokenPrice.hasOwnProperty('tokenPriceEasier')) {
          this.activeComponentToken = 1;
          this.tokenEqSign = item.value.tokenPrice.tokenPriceEasier.eqSign;
          this.tokenInputVal = item.value.tokenPrice.tokenPriceEasier.inputVal;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
        if (item.value.tokenPrice.hasOwnProperty('tokenPriceHarder')) {
          this.activeComponentToken = 2;
          this.tokenEqSign1 = item.value.tokenPrice.tokenPriceHarder.eqSign1;
          this.tokenInputVal1 = item.value.tokenPrice.tokenPriceHarder.inputVal1;
          this.tokenEqSign2 = item.value.tokenPrice.tokenPriceHarder.eqSign2;
          this.tokenInputVal2 = item.value.tokenPrice.tokenPriceHarder.inputVal2;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
      }
    }

    if (item.value.hasOwnProperty('poolThreshold')) {
      if (item.value.poolThreshold != null) {
        this.selectPool = false;
        this.activePoolBtn = true;
        if (item.value.poolThreshold.hasOwnProperty('andor')) {
          this.andorPool = item.value.poolThreshold.andor;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
        if (item.value.poolThreshold.hasOwnProperty('poolThresholdEasier')) {
          this.activeComponentPool = 1;
          this.poolEqSign = item.value.poolThreshold.poolThresholdEasier.eqSign;
          this.poolInputVal =
            item.value.poolThreshold.poolThresholdEasier.inputVal;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
        if (item.value.poolThreshold.hasOwnProperty('poolThresholdHarder')) {
          this.activeComponentToken = 2;
          this.poolEqSign1 = item.value.poolThreshold.poolThresholdHarder.eqSign1;
          this.poolInputVal1 =
            item.value.poolThreshold.poolThresholdHarder.inputVal1;
          this.poolEqSign2 = item.value.poolThreshold.poolThresholdHarder.eqSign2;
          this.poolInputVal2 =
            item.value.poolThreshold.poolThresholdHarder.inputVal2;
          this.tokenService.token[activeId].preCondition = 'Yes';
        }
      }
    }
  }

  closeModal(event: Event) {
    const externalElement = document.getElementById('m');
    if (event.target === externalElement) {
      this.modalRef.hide();
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  modalCl(i: number, flag: boolean) {
    if (flag) {
      this.modalRef.hide();
    }
    if (this.tokenService.token[i].preConditionValue != 0) {
      this.tokenService.token[i].preCondition = "Yes";
    }
  }

  updateDataSource() {
    this.sourceArr.length = 0;
    this.agentService.arr.forEach((element) => {
      this.sourceArr.push(element.source);
    });
    this.poolService.arrBlock.forEach((element) => {
      this.sourceArr.push(element.source);
    });
    this.investmentService.arr.forEach(element => {
      this.sourceArr.push(element.source);
    });
    if (this.projectService.stakingArrService[0]) {
      this.sourceArr.push(new arrItem(0, "Staking income", "stakingServise"));
    }
    if (this.projectService.farmingArrService[0]) {
      this.sourceArr.push(new arrItem(0, "Farming income", "farmingServise"));
    }
    let keysArray = Array.from(this.projectService.myMap.keys());
    keysArray.forEach((element, index) => {
      this.sourceArr.push(new arrItem(index, element + " income", "serviceIncome"));
    });
  }

  updateDataDestination() {
    this.agentPool.length = 0;
    this.agentService.arr.forEach((element) => {
      this.agentPool.push(element.source);
    });
    this.poolService.arrBlock.forEach((element) => {
      this.agentPool.push(element.source);
    });
    this.investmentService.arr.forEach(element => {
      this.agentPool.push(element.source);
    });
  }

  ngOnInit() {
    this.updateDataSource();
    this.updateDataDestination();
    this.agentService.myEvent1.subscribe((data: any) => {
      this.updateDataSource();
      this.updateDataDestination();
    });
    this.poolService.myEvent2.subscribe((data: any) => {
      this.updateDataSource();
      this.updateDataDestination();
    });
    this.initialDataService.updateData.subscribe((data: any) => {
      this.updateDataSource();
      this.updateDataDestination();
    });
    this.investmentService.myEvent1.subscribe(() => {
      this.updateDataSource();
      this.updateDataDestination();

    });
    this.projectService.projectServicesEvent.subscribe(() => {
      this.updateDataSource();
      this.updateDataDestination();
    })
  }

  ngOnChange() {
    this.agentService.myEvent1.subscribe((data: any) => {
      this.updateDataSource();
      this.updateDataDestination();
    });
    this.poolService.myEvent2.subscribe((data: any) => {
      this.updateDataSource();
      this.updateDataDestination();
    });
    this.initialDataService.updateData.subscribe((data: any) => {
      this.updateDataSource();
      this.updateDataDestination();

    });
    this.projectService.projectServicesEvent.subscribe(() => {
      this.updateDataSource();
    })
  }
}

export class arrItem {
  public id: number = 0;
  public name: string = '';
  public type: string = '';

  constructor(id: number, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
