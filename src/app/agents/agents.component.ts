import { Component } from '@angular/core';
import { AgentService, AgentModel } from '../services/agent-service'
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { InitialDataService } from '../services/initialData-service';
import { PoolService, PoolModelBlock } from '../services/pool-service';
import { InvestmentService } from '../services/investment-service';
import { roundUP } from '../utils/utils';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent {
  constructor(private initialDataService: InitialDataService,
    private investmentService: InvestmentService,
    private agentService: AgentService,
    private poolServise: PoolService,
    public dialog: MatDialog) { }

  public tokenAmount: number = 0;
  public roundsNumberValue: number = 1;
  public arr: AgentModel[] = this.agentService.getArr();
  public poolArr: PoolModelBlock[] = this.poolServise.getPoolBlock();
  public labels: string[] = [];
  public dataLabels: number[] = [];
  public background: string[] = [];
  rgb = 255;

  pushFunc(x: Event) {
    if (this.roundsNumberValue > this.arr.length) {
      for (let i = this.arr.length; i < this.roundsNumberValue; i++) {
        this.agentService.increaseAgents();
      }
    }

    if (this.arr.length > this.roundsNumberValue && this.roundsNumberValue != 0) {
      for (let i = this.arr.length; i > this.roundsNumberValue; i--) {
        this.agentService.arr.pop();
      }
    }
    this.agentService.myEvent1.emit(1);
    this.roundsNumberValue = this.arr.length;
  }


  updateAgent(x: Event, i: number) {
    this.agentService.arr[i].source.name = this.agentService.arr[i].agentName;
    this.agentService.myEvent1.emit(1);
  }

  onInputAgentShare(event: Event, i: number) {
    let percent: number = 0;
    this.poolArr = this.poolServise.getPoolBlock();
    for (let i = 0; i < this.arr.length; i++) {
      percent += roundUP(this.arr[i].agentShare);
      for (let k = 0; k < this.poolArr.length; k++) {
        percent += roundUP(this.poolArr[k].poolShare);
      }
    }
    // if (this.tokenAmount == 0) {
    //   window.confirm('Enter the token amount in intial data');
    // }
    // if (percent > 100 || this.arr[i].agentShare > 100) {
    // this.openModalError();
    // window.confirm('You already have: ' + percent);
    // } else {
    this.arr[i].tokensAmount = roundUP(this.tokenAmount / 100 * this.arr[i].agentShare);
    this.agentService.arr = this.arr;
    // }
  }

  onInputTokenAmount(event: Event, i: number) {
    if (this.tokenAmount == 0) {
      window.confirm('Enter the token amount in intial data');
    }

    let percent: number = 0;
    for (let i = 0; i < this.arr.length; i++) {
      percent += roundUP(this.arr[i].agentShare);
    }
    let agentShare = roundUP((this.arr[i].tokensAmount / this.tokenAmount) * 100);
    // if ((percent + agentShare) > 100) {
    //   window.confirm('You already have: ' + percent + agentShare);
    // } else {
    this.agentService.arr[i].agentShare = agentShare;
    // }
  }

  decreaseAgents(i: number) {
    this.agentService.decreaseAgents(i);
    this.agentService.myEvent1.emit(1);
    this.roundsNumberValue = this.arr.length;
  }

  increaseAgents() {
    this.agentService.increaseAgents();
    this.agentService.myEvent1.emit(1);
    this.roundsNumberValue = this.arr.length;
  }

  ngOnInit() {
    this.agentService.myEvent1.subscribe((data: any, contain: string) => {
      this.roundsNumberValue = data;
    });
    this.initialDataService.updateData.subscribe(() => {
      this.roundsNumberValue = this.arr.length;
    });
    this.initialDataService.myEventToken.subscribe((data: number) => {
      this.tokenAmount = this.initialDataService.arr[1];
      this.agentService.arr.forEach(element => {
        element.tokensAmount = roundUP(this.tokenAmount / 100 * element.agentShare);
      });
    })
  }

  ngAfterContentInit() {
    this.arr = this.agentService.getArr();
  }

  openModal() {
    // this.rgb = 255;
    // this.labels.length = 0;
    // this.dataLabels.length = 0;
    // this.background.length = 0;
    // let allPercentes = 100;

    // this.arr.forEach(element => {
    //   this.rgb -= 25;
    //   this.labels.push(element.agentName);
    //   this.dataLabels.push(element.agentShare);
    //   this.background.push("rgba(" + (this.rgb) + ',' + (this.rgb) + ',' + (this.rgb) + ', 1)');
    //   allPercentes-=element.agentShare;
    // });
    // this.labels.push('ostatok');
    // this.dataLabels.push(allPercentes);
    // this.background.push("rgba(" + (this.rgb) + ',' + (this.rgb) + ',' + (this.rgb) + ', 0)');
    this.dialog.open(MyModalComponent, {
      data: {
        // contain: 'graf',
        // labels: this.labels,
        // dataLabels: this.dataLabels,
        // background: this.background
      }
    });
  }

  openModalError() {
    this.dialog.open(MyModalComponent, {
      data: {
        contain: 'error',
        tokenAmount: this.initialDataService.arr[0],
        investmentArr: this.investmentService.getRound(),
        agentsArr: this.arr,
        poolArr: this.poolArr,
      }
    });
  }

}