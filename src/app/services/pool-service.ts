import { Injectable,EventEmitter } from '@angular/core';
import { arrItem } from '../token/token.component';
import { ProjectService } from './project-service-service';

@Injectable({
  providedIn: 'root'
})

export class PoolService {
  myEvent2: EventEmitter<any> = new EventEmitter<any>();

  public arr: PoolModel [] = [new PoolModel(1, "Token", 0)]; 
  public poolType: string [] = ['Pool Type']; 
  public poolsStr: string [] = [];
  
  public arrBlock: PoolModelBlock [] = [new PoolModelBlock('exchange',0,0, this.arr[0].poolType, 0, 0, new arrItem(0 ,'exchange', "pool"))];

  constructor() { }

  getPoolTypeArr() {
    return this.arr;
  }

  getPoolType() {
    this.poolType.length = 0;
    this.arr.forEach(element => {
      this.poolType.push(element.poolType);
    });
    return this.poolType;
  }

  getPoolBlock() {
    return this.arrBlock;
  }

  getPoolStr() {
    this.poolsStr.length = 0;
    this.arrBlock.forEach(element => {
      this.poolsStr.push(element.poolTitle)
    });
    return this.poolsStr;
  }

  getArr() {
    return this.arr;
  }

  setArr(arr: PoolModel[]) {
   this.arr = arr;
  }

  increasePool() {
    this.arr.push(new PoolModel((this.arr.length + 1), 'Pool Type ' + (this.arr.length), this.arr.length)); 
    this.getPoolType();
  }

  decreasePool(item: number) {
    if (this.arr.length > 1) {
      this.arr.splice(item, 1);
      this.getPoolType();
    }
  }  

  increasePoolBLock() {
    if (this.arrBlock[this.arrBlock.length-1].poolTitle == 'stakingPool') {
      this.arrBlock.splice((this.arr.length-2), 0, new PoolModelBlock('Pool ' + (this.arrBlock.length),0,0, this.arr[0].poolType, 0, 0,new arrItem(this.arrBlock.length, 'Pool ' + (this.arrBlock.length ), "pool")))
    } else {
      this.arrBlock.push(new PoolModelBlock('Pool ' + (this.arrBlock.length),0,0, this.arr[0].poolType, 0, 0,new arrItem(this.arrBlock.length, 'Pool ' + (this.arrBlock.length ), "pool")));
    }
  }

  decreasePoolBlock(item: number) {
    if (this.arrBlock[item].poolTitle != 'stakingPool' && this.arrBlock[item].poolTitle != 'exchange') {
      if (this.arrBlock.length > 1) {
        this.arrBlock.splice(item, 1);
        this.getPoolType();
      }
    }
  }

}

export class PoolModel {
  public poolNumber: number;
  public poolType: string;
  public id: number;


  constructor(poolNumber: number, poolType: string, id: number) {
    this.poolNumber = poolNumber;
    this.poolType = poolType;
    this.id = id;
  }
}  

export class PoolModelBlock {
  public poolTitle: string;
  public poolType: number;
  public poolType_optionId: number;
  public poolType_optionValue: string;
  public poolShare: number;
  public amount: number;
  public source: arrItem;

  constructor(poolTitle: string, poolType: number, poolType_optionId: number, poolType_optionValue: string, poolShare: number, amount: number, source: arrItem) {
      this.poolTitle = poolTitle;
      this.poolType = poolType;
      this.poolType_optionId = poolType_optionId;
      this.poolType_optionValue = poolType_optionValue;   
      this.poolShare = poolShare;
      this.amount = amount;
      this.source = source;
  }
}