import { Component } from '@angular/core';
import { IvestmentModel, InvestmentService } from '../services/investment-service';
import { InitialDataService } from '../services/initialData-service';
import { AgentModel, AgentService } from '../services/agent-service';
import { PoolModelBlock, PoolService } from '../services/pool-service';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { roundUP } from '../utils/utils';

@Component({
  selector: 'app-investment-rounds',
  templateUrl: './investment-rounds.component.html',
  styleUrls: ['./investment-rounds.component.css']
})

export class InvestmentRoundsComponent {
  public roundsNumberValue: number = this.investmentService.roundsNumberValue;
  public totalTokenAmount: number = 0;
  public arr: IvestmentModel [] = this.investmentService.getRound(); 
  public agentArr: AgentModel [] = this.agentService.getArr(); 
  public poolArr: PoolModelBlock [] = this.poolServise.getPoolBlock();

  constructor(private investmentService: InvestmentService,
              private initialDataService: InitialDataService,
              private agentService: AgentService,
              private poolServise: PoolService,              
              public dialog: MatDialog) {}

    pushFunc(x: Event) {
      if (this.roundsNumberValue > this.arr.length) {
          for (let i = this.arr.length; i < this.roundsNumberValue; i++) {
            this.investmentService.increaseRound();
          }
      } 
  
      if (this.arr.length > this.roundsNumberValue) {
          for (let i = this.arr.length; i > this.roundsNumberValue; i--) {
            this.investmentService.arr.pop();
          }
      }
    }

  setRoundsNumberValue(value: number) {
    this.roundsNumberValue = value;
  }

  updateAgent(event: Event, id: number) {
    this.investmentService.arr[id].source.name = this.investmentService.arr[id].roundTitle + " Investors";
    this.investmentService.arr = this.arr;
    this.investmentService.myEvent1.emit(1);
  }

  onInputTokenPrice(i: number) {
    // this.arr[i].investorShare = this.arr[i].tokensAmount*100/this.totalTokenAmount;
    // this.arr[i].fiat = ((this.totalTokenAmount * this.arr[i].investorShare)/100) * this.arr[i].tokenPrice;
    // this.arr[i].tokensAmount = this.totalTokenAmount /100 * this.arr[i].investorShare;    

    let percent: number = 0;
    this.agentArr = this.agentService.getArr();
    this.poolArr = this.poolServise.getPoolBlock();
    for (let i = 0; i < this.arr.length; i++) {
      percent += roundUP(this.agentArr[i].agentShare);
      for (let k = 0; k < this.poolArr.length; k++) {
        percent += roundUP(this.poolArr[k].poolShare);
      } 
    }
    if (this.totalTokenAmount == 0) {
      window.confirm('Enter the token amount in intial data');
    }
    // if (percent > 100 || this.arr[i].investorShare > 100) {
    //   window.confirm('You already have: ' + percent);
    // }
    this.investmentService.arr = this.arr;
  }

  onInputInvestorShare(i: number) {
    let percent: number = 0;
    // this.arr[i].tokensAmount = this.arr[i].fiat / this.arr[i].tokenPrice; 
    // this.arr[i].fiat = ((this.totalTokenAmount * this.arr[i].investorShare)/100) * this.arr[i].tokenPrice;
    this.agentArr = this.agentService.getArr();
    this.poolArr = this.poolServise.getPoolBlock();
    for (let i = 0; i < this.arr.length; i++) {
      percent += roundUP(this.agentArr[i].agentShare);
      for (let k = 0; k < this.poolArr.length; k++) {
        percent += roundUP(this.poolArr[k].poolShare);
      } 
    }
    if (this.totalTokenAmount == 0) {
      window.confirm('Enter the token amount in intial data');
    }
    // if (percent > 100 || this.arr[i].investorShare > 100) {
    //   window.confirm('You already have: ' + percent);
    // }
    //  else {
      this.investmentService.arr = this.arr;  
    // }
  }

  onInputFiat(i: number) {
    let percent: number = 0;
    this.arr[i].tokensAmount = roundUP(this.arr[i].fiat/this.arr[i].tokenPrice);
    this.arr[i].investorShare = roundUP((this.arr[i].tokensAmount*100)/this.totalTokenAmount);
    percent +=  roundUP(this.arr[i].investorShare);
    this.agentArr = this.agentService.getArr();
    this.poolArr = this.poolServise.getPoolBlock();

    for (let i = 0; i < this.arr.length; i++) {
      percent += roundUP(this.agentArr[i].agentShare);
      for (let k = 0; k < this.poolArr.length; k++) {
        percent += roundUP(this.poolArr[k].poolShare);
      } 
    }
    if (this.totalTokenAmount == 0) {
      window.confirm('Enter the token amount in intial data');
    }
    // if (percent > 100) {
    //   window.confirm('You already have: ' + percent);
    // } else {
    // }
    this.investmentService.arr = this.arr;
  }

  onInputTokenAmount(i: number) {
    let percent: number = 0;
    this.agentArr = this.agentService.getArr();
    this.poolArr = this.poolServise.getPoolBlock();

    this.arr[i].investorShare = roundUP(this.arr[i].tokensAmount*100/this.totalTokenAmount);
    this.arr[i].fiat = roundUP(this.arr[i].tokensAmount * this.arr[i].tokenPrice);
    
    if (this.arr[i].fiat != 0) {
      this.arr[i].tokenPrice = roundUP(this.arr[i].fiat / this.arr[i].tokensAmount); 
    }
    for (let i = 0; i < this.arr.length; i++) {
      percent += roundUP(this.agentArr[i].agentShare);
      for (let k = 0; k < this.poolArr.length; k++) {
        percent += roundUP(this.poolArr[k].poolShare);
      } 
    }
    if (this.totalTokenAmount == 0) {
      window.confirm('Enter the token amount in intial data');
    }
    // if (percent > 100 || this.arr[i].investorShare > 100) {
    //   window.confirm('You already have: ' + percent);
    // } else {
    // }
    this.investmentService.arr = this.arr;
  }

  decreaseRound(key: number) {
    this.investmentService.decreaseRound(key);
    this.roundsNumberValue = this.arr.length;
    this.investmentService.myEvent1.emit(1);
  }

  increaseRound() {
    this.investmentService.increaseRound();
    this.roundsNumberValue = this.arr.length;
    this.investmentService.myEvent1.emit(1);
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

  ngOnInit() {
    this.initialDataService.updateData.subscribe((data: number) => {
        this.roundsNumberValue = this.arr.length;
    });
    
    this.initialDataService.myEventToken.subscribe((data: number) => {
      this.totalTokenAmount = this.initialDataService.arr[1];
      this.investmentService.arr.forEach(element => {
        element.tokensAmount = roundUP(this.totalTokenAmount /100 * element.investorShare);
      });
      this.investmentService.arr.forEach(element => {
        if (element.tokenPrice == 0) {
          element.tokenPrice = roundUP(this.initialDataService.arr[2]);
        }
      });
    })
  }
}
