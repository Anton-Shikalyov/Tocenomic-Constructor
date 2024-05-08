import { Component } from '@angular/core';
import { InitialDataService } from '../services/initialData-service';
import { JsonService } from '../services/json-service';
import { InvestmentService, IvestmentModel } from '../services/investment-service';
import { AgentService, AgentModel } from '../services/agent-service';
import { arrItem } from '../token/token.component';
import { PoolService, PoolModel, PoolModelBlock } from '../services/pool-service';
import { VstngUnlckgService, VestingModel, UnlockingModel } from '../services/vstng-unlckg-service';
import { ProjectService, ProjectModel, ServiceModel } from '../services/project-service-service';
import { Token, TokenService } from '../services/token-service';
import { roundUP } from '../utils/utils';

@Component({
  selector: 'app-initial-data',
  templateUrl: './initial-data.component.html',
  styleUrls: ['./initial-data.component.css']
})


export class InitialDataComponent {
  constructor(private initialDataService: InitialDataService,
    private investmentService: InvestmentService,
    private agentService: AgentService,
    private poolService: PoolService,
    private vestingUnlockingService: VstngUnlckgService,
    private projectservice: ProjectService,
    private tokenService: TokenService,
    private jsonService: JsonService) { }

  public tokenName: string = 'Token';
  public tokenAmount: number = 0;
  public tokenPrice: number = 0;
  public exchangeType: string = '';
  public tradingFunction: string = '';
  public duration: number = 0;

  updateInitialData() {
    this.initialDataService.arr[0] = this.tokenName;
    this.initialDataService.arr[1] = this.tokenAmount;
    this.initialDataService.arr[2] = this.tokenPrice;
    this.initialDataService.arr[3] = this.exchangeType;
    this.initialDataService.arr[4] = this.tradingFunction;
    this.initialDataService.arr[5] = this.duration;
    this.initialDataService.myEventToken.emit(this.tokenAmount);
  }

