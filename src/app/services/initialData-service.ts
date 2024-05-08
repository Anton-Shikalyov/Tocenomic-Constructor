import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InitialDataService {

  updateData: EventEmitter<any> = new EventEmitter<any>();
  myEventToken: EventEmitter<any> = new EventEmitter<any>();
  public arr: any = new InitialModel('Token',0, 0, 'Decentralized', 'Increasing', 0);

  getInitialArr() {
    return this.arr;
  }
}

export class InitialModel {
  public tokenName: string = 'Token';
  public totalTokenAmount: number = 0;
  public initialTokenProce: number = 0 ;
  public exchangeType: string = 'Decentralized';
  public tradingType: string = 'Increasing';
  public tradingFunction: number = 0;

  constructor(tokenName: string, totalTokenAmount: number,  initialTokenProce: number, exchangeType: string, tradingType: string, tradingFunction: number) {
      this.tokenName = tokenName;
      this.totalTokenAmount = totalTokenAmount;
      this.initialTokenProce = initialTokenProce;
      this.exchangeType = exchangeType;
      this.tradingType = tradingType;
      this.tradingFunction = tradingFunction;
  }
}