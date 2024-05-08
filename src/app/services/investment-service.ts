import { Injectable, EventEmitter } from '@angular/core';
import { arrItem } from '../token/token.component';

@Injectable({
  providedIn: 'root'
})

export class InvestmentService {
    myEvent1: EventEmitter<any> = new EventEmitter<any>();
    constructor() {};
    public arr: IvestmentModel [] = [new IvestmentModel('Round 1', 0 ,0, 0, 0 , new arrItem(0, 'Round1 Investors', 'investmentRound'))]; 
    public roundsNumberValue: number = 1;

    decreaseRound(key: number) {
      this.arr.splice(key, 1);
    }
  
    increaseRound() {
      this.arr.push(new IvestmentModel('Round ' + (this.arr.length + 1), 0 ,0, 0, 0, new arrItem(this.arr.length, 'Round Investors' + (this.arr.length + 1), 'investmentRound'))); 
    }

    setRoundsNumberValue(val: number){
      this.roundsNumberValue = val;
    }

    getRound() {
      return this.arr;
    }
}

export class IvestmentModel {
  public roundTitle: any;
  public fiat: any ;
  public tokenPrice: any;
  public tokensAmount: any;
  public investorShare: any;
  public source: any;

  constructor(roundTitle: any, fiat: any, tokenPrice: any, tokensAmount: any, investorShare: any, source: any) {
      this.roundTitle = roundTitle;
      this.fiat = fiat;
      this.tokenPrice = tokenPrice;
      this.tokensAmount = tokensAmount;
      this.investorShare = investorShare;
      this.source = source;
  }
}