  public investmentArr: IvestmentModel[] = [];
  onFileSelected(event: any) {
    const fileInput = event.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const fileContent = e.target.result as string;
          const jsonData = JSON.parse(fileContent);
          this.investmentArr.length = 0;

          // Initial data
          this.tokenName = "Token";
          this.tokenAmount = 0;
          this.tokenPrice = 0;
          this.exchangeType = "";
          this.tradingFunction = "";
          this.duration = 0;

          this.tokenName = jsonData.initialData.tokenName;
          this.tokenAmount = roundUP(jsonData.initialData.totalTokensAmount);
          this.tokenPrice = roundUP(jsonData.initialData.initialTokenPrice);
          this.exchangeType = jsonData.initialData.exchangeType;
          this.tradingFunction = jsonData.initialData.tradingFunction;
          this.duration = jsonData.initialData.duration;
          this.initialDataService.myEventToken.emit(this.tokenAmount);
          this.updateInitialData();

          // Investment round
          if (jsonData.investmentRounds.numerableInput > 0) {
            for (let i = 0; i <= jsonData.investmentRounds.numerableInput - 1; i++) {
              this.investmentArr.push(
                new IvestmentModel(
                  jsonData.investmentRounds.rows[i].roundTitle,
                  roundUP(jsonData.investmentRounds.rows[i].fiat),
                  roundUP(jsonData.investmentRounds.rows[i].tokenPrice),
                  roundUP(jsonData.investmentRounds.rows[i].tokensAmount),
                  roundUP(jsonData.investmentRounds.rows[i].investorShare),
                  new arrItem(jsonData.investmentRounds.rows[i].source_id, jsonData.investmentRounds.rows[i].source_name, jsonData.investmentRounds.rows[i].source_type)
                )
              )
            }
            this.investmentService.arr.length = 0;
            this.investmentArr.forEach(element => {
              this.investmentService.arr.push(element);
            });
          }
          // Agents
          if (jsonData.agents.numerableInput > 0) {
            this.agentService.arr.length = 0;
            for (let i = 0; i <= jsonData.agents.numerableInput - 1; i++) {
              this.agentService.arr.push
                (new AgentModel
                  (jsonData.agents.rows[i].agentName,
                    roundUP(jsonData.agents.rows[i].agentShare),
                    roundUP(jsonData.agents.rows[i].tokensAmount),
                    new arrItem(i, jsonData.agents.rows[i].agentName, 'agent')
                  )
                )
            }
          }
          //Pools
          if (jsonData.pools.tables.poolTypes.rows != 0) {
            let k = 0;
            this.poolService.arr.length = 0;
            do {
              if (jsonData.pools.tables.poolTypes.rows[k]) {
                this.poolService.arr.push(new PoolModel(jsonData.pools.tables.poolTypes.rows[k].poolNumber, jsonData.pools.tables.poolTypes.rows[k].poolType, jsonData.pools.tables.poolTypes.rows[k].poolType.id));
                k++;
              }
            } while (jsonData.pools.tables.poolTypes.rows[k]);
          }

          if (jsonData.pools.tables.pools.rows != 0) {
            let i = 0;
            this.poolService.arrBlock.length = 0;
            do {
              if (jsonData.pools.tables.pools.rows[i]) {
                this.poolService.arrBlock.push(new PoolModelBlock(
                  jsonData.pools.tables.pools.rows[i].poolTitle,
                  jsonData.pools.tables.pools.rows[i].poolType,
                  jsonData.pools.tables.pools.rows[i].poolType_optionId,
                  jsonData.pools.tables.pools.rows[i].poolType_optionValue,
                  roundUP(jsonData.pools.tables.pools.rows[i].poolShare),
                  roundUP(jsonData.pools.tables.pools.rows[i].amount),
                  new arrItem(i, jsonData.pools.tables.pools.rows[i].poolTitle, "pool")));
              }
              i++;
            } while (jsonData.pools.tables.pools.rows[i]);
          }
          //Vesting & Unlockig
          if (jsonData.vestingAndUnlocking.tables.vesting.rows[0]) {
            let i = 0;
            this.vestingUnlockingService.vestingArr.length = 0;
            do {
              this.vestingUnlockingService.vestingArr.push(new VestingModel(
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].agentName,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].source,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].source_optionId,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].source_optionValue,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].source_optionType,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].pool,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].poolTitle_optionId,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].poolTitle_optionValue,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].startVesting,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].endVesting,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].vestingCoefficient,
                jsonData.vestingAndUnlocking.tables.vesting.rows[i].rewardSource));
              i++;

            } while (jsonData.vestingAndUnlocking.tables.vesting.rows[i]);
          }
          if (jsonData.vestingAndUnlocking.tables.unlocking.rows[0]) {
            let i = 0;
            this.vestingUnlockingService.unlockingArr.length = 0;
            do {
              this.vestingUnlockingService.unlockingArr.push(new UnlockingModel(
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].agent_source,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].agent_optionId,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].agent_optionValue,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].agent_optionType,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].startUnlocking,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].endUnlocking,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].initialUnlocking,
                jsonData.vestingAndUnlocking.tables.unlocking.rows[i].destination));
              i++;
            } while (jsonData.vestingAndUnlocking.tables.unlocking.rows[i]);
          }
          //Project Services
          if (jsonData.projectServices.serviceTables.staking.rows[0]) {
            let i = 0;
            this.projectservice.stakingArr.length = 0;
            do {
              this.projectservice.stakingArr.push(new ProjectModel(
                jsonData.projectServices.serviceTables.staking.rows[i].number,
                jsonData.projectServices.serviceTables.staking.rows[i].source,
                jsonData.projectServices.serviceTables.staking.rows[i].source_optionId,
                jsonData.projectServices.serviceTables.staking.rows[i].source_optionValue,
                jsonData.projectServices.serviceTables.staking.rows[i].source_optionType,
                jsonData.projectServices.serviceTables.staking.rows[i].agentShare,
                { ...jsonData.projectServices.serviceTables.staking.rows[i].unFactor },
                jsonData.projectServices.serviceTables.staking.rows[i].unFactorCondition,
                jsonData.projectServices.serviceTables.staking.rows[i].revardCoefficient,
                jsonData.projectServices.serviceTables.staking.rows[i].rewardCondition,
                jsonData.projectServices.serviceTables.staking.rows[i].pool,
                jsonData.projectServices.serviceTables.staking.rows[i].poolForRewards,
                jsonData.projectServices.serviceTables.staking.rows[i].poolForRewards_optionValue,
                jsonData.projectServices.serviceTables.staking.rows[i].flag
              ));
              i++;
            } while (jsonData.projectServices.serviceTables.staking.rows[i]);
          }
          if (jsonData.projectServices.serviceTables.farming.rows[0]) {
            let i = 0;
            this.projectservice.farmingArr.length = 0;
            do {
              this.projectservice.farmingArr.push(new ProjectModel(
                jsonData.projectServices.serviceTables.farming.rows[i].number,
                jsonData.projectServices.serviceTables.farming.rows[i].source,
                jsonData.projectServices.serviceTables.farming.rows[i].source_optionId,
                jsonData.projectServices.serviceTables.farming.rows[i].source_optionValue,
                jsonData.projectServices.serviceTables.farming.rows[i].source_optionType,
                jsonData.projectServices.serviceTables.farming.rows[i].agentShare,
                { ...jsonData.projectServices.serviceTables.farming.rows[i].unFactor },
                jsonData.projectServices.serviceTables.farming.rows[i].unFactorCondition,
                jsonData.projectServices.serviceTables.farming.rows[i].revardCoefficient,
                jsonData.projectServices.serviceTables.farming.rows[i].rewardCondition,
                jsonData.projectServices.serviceTables.farming.rows[i].pool,
                jsonData.projectServices.serviceTables.farming.rows[i].poolForRewards,
                jsonData.projectServices.serviceTables.farming.rows[i].poolForRewards_optionValue,
                jsonData.projectServices.serviceTables.staking.rows[i].flag));
              i++;
            } while (jsonData.projectServices.serviceTables.farming.rows[i]);
          }

          if (jsonData.projectServices.curveTables.staking.rows[0]) {
            let i = 0;
            this.projectservice.stakingArrService.length = 0;
            do {
              this.projectservice.stakingArrService.push(new ServiceModel(
                jsonData.projectServices.curveTables.staking.rows[i].number,
                jsonData.projectServices.curveTables.staking.rows[i].salesStart,
                jsonData.projectServices.curveTables.staking.rows[i].salesEnd,
                jsonData.projectServices.curveTables.staking.rows[i].salesMin,
                jsonData.projectServices.curveTables.staking.rows[i].salesMax,
                jsonData.projectServices.curveTables.staking.rows[i].chooseAlgorithm,
                jsonData.projectServices.curveTables.staking.rows[i].angularCoefficient,
                jsonData.projectServices.curveTables.staking.rows[i].risingsCoefficient
              ));
              i++;
            } while (jsonData.projectServices.curveTables.staking.rows[i]);
          }

          if (jsonData.projectServices.curveTables.farming.rows[0]) {
            let i = 0;
            this.projectservice.farmingArrService.length = 0;
            do {
              this.projectservice.farmingArrService.push(new ServiceModel(
                jsonData.projectServices.curveTables.farming.rows[i].number,
                jsonData.projectServices.curveTables.farming.rows[i].salesStart,
                jsonData.projectServices.curveTables.farming.rows[i].salesEnd,
                jsonData.projectServices.curveTables.farming.rows[i].salesMin,
                jsonData.projectServices.curveTables.farming.rows[i].salesMax,
                jsonData.projectServices.curveTables.farming.rows[i].chooseAlgorithm,
                jsonData.projectServices.curveTables.farming.rows[i].angularCoefficient,
                jsonData.projectServices.curveTables.farming.rows[i].risingsCoefficient
              ));
              i++;
            } while (jsonData.projectServices.curveTables.farming.rows[i]);
          }

          if (jsonData.projectServices.curveTables[0]) {
            let i = 0;
            this.projectservice.myMap.clear();
            do {
              let k = 0;
              do {
                if (this.projectservice.myMap.has(jsonData.projectServices.curveTables[i].name)) {
                  const currentValue: any = this.projectservice.myMap.get(jsonData.projectServices.curveTables[i].name);

                  currentValue.push([
                    new ServiceModel(jsonData.projectServices.curveTables[i].rows[k].curve,
                      jsonData.projectServices.curveTables[i].rows[k].salesStart,
                      jsonData.projectServices.curveTables[i].rows[k].salesEnd,
                      jsonData.projectServices.curveTables[i].rows[k].salesMin,
                      jsonData.projectServices.curveTables[i].rows[k].salesMax,
                      jsonData.projectServices.curveTables[i].rows[k].chooseAlgorithm,
                      jsonData.projectServices.curveTables[i].rows[k].angularCoefficient,
                      jsonData.projectServices.curveTables[i].rows[k].risingsCoefficient
                    )]);
                  this.projectservice.myMap.set(jsonData.projectServices.curveTables[i].name, currentValue);
                } else {
                  this.projectservice.myMap.set(jsonData.projectServices.curveTables[i].name, [[
                    new ServiceModel(jsonData.projectServices.curveTables[i].rows[k].curve,
                      jsonData.projectServices.curveTables[i].rows[k].salesStart,
                      jsonData.projectServices.curveTables[i].rows[k].salesEnd,
                      jsonData.projectServices.curveTables[i].rows[k].salesMin,
                      jsonData.projectServices.curveTables[i].rows[k].salesMax,
                      jsonData.projectServices.curveTables[i].rows[k].chooseAlgorithm,
                      jsonData.projectServices.curveTables[i].rows[k].angularCoefficient,
                      jsonData.projectServices.curveTables[i].rows[k].risingsCoefficient)]]);
                }
                k++;
              } while (jsonData.projectServices.curveTables[i].rows[k]);
              i++;
            } while (jsonData.projectServices.curveTables[i]);
          }
          //Token circulation
          if (jsonData.tokenCirculation.tables.actions.rows[0]) {
            let i = 0;
            this.tokenService.token.length = 0;
            do {
              this.tokenService.token.push(new Token(
                jsonData.tokenCirculation.tables.actions.rows[i].actionNumber,
                jsonData.tokenCirculation.tables.actions.rows[i].source,
                jsonData.tokenCirculation.tables.actions.rows[i].source_optionId,
                jsonData.tokenCirculation.tables.actions.rows[i].source_optionValue,
                jsonData.tokenCirculation.tables.actions.rows[i].source_optionType,
                jsonData.tokenCirculation.tables.actions.rows[i].currencyType,
                jsonData.tokenCirculation.tables.actions.rows[i].currencyType_optionId,
                jsonData.tokenCirculation.tables.actions.rows[i].currencyType_optionValue,
                jsonData.tokenCirculation.tables.actions.rows[i].currencyType_optionType,
                jsonData.tokenCirculation.tables.actions.rows[i].valuePercentes,
                jsonData.tokenCirculation.tables.actions.rows[i].destination,
                jsonData.tokenCirculation.tables.actions.rows[i].destionation_optionId,
                jsonData.tokenCirculation.tables.actions.rows[i].destionation_optionValue,
                jsonData.tokenCirculation.tables.actions.rows[i].destionation_optionType,
                jsonData.tokenCirculation.tables.actions.rows[i].preCondition,
                { ...jsonData.tokenCirculation.tables.preconds[i] },
                jsonData.tokenCirculation.tables.actions.rows[i].flag));
              i++;
            } while (jsonData.tokenCirculation.tables.actions.rows[i]);
          }

          this.initialDataService.updateData.emit();
        }
      };
      reader.readAsText(file);
    }
    this.jsonService.uploadedUnVes = true;
    this.jsonService.uploadedService = true;
  }

  onInputChange(event: Event) {
    this.updateInitialData();
    this.initialDataService.myEventToken.emit(this.tokenAmount);
  }
}
