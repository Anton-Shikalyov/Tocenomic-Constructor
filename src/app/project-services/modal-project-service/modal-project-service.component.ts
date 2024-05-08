import { Component, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { forEach } from 'jszip';
import { InitialDataService } from 'src/app/services/initialData-service';
import { ProjectModel, ProjectService } from 'src/app/services/project-service-service';
@Component({
  selector: 'app-modal-project-service',
  templateUrl: './modal-project-service.component.html',
  styleUrls: ['./modal-project-service.component.css']
})
export class ModalProjectServiceComponent implements AfterViewInit {

  public stakingArr: ProjectModel[] = this.projectService.getStakingArr();
  public farmingArr: ProjectModel[] = this.projectService.getFarmingArr();
  public id: number = 0;
  public dataWindow: string = '';
  public agentShare: number = 0;

  public activeEqualBtn = false;
  public activeStableBtn = false;
  public activePreconditionsBtn = false;

  public selectEqual = true;
  public selectStable = true;
  public selecPreconditions = true;
  public selectSource: number = 0;
  public stable: number = 0;
  public precondsArr: preConditionArrModel[] = [];
  public preconds: preConditionModel[] = [];

  public activeMonthBtn = false;
  public activeDurationBtn = false;
  public activeStartStake = false;
  public activeEndStake = false;
  public activeMaximumBtn = false;
  // public activePercentageWithdrawn = false;

  public selectMonth = true;
  public selectDuration = true;
  public selectStartStake = true;
  public selectEndStake = true;
  public selectMaximum = true;
  // public selectPercentageWithdrawn = true;

  public month: number = 1;
  public duration: number = 0;
  public maximum: number = 0;
  public startStake: number = 0;
  public endStake: number = 0;
  public percentageWithdrawn: number = 0;

  constructor(public dialog: MatDialog,
    private projectService: ProjectService,
    private initialDataService: InitialDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.dataWindow = data.data;
  }

  switchEqual() {
    if (!this.activeEqualBtn) {
      this.activeEqualBtn = true;
      this.activeStableBtn = false;
      this.activePreconditionsBtn = false;
      this.selecPreconditions = true;
      this.selectStable = true;
      this.selectEqual = false;
    } else {
      this.activeEqualBtn = false;
      this.activeStableBtn = false;
      this.activePreconditionsBtn = false;
      this.selecPreconditions = true;
      this.selectStable = true;
      this.selectEqual = true;
    }
  }

  switchStable() {
    if (!this.activeStableBtn) {
      this.activeEqualBtn = false;
      this.activeStableBtn = true;
      this.activePreconditionsBtn = false;
      this.selecPreconditions = true;
      this.selectStable = false;
      this.selectEqual = true;
    } else {
      this.activeEqualBtn = false;
      this.activeStableBtn = false;
      this.activePreconditionsBtn = false;
      this.selecPreconditions = true;
      this.selectStable = true;
      this.selectEqual = true;
    }
  }

  switchPreconditions() {
    if (!this.activePreconditionsBtn) {
      if (this.precondsArr.length == 0) {
        this.addPrecondition();
      }
      this.activeEqualBtn = false;
      this.activeStableBtn = false;
      this.activePreconditionsBtn = true;
      this.selecPreconditions = false;
      this.selectStable = true;
      this.selectEqual = true;
      this.activeMaximumBtn = false;
      this.selectMaximum = true;
      // this.activePercentageWithdrawn = false;
      // this.selectPercentageWithdrawn = true;
    } else {
      this.activeEqualBtn = false;
      this.activeStableBtn = false;
      this.activePreconditionsBtn = false;
      this.selecPreconditions = true;
      this.selectStable = true;
      this.selectEqual = true;
      this.activeMaximumBtn = false;
      this.selectMaximum = true;
      // this.activePercentageWithdrawn = false;
      // this.selectPercentageWithdrawn = true;
    }
  }

  switchMonth() {
    if (!this.activeMonthBtn) {
      this.activeMonthBtn = true;
      this.selectMonth = false;
    } else {
      this.activeMonthBtn = false;
      this.selectMonth = true;
    }
  }

  switchDuration() {
    if (!this.activeDurationBtn) {
      this.activeDurationBtn = true;
      this.selectDuration = false;
    } else {
      this.activeDurationBtn = false;
      this.selectDuration = true;
    }
  }

  switchStartStake() {
    if (!this.activeStartStake) {
      this.activeStartStake = true;
      this.selectStartStake = false;
    } else {
      this.activeStartStake = false;
      this.selectStartStake = true;
    }
  }

  switchEndStake() {
    if (!this.activeEndStake) {
      this.activeEndStake = true;
      this.selectEndStake = false;
    } else {
      this.activeEndStake = false;
      this.selectEndStake = true;
    }
  }

  switchMaximum() {
    if (!this.activeMaximumBtn) {
      this.activeMaximumBtn = true;
      this.activePreconditionsBtn = false;
      // this.activePercentageWithdrawn = false;
      this.selectMaximum = false;
      this.selecPreconditions = true;
      // this.selectPercentageWithdrawn = true;
    } else {
      this.activeMaximumBtn = false;
      this.activePreconditionsBtn = false;
      // this.activePercentageWithdrawn = false;
      this.selectMaximum = true;
      this.selecPreconditions = true;
      // this.selectPercentageWithdrawn = true;
    }
  }

  // switchPercentageWithdrawn() {
  //   if (!this.activePercentageWithdrawn) {
  //     this.activePercentageWithdrawn = true;
  //     this.activeMaximumBtn = false;
  //     this.activePreconditionsBtn = false;
  //     this.selectPercentageWithdrawn = false;
  //     this.selectMaximum = true;
  //     this.selecPreconditions = true;
  //   } else {
  //     this.activeMaximumBtn = false;
  //     this.activePreconditionsBtn = false;
  //     this.activePercentageWithdrawn = false;
  //     this.selectMaximum = true;
  //     this.selecPreconditions = true;
  //     this.selectPercentageWithdrawn = true;
  //   }
  // }

  addPrecondition() {
    this.precondsArr.push(new preConditionArrModel("Precondition: " + (this.precondsArr.length + 1), 0, [new preConditionModel(1, 0, "And")]));
  }

  deletePrecondition(id: number) {
    if (this.precondsArr.length > 1) {
      this.precondsArr.splice(id, 1);
    }
  }

  addPreconditions(i: number) {
    this.precondsArr[i].precondition.push(new preConditionModel(1, 0, "And"));
  }

  deletePreconditions(idArr: number, idPrecond: number) {
    if (this.precondsArr[idArr].precondition.length > 1) {
      this.precondsArr[idArr].precondition.splice(idPrecond, 1);
    }
  }

  modalCl() {
    const precondition: {
      selectSource: number,
      precondition: any;
    } = {
      selectSource: 0,
      precondition: {}
    };
    let preconditionRows: {
      preconditionRows: Record<number, any>;
    } = {
      preconditionRows: {}
    };

    const unPreconds: {
      aplicable: Record<string, any>;
      percentage: any;
    } = {
      aplicable: {},
      percentage: {}
    };
    precondition.selectSource = +this.selectSource;

    if (this.activeStartStake && this.activeEndStake) {
      unPreconds.aplicable = {
        stakingMonth: 1,
        durationLimit: this.initialDataService.arr[5] || 0,
      }
    }


    if (this.activeMonthBtn && this.activeDurationBtn && !this.activeEndStake) {
      this.endStake = this.month + this.duration - 1;
      unPreconds.aplicable = {
        startStake: this.month,
        endStake: this.endStake
      }
    }

    if (!this.activeMonthBtn && !this.activeDurationBtn && !this.activeEndStake && !this.activeStartStake) {
      unPreconds.aplicable = {
        stakingMonth: 1,
        durationLimit: this.initialDataService.arr[5] || 0,
        startStake: 1,
        endStake: this.initialDataService.arr[5] || 0
      }
    }

    if (this.dataWindow == "unstaking") {
      this.projectService.stakingArr[this.id].unFactor = {
        ...unPreconds
      }
    }
    if (this.dataWindow == "unfarming") {
      this.projectService.farmingArr[this.id].unFactor = {
        ...unPreconds
      }
    }

    if (this.activePreconditionsBtn) {
      if (this.dataWindow == "staking" || 'farming') {
        this.precondsArr.forEach((element, i) => {
          preconditionRows.preconditionRows = {};
          element.precondition.forEach((item, k) => {
            preconditionRows
            preconditionRows.preconditionRows[k] = {
              choosenPreCondition: item.choosenPreCondition,
              preConditionValue: item.preConditionValue,
              betweenPreCondition: item.betweenPreCondition || null
            }
          });
          precondition.precondition[i] = {
            preconditionName: element.precondName,
            preconditionValue: element.precondValue,
            preconditionRows: { ...preconditionRows.preconditionRows }
          }
          if (this.dataWindow == "staking") {
            this.projectService.stakingArr[this.id].precondition = {
              ...precondition
            }
          }
          else if (this.dataWindow == "farming") {
            this.projectService.farmingArr[this.id].precondition = {
              ...precondition.precondition
            }
          }
        });
      }
      if (this.dataWindow == "unstaking" || "unfarming") {
        if (this.activePreconditionsBtn) {
          this.precondsArr.forEach((element, i) => {
            preconditionRows.preconditionRows = {};
            element.precondition.forEach((item, k) => {
              preconditionRows
              preconditionRows.preconditionRows[k] = {
                choosenPreCondition: item.choosenPreCondition,
                preConditionValue: item.preConditionValue,
                betweenPreCondition: item.betweenPreCondition || null
              }
            });
            unPreconds.percentage[i] = {
              preconditionName: element.precondName,
              preconditionValue: element.precondValue,
              preconditionRows: { ...preconditionRows.preconditionRows }
            }
            if (this.dataWindow == "unstaking") {
              this.projectService.stakingArr[this.id].unFactor = {
                ...unPreconds
              }
            }
            else if (this.dataWindow == "unfarming") {
              this.projectService.farmingArr[this.id].unFactor = {
                ...unPreconds
              }
            }
          });
        }
      }
    }

    if (this.activeMonthBtn) {
      if (this.dataWindow == "unstaking") {
        unPreconds.aplicable = { ...unPreconds.aplicable, stakingMonth: this.month }
        this.projectService.stakingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
      if (this.dataWindow == "unfarming") {
        unPreconds.aplicable = { ...unPreconds.aplicable, stakingMonth: this.month }
        this.projectService.farmingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
    }

    if (this.activeDurationBtn) {
      if (this.dataWindow == "unstaking") {
        unPreconds.aplicable = { ...unPreconds.aplicable, durationLimit: this.duration }
        this.projectService.stakingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
      if (this.dataWindow == "unfarming") {
        unPreconds.aplicable = { ...unPreconds.aplicable, durationLimit: this.duration }
        this.projectService.farmingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
    }

    if (this.activeStartStake) {
      if (this.dataWindow == "unstaking") {
        unPreconds.aplicable = { ...unPreconds.aplicable, startStake: this.startStake }
        this.projectService.stakingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
      if (this.dataWindow == "unfarming") {
        unPreconds.aplicable = { ...unPreconds.aplicable, startStake: this.startStake }
        this.projectService.farmingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
    }

    if (this.activeEndStake) {
      if (this.dataWindow == "unstaking") {
        unPreconds.aplicable = { ...unPreconds.aplicable, endStake: this.endStake }
        this.projectService.stakingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
      if (this.dataWindow == "unfarming") {
        unPreconds.aplicable = { ...unPreconds.aplicable, endStake: this.endStake }
        this.projectService.farmingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
    }

    if (this.activeMaximumBtn) {
      if (this.dataWindow == "unstaking") {
        unPreconds.percentage = { maximumMonthly: this.maximum }
        this.projectService.stakingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
      if (this.dataWindow == "unfarming") {
        unPreconds.percentage = { maximumMonthly: this.maximum }
        this.projectService.farmingArr[this.id].unFactor = {
          ...unPreconds
        }
      }
    }

    // if (this.activePercentageWithdrawn) {
    //   if (this.dataWindow == "unstaking") {
    //     unPreconds.percentage = { percentageWithdrawn: this.percentageWithdrawn }
    //     this.projectService.stakingArr[this.id].unFactor = {
    //       ...unPreconds
    //     }
    //   }
    //   if (this.dataWindow == "unfarming") {
    //     unPreconds.percentage = { percentageWithdrawn: this.percentageWithdrawn }
    //     this.projectService.farmingArr[this.id].unFactor = {
    //       ...unPreconds
    //     }
    //   }
    // }

    else if (this.activeEqualBtn) {
      if (this.dataWindow == "staking") {
        precondition.precondition = { currentStakingShare: true }
        this.projectService.stakingArr[this.id].precondition = {
          ...precondition
        }
      }
      else if (this.dataWindow == "farming") {
        precondition.precondition = { currentStakingShare: true }
        this.projectService.farmingArr[this.id].precondition = {
          ...precondition
        }
      }
    }

    else if (this.activeStableBtn) {
      if (this.dataWindow == "staking") {
        precondition.precondition = { stable: this.stable }
        this.projectService.stakingArr[this.id].precondition = {
          ...precondition
        }
      }
      else if (this.dataWindow == "farming") {
        precondition.precondition = { stable: this.stable }
        this.projectService.farmingArr[this.id].precondition = {
          ...precondition
        }
      }
    }
    // if (this.endStake <= (this.month + this.duration -1)) {
    //   window.confirm('error');
    // }
    // else {
    //  this.dialog.closeAll();
    // }
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.stakingArr = this.projectService.getStakingArr();
    this.agentShare = this.stakingArr[this.id].agentShare;
    this.selectSource = 1;
    let x: {
      value: any;
    } = {
      value: 0,
    };
    if (this.dataWindow == "unstaking") {
      x.value = { ...this.projectService.stakingArr[this.id].unFactor };
    }
    if (this.dataWindow == "unfarming") {
      x.value = { ...this.projectService.farmingArr[this.id].unFactor };
    }
    if (this.dataWindow == "staking") {
      x.value = { ...this.projectService.stakingArr[this.id].precondition };
    }
    if (this.dataWindow == "farming") {
      x.value = { ...this.projectService.farmingArr[this.id].precondition };
    }
    if (x.value.hasOwnProperty('selectSource')) {
      this.selectSource = x.value.selectSource;
    }
    if (x.value.hasOwnProperty('precondition')) {
      if (x.value.precondition.hasOwnProperty('stable')) {
        this.switchStable();
        this.stable = x.value.precondition.stable;
      }
      if (x.value.precondition.hasOwnProperty('currentStakingShare')) {
        this.switchEqual();
      }
    }
    if (this.dataWindow == "staking" || "farming") {
      let tmp = x.value;
      if (x.value.hasOwnProperty('precondition')) {
        tmp = x.value.precondition;
      }
      if (tmp.hasOwnProperty('0')) {
        this.activeEqualBtn = false;
        this.activeStableBtn = false;
        this.activePreconditionsBtn = true;
        this.selecPreconditions = false;
        this.selectStable = true;
        this.selectEqual = true;
        this.activeMaximumBtn = false;
        this.selectMaximum = true;
        const precondition = tmp;
        const percentageKeys = Object.keys(precondition);
        percentageKeys.forEach((percentageKey, percentageIndex) => {
          const percentageElem = precondition[percentageKey];
          const precondKeys = Object.keys(percentageElem.preconditionRows);

          let x: preConditionModel[] = []; x = [];
          precondKeys.forEach((precondKey) => {
            const precondElem = percentageElem.preconditionRows[precondKey];
            x.push(new preConditionModel(precondElem.choosenPreCondition, precondElem.preConditionValue, precondElem.betweenPreCondition));
          })
          this.precondsArr.push(new preConditionArrModel(percentageElem.preconditionName, percentageElem.preconditionValue, x));
          this.preconds.length = 0;
        })
      }
    }

    if (x.value.hasOwnProperty('aplicable')) {
      if (x.value.aplicable.hasOwnProperty('stakingMonth')) {
        this.switchMonth();
        this.month = x.value.aplicable.stakingMonth;
      }
      if (x.value.aplicable.hasOwnProperty('durationLimit')) {
        this.switchDuration();
        this.duration = x.value.aplicable.durationLimit;
      }
      if (x.value.aplicable.hasOwnProperty('startStake')) {
        this.switchStartStake();
        this.startStake = x.value.aplicable.startStake;
      }
      if (x.value.aplicable.hasOwnProperty('endStake')) {
        this.switchEndStake();
        this.endStake = x.value.aplicable.endStake;
      }
    }

    if (x.value.hasOwnProperty('percentage')) {
      if (x.value.percentage.hasOwnProperty('maximumMonthly')) {
        this.switchMaximum();
        this.maximum = x.value.percentage.maximumMonthly;
      }
      if (x.value.percentage.hasOwnProperty('0')) {
        this.activeEqualBtn = false;
        this.activeStableBtn = false;
        this.activePreconditionsBtn = true;
        this.selecPreconditions = false;
        this.selectStable = true;
        this.selectEqual = true;
        this.activeMaximumBtn = false;
        this.selectMaximum = true;
        const percentage = x.value.percentage;
        const percentageKeys = Object.keys(percentage);
        percentageKeys.forEach((percentageKey, percentageIndex) => {
          const percentageElem = percentage[percentageKey];
          const precondKeys = Object.keys(percentageElem.preconditionRows);

          let x: preConditionModel[] = []; x = [];
          precondKeys.forEach((precondKey) => {
            const precondElem = percentageElem.preconditionRows[precondKey];
            x.push(new preConditionModel(precondElem.choosenPreCondition, precondElem.preConditionValue, precondElem.betweenPreCondition));
          })
          this.precondsArr.push(new preConditionArrModel(percentageElem.preconditionName, percentageElem.preconditionValue, x));
          this.preconds.length = 0;
        })
      }
    }
  }

  ngAfterViewInit(): void {
    // this.stakingArr = this.projectService.getStakingArr();
    // this.agentShare = this.stakingArr[this.id].agentShare;
  }
}

class preConditionModel {
  public choosenPreCondition: number = 0;
  public preConditionValue: number = 0;
  public betweenPreCondition?: string = "";

  constructor(choosenPreCondition: number, preConditionValue: number, betweenPreCondition?: string) {
    this.choosenPreCondition = choosenPreCondition;
    this.preConditionValue = preConditionValue;
    this.betweenPreCondition = betweenPreCondition;
  }
}

class preConditionArrModel {
  public precondName: string = "";
  public precondValue: number = 0;
  public precondition: preConditionModel[] = [];
  constructor(precondName: string, precondValue: number, precondition: preConditionModel[]) {
    this.precondName = precondName;
    this.precondValue = precondValue;
    this.precondition = precondition;
  }
}