import { Component } from '@angular/core';
import { JsonService } from 'src/app/services/json-service';
import { InitialDataService } from 'src/app/services/initialData-service';
import { InvestmentService, IvestmentModel } from 'src/app/services/investment-service';
import { AgentModel, AgentService } from 'src/app/services/agent-service';
import { PoolModel, PoolModelBlock, PoolService } from 'src/app/services/pool-service';
import { VstngUnlckgService } from 'src/app/services/vstng-unlckg-service';
import { ProjectService, ServiceModel } from 'src/app/services/project-service-service';
import { TokenService } from 'src/app/services/token-service';
import { RequestService } from 'src/app/services/request-sevice';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    constructor(private initialService: InitialDataService,
        private investmentService: InvestmentService,
        private agentService: AgentService,
        private poolService: PoolService,
        private vestingUnlockingService: VstngUnlckgService,
        private projectServices: ProjectService,
        private tokenService: TokenService,
        public jsonService: JsonService,
        private requestService: RequestService, private router: Router) { }
    title = 'gerudaConstructor';
    public jsonString: any;
    public link: any;
    loading: boolean = false;

    genData() {
        const investmentRounds: {
            numerableInput: number;
            rows: Record<number, any>;
            name: string;
        } = {
            numerableInput: this.investmentService.arr.length,
            rows: {},
            name: "investmentRounds"
        };

        this.investmentService.arr.forEach((item, index) => {
            investmentRounds.rows[index] = {
                roundTitle: item.roundTitle,
                fiat: item.fiat,
                tokenPrice: item.tokenPrice,
                tokensAmount: item.tokensAmount,
                investorShare: item.investorShare,
                source_id: item.source.id,
                source_name: item.source.name,
                source_type: item.source.type
            };
        });

        const agents: {
            numerableInput: number;
            rows: Record<number, any>;
            name: string;
        } = {
            numerableInput: this.agentService.arr.length,
            rows: {},
            name: "agents"
        };
        this.agentService.arr.forEach((item, index) => {
            agents.rows[index] = {
                agentName: item.agentName,
                agentShare: item.agentShare,
                tokensAmount: item.tokensAmount,
            };
        });

        const poolTypes: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "poolTypes"
        };
        this.poolService.arr.forEach((item, index) => {
            poolTypes.rows[index] = {
                poolNumber: item.poolNumber,
                poolType: item.poolType
            };
        });

        const pools: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "pools"
        };
        this.poolService.arrBlock.forEach((item, index) => {
            pools.rows[index] = {
                poolTitle: item.poolTitle,
                poolType: <number>item.poolType_optionId,
                poolType_optionId: <number>item.poolType_optionId,
                poolType_optionValue: item.poolType_optionValue,
                poolShare: item.poolShare,
                amount: item.amount
            };
        });

        const vesting: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "vesting"
        };
        this.vestingUnlockingService.vestingArr.forEach((item, index) => {
            vesting.rows[index] = {
                agentName: item.agentName,
                source: item.source,
                source_optionId: item.source_optionId,
                source_optionValue: item.source_optionValue,
                source_optionType: item.source_optionType,
                poolTitle: item.poolTitle_optionId,
                poolTitle_optionId: item.poolTitle_optionId,
                poolTitle_optionValue: item.poolTitle_optionValue,
                startVesting: item.startVesting,
                endVesting: item.endVesting,
                vestingCoefficient: item.vestingCoeff,
                rewardSource: item.rewardSource
            };
        });

        const unlocking: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "unlocking"
        };
        this.vestingUnlockingService.unlockingArr.forEach((item, index) => {
            unlocking.rows[index] = {
                agent_source: item.agent_source,
                agent_optionId: item.agent_optionId,
                agent_optionValue: item.agent_optionValue,
                agent_optionType: item.agent_optionType,
                startUnlocking: item.startUnlocking,
                endUnlocking: item.endUnlocking,
                initialUnlocking: item.initialUnlocking,
                destination: item.destination
            };
        });

        const staking: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "staking"
        };
        this.projectServices.stakingArr.forEach((item, index) => {
            staking.rows[index] = {
                number: item.num,
                source: item.source,
                source_optionId: item.source_optionId,
                source_optionValue: item.source_optionValue,
                source_optionType: item.source_optionType,
                agentShare: item.agentShare,
                unFactor: item.unFactor,
                unFactorCondition: item.unFactorCondition,
                revardCoefficient: item.precondition,
                rewardCondition: item.rewardCondition,
                poolForRewards: item.poolTitle_optionId,
                poolForRewards_optionId: item.poolTitle_optionId,
                poolForRewards_optionValue: item.poolTitle_optionValue,
                flag: item.flag
            };
        });

        const farming: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "farming"
        };
        this.projectServices.farmingArr.forEach((item, index) => {
            farming.rows[index] = {
                number: item.num,
                source: item.source,
                source_optionId: item.source_optionId,
                source_optionValue: item.source_optionValue,
                source_optionType: item.source_optionType,
                agentShare: item.agentShare,
                unFactor: item.unFactor,
                unFactorCondition: item.unFactorCondition,
                revardCoefficient: item.precondition,
                rewardCondition: item.rewardCondition,
                poolForRewards: item.poolTitle_optionId,
                poolForRewards_optionId: item.poolTitle_optionId,
                poolForRewards_optionValue: item.poolTitle_optionValue,
                flag: item.flag
            };
        });


        const id: {
            rows: any;
            name: string;
        } = {
            rows: {},
            name: "-",
        };

        let block: any = {};
        let counter = 0;
        this.projectServices.myMap.forEach((value, key) => {
            value.forEach((element, index) => {
                id.rows[index] = {
                    curveNumber: element[0].curve,
                    salesStart: element[0].salesStart,
                    salesEnd: element[0].salesEnd,
                    salesMin: element[0].salesMin,
                    salesMax: element[0].salesMax,
                    chooseAlgorithm: element[0].algorithm,
                    angularCoefficient: element[0].angularCoefficient,
                    risingsCoefficient: element[0].risingCoefficient,
                };
            });
            id.name = key;
            block[`${counter}`] = { ...id };
            id.rows = {};
            counter++;
        });

        const stakingServise: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "Staking"
        };

        this.projectServices.stakingArrService.forEach((element, index) => {
            stakingServise.rows[index] = {
                curveNumber: element.curve,
                salesStart: element.salesStart,
                salesEnd: element.salesEnd,
                salesMin: element.salesMin,
                salesMax: element.salesMax,
                chooseAlgorithm: element.algorithm,
                angularCoefficient: element.angularCoefficient,
                risingsCoefficient: element.risingCoefficient,
            };
        });


        const farmingServise: {
            rows: Record<number, any>;
            name: string;
        } = {
            rows: {},
            name: "Farming"
        };

        this.projectServices.farmingArrService.forEach((element, index) => {
            farmingServise.rows[index] = {
                curveNumber: element.curve,
                salesStart: element.salesStart,
                salesEnd: element.salesEnd,
                salesMin: element.salesMin,
                salesMax: element.salesMax,
                chooseAlgorithm: element.algorithm,
                angularCoefficient: element.angularCoefficient,
                risingsCoefficient: element.risingCoefficient,
            };
        });

        const actions: {
            rows: Record<number, any>;
        } = {
            rows: {},
        };
        this.tokenService.token.forEach((item, index) => {
            actions.rows[index] = {
                actionNumber: item.action,
                source: item.source,
                source_optionId: item.source_optionId,
                source_optionValue: item.source_optionValue,
                source_optionType: item.source_optionType,
                currencyType: item.currencyType,
                currencyType_optionId: item.currencyType_optionId,
                currencyType_optionValue: item.currencyType_optionValue,
                currencyType_optionType: item.currencyType_optionType,
                valuePercentes: item.valuePercentes,
                destination: item.destination,
                destionation_optionId: item.destionation_optionId,
                destionation_optionValue: item.destionation_optionValue,
                destionation_optionType: item.destionation_optionType,
                preCondition: item.preCondition,
                flag: item.flag
            };
        });

        const preconds: {
            preconds: Record<number, any>;
        } = {
            preconds: {},
        };
        this.tokenService.token.forEach((item, index) => {
            if (item.preCondition) {
                preconds.preconds[index] = { ...item.preConditionValue }
            }
        });

        const data = {
            initialData: {
                tokenName: this.initialService.arr[0],
                totalTokensAmount: this.initialService.arr[1],
                initialTokenPrice: this.initialService.arr[2],
                exchangeType: this.initialService.arr[3],
                tradingFunction: this.initialService.arr[4],
                duration: this.initialService.arr[5]
            },
            investmentRounds: investmentRounds,
            agents: agents,
            pools: {
                tables: {
                    poolTypes: poolTypes,
                    pools: pools
                }
            },
            vestingAndUnlocking: {
                tables: {
                    vesting: vesting,
                    unlocking: unlocking
                }
            },
            projectServices: {
                serviceTables: {
                    staking: staking,
                    farming: farming
                },
                curveTables: {
                    ...block,
                    staking: {
                        ...stakingServise
                    },
                    farming: {
                        ...farmingServise
                    }
                }
            },
            tokenCirculation: {
                tables: {
                    actions,
                    name: "actions",
                    ...preconds
                }
            },
            settings: {
                tactic: 'dfs',
                with_logger: 1,
                visited_type: 'equality',
                asm_preprocessor: 0,
                console_colors: 1,
                ignore_act: 0,
                print_env: 1,
                print_act: 1,
                message_interpretation: 'none',
                console_mode: 0,
                concrete2c: 1,
                concretize: 'none'
            }
        };
        return data;
    }

    saveDataToFile() {
        this.jsonString = JSON.stringify(this.genData());
        const blob = new Blob([this.jsonString], { type: 'application/json' });
        this.link = URL.createObjectURL(blob);
        URL.revokeObjectURL(URL.createObjectURL(blob));
    }

    generateReport() {
        this.loading = true;
        const pageData = this.genData();
        //this.jsonService.page_data = pageData;
        //if(this.jsonService.page_data) {
            //this.router.navigate(['/report']);
            //this.loading = false;
        //}
        this.requestService.getGraphData(pageData).subscribe((resp) => {
            if (!resp.error) {
                this.jsonService.charts_data = resp.message;
                if (Array.isArray(this.jsonService.charts_data)) {
                    this.jsonService.page_data = pageData; 
                    this.loading = false;
                    this.router.navigate(['/report']);
                    
                } else {
                    this.loading = false;
                }
            } else {
                this.loading = false;
                console.log(resp.message);
            }
        });
    }

    convertToAplan() {
        this.requestService.getAplan(this.genData()).subscribe((resp) => {
            if (!resp.error) {
                const zip = new JSZip();
                zip.file("project.behp", resp.message.beh);
                zip.file("project.act", resp.message.prot);
                zip.file("project.evt_descript", resp.message.evt_des);
                zip.file("project.env_descript", resp.message.env_des);
                zip.file("ims_req.ap", resp.message.ap);
                zip.generateAsync({ type: "blob" }).then((content: any) => {
                    saveAs(content, "model.zip");
                });
            }
        });
    }

}
