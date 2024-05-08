import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { JsonService } from 'src/app/services/json-service';
import Chart from 'chart.js/auto';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { testData } from './../utils/testData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export interface initialData {
    tokenName: string;
    totalTokensAmount: number;
    initialTokenPrice: number;
    duration: number;
}

export interface Distribution {
    name: string;
    share: number;
}

export interface Unlocking {
    start: number;
    end: number;
    init: number;
    name: string;
}

export interface Vesting {
    start: number;
    end: number;
    coef: number;
    name: string;
}

export interface ProjServices {
    start: number;
    end: number;
    minSales: number;
    maxSales: number;
    number: number;
    algorithm: string;
}

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})



export class ReportComponent implements OnInit, AfterViewInit {
    initialTableDisplayedColumns: string[] = ['tokenName', 'totalTokensAmount', 'initialTokenPrice', 'duration'];
    roundDistributionDisplayedColumns: string[] = ['source_name', 'investorShare'];
    agentDistributionDisplayedColumns: string[] = ['agentName', 'agentShare'];
    poolDistributionDisplayedColumns: string[] = ['poolTitle', 'poolShare'];
    unlockDisplayedColumns: string[] = ['agent_optionValue', 'startUnlocking', 'endUnlocking', 'initialUnlocking'];
    vestingDisplayedColumns: string[] = ['agentName', 'startVesting', 'endVesting', 'vestingCoefficient'];
    servicesDisplayedColumns: string[] = ['number', 'startSales', 'endSales', 'minSales', 'maxSales', 'algorithm'];

    public initialTableSource: initialData[] = [];
    public roundDistributionTableSource: Distribution[] = [];
    public agentDistributionTableSource: Distribution[] = [];
    public poolDistributionTableSource: Distribution[] = [];
    public unlockTableSource: Unlocking[] = [];
    public vestingTableSource: Vesting[] = [];
    public projServicesData: any[] = [];

    public itdChart: any; //Initial Token Distribution chart
    public unlockingChart: any;
    public incomeChart: any;
    public tokenPriceChart: any;
    public liquidityChart: any;

    public handset: boolean = false;
    public unlockingFlag: boolean = false;
    public incomesFlag: boolean = false;
    public vestongFlag: boolean = false;
    public tokenPriceFlag: boolean = false;
    public liquidityFlag: boolean = false;
    public genproc: boolean = true;

    public unlockingChartValues: any[] = [];
    public incomesChartValue: any[] = [];
    public tokenPriceChartValue: any[] = [];
    public liquidityChartValue: any[] = [];

    public link: any;
    loading: boolean = false;
    public colors = [
        '#62C1C1',
        '#92C348',
        '#F86D67',
        '#FFD700',
        '#5F9EA0',
        '#FFA07A',
        '#C0C0C0',
        '#FF69B4',
        '#B0E0E6',
        '#20B2AA',
        '#8A2BE2',
        '#00FF7F',
        '#ADFF2F',
        '#DDA0DD',
        '#FF4500'
    ];
    @ViewChild('chardContainer') chardContainer: any;
    constructor(private resp: BreakpointObserver, private jsonService: JsonService) {
        this.loading = true;
        this.initialTableSource.push({
            tokenName: jsonService.page_data.initialData.tokenName,
            totalTokensAmount: jsonService.page_data.initialData.totalTokensAmount,
            initialTokenPrice: jsonService.page_data.initialData.initialTokenPrice,
            duration: jsonService.page_data.initialData.duration
        });

        const invescmentRounds = this.jsonService.page_data.investmentRounds.rows;
        let rowKeys = Object.keys(invescmentRounds);
        rowKeys.forEach((key) => {
            const elem = invescmentRounds[key];
            this.roundDistributionTableSource.push({ name: elem.source_name, share: elem.investorShare });
        });

        const agents = this.jsonService.page_data.agents.rows;
        rowKeys = Object.keys(agents);
        rowKeys.forEach((key) => {
            const elem = agents[key];
            this.agentDistributionTableSource.push({ name: elem.agentName, share: elem.agentShare });
        });

        const pools = this.jsonService.page_data.pools.tables.pools.rows;
        rowKeys = Object.keys(pools);
        rowKeys.forEach((key) => {
            const elem = pools[key];
            this.poolDistributionTableSource.push({ name: elem.poolTitle, share: elem.poolShare });
        });

        const unlocking = this.jsonService.page_data.vestingAndUnlocking.tables.unlocking.rows;
        rowKeys = Object.keys(unlocking);
        if (rowKeys.length > 0) {
            this.unlockingFlag = true;
        }
        rowKeys.forEach((key) => {
            const elem = unlocking[key];
            this.unlockTableSource.push({ name: elem.agent_optionValue, start: elem.startUnlocking, end: elem.endUnlocking, init: elem.initialUnlocking });
        });

        const vesting = this.jsonService.page_data.vestingAndUnlocking.tables.vesting.rows;
        rowKeys = Object.keys(vesting);
        if (rowKeys.length > 0) {
            this.vestongFlag = true;
        }
        rowKeys.forEach((key) => {
            const elem = vesting[key];
            this.vestingTableSource.push({ name: elem.agentName, start: elem.startVesting, end: elem.endVesting, coef: elem.vestingCoefficient });
        });

        const curve = this.jsonService.page_data.projectServices.curveTables;
        let curmeTmp: any = {
            name: '',
            data: []
        }
        let curveDataTmp: any[] = [];
        rowKeys = Object.keys(curve);
        rowKeys.forEach((key) => {
            curmeTmp = {
                name: '',
                data: []
            };
            curveDataTmp = [];
            const curveElem = curve[key];
            let curveRowKeys = Object.keys(curveElem.rows);
            curveRowKeys.forEach((curvkey) => {
                const elem = curveElem.rows[curvkey];
                curveDataTmp.push({ number: elem.curveNumber, start: elem.salesStart, end: elem.salesEnd, minSales: elem.salesMin, maxSales: elem.salesMax, algorithm: elem.chooseAlgorithm });
            });
            curmeTmp.name = curveElem.name.charAt(0).toUpperCase() + curveElem.name.slice(1);
            curmeTmp.data = curveDataTmp;
            this.projServicesData.push(curmeTmp);
            this.incomesFlag = true;
        });

        if (jsonService.charts_data) {
            jsonService.charts_data.forEach((element: any) => {
                if (element.action == 'printUnlocking' && this.unlockingFlag) {
                    this.unlockingChartValues = element.values;
                }

                if (element.action == 'printIncomes' && this.incomesFlag) {
                    this.incomesChartValue = element.values;
                }

                if (element.action == 'printTokenPrice') {
                    this.tokenPriceFlag = true;
                    this.tokenPriceChartValue = element.values;
                }

                if (element.action == 'printLiquidity') {
                    this.liquidityFlag = true;
                    this.liquidityChartValue = element.values;
                }
            })
        } else {
            // its tmp things
            this.tokenPriceFlag = true;
            this.liquidityFlag = true;
            this.unlockingChartValues = testData.values;
            this.incomesChartValue = testData.values;
            this.tokenPriceChartValue = testData.values;
            this.liquidityChartValue = testData.values;
        }

        this.resp.observe(Breakpoints.HandsetPortrait)
            .subscribe(result => {
                this.handset = false;
                if (result.matches) {
                    this.handset = true;
                }
            });


    }

    ngOnInit(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    ngAfterViewInit() {
        this.createChart();
        this.loading = false;
    }

    async geenratePDF() {
        this.loading = true;
        this.genproc = false;
        let doc = new jsPDF();
        const report = document.getElementById('report')
        if (report) {
            await html2canvas(report).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 190;
                const pageHeight = 290;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;
                doc.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight + 25);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 25);
                    heightLeft -= pageHeight;
                }
                doc.save('Tokenomics Modelling Report.pdf');
            });
        }
        this.loading = false;
        this.genproc = true;
    }

    calculateValForChart(data: any) {
        const rawUnlData: any = {};
        data.forEach((obj: any) => {
            for (const key in obj) {
                if (rawUnlData[key] === undefined) {
                    rawUnlData[key] = [];
                }
                if (typeof obj[key] === 'string') {
                    let str = obj[key];
                    str = str.replace(',', '.');
                    const numb = parseFloat(str);
                    if (!isNaN(numb)) {
                        rawUnlData[key].push(numb);
                    } else {
                        console.log('tatka');
                        rawUnlData[key].push(rawUnlData[key][rawUnlData[key].length - 1 || 0]);
                    }
                } else {
                    rawUnlData[key].push(obj[key]);
                }

            }
        });
        const outputArray = [];
        let montsData = [];
        for (const key in rawUnlData) {
            const label = key;
            if (label == 'month') {
                montsData = rawUnlData[key];
            } else {
                const data = rawUnlData[key];
                const color: any = this.colors[outputArray.length % this.colors.length];

                const dataObject = {
                    label: label,
                    data: data,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    spanGaps: true
                };

                outputArray.push(dataObject);
            }
        }
        return [outputArray, montsData];
    }

    generateLineChart(data: any, canvasID: string) {
        return new Chart(canvasID, {
            type: 'line',
            data: {
                labels: data[1],
                datasets: data[0]
            },
            options: {
                aspectRatio: 2,
                responsive: true,
            }
        });
    }

    createChart() {
        const invescmentRounds = this.jsonService.page_data.investmentRounds.rows;
        const pools = this.jsonService.page_data.pools.tables.pools.rows;
        const agents = this.jsonService.page_data.agents.rows;
        const itdChartData = [];
        let tmp = 0;
        let rowKeys = Object.keys(invescmentRounds);
        rowKeys.forEach((key) => {
            const elem = invescmentRounds[key];
            tmp += elem.investorShare;
        });
        itdChartData.push(tmp);

        tmp = 0;
        rowKeys = Object.keys(pools);
        rowKeys.forEach((key) => {
            const elem = pools[key];
            tmp += elem.poolShare;
        });
        itdChartData.push(tmp);

        tmp = 0;
        rowKeys = Object.keys(agents);
        rowKeys.forEach((key) => {
            const elem = agents[key];
            tmp += elem.agentShare;
        });

        itdChartData.push(tmp);
        var chartwidth = this.chardContainer.nativeElement.offsetWidth;
        let borderWidth = 0
        let hand = false;
        let aspect = 4
        if (this.handset == true) {
            hand = true;
            borderWidth = 3;
            aspect = 2
        } else {
            borderWidth = Math.round(chartwidth / 180);
        }
        this.itdChart = new Chart("PieChart", {
            type: 'pie',
            data: {
                labels: ['Investment Rounds', 'Pools', 'Agents'],
                datasets: [{
                    label: 'Percentage of the total tokens amount',
                    data: itdChartData,
                    backgroundColor: [
                        '#CC7B38',
                        '#F79646',
                        '#FAC3A8',
                    ],
                    borderColor: 'white',
                    hoverOffset: 4
                }],
            },
            options: {
                responsive: true,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: function (context) {
                                if (hand == true) {
                                    return { size: 10 };
                                }
                                var width = context.chart.width;
                                var size = Math.round(width / 20);

                                return {
                                    //weight: 'bold',
                                    size: size
                                };
                            }
                        }
                    }
                }
            }
        });

        if (this.unlockingFlag) {
            const result = this.calculateValForChart(this.unlockingChartValues);
            this.unlockingChartValues = result;
            this.unlockingChart = this.generateLineChart(result, 'UnlockingChart');
        }

        if (this.incomesFlag) {
            const result = this.calculateValForChart(this.incomesChartValue);
            this.incomesChartValue = result;
            this.incomeChart = this.generateLineChart(result, 'IncomesChart');
        }

        if (this.tokenPriceFlag) {
            const result = this.calculateValForChart(this.tokenPriceChartValue);
            this.tokenPriceChartValue = result;
            this.tokenPriceChart = this.generateLineChart(result, 'TokenPriceChart');
        }

        if (this.liquidityFlag) {
            const result = this.calculateValForChart(this.liquidityChartValue);
            this.liquidityChartValue = result;
            this.liquidityChart = this.generateLineChart(result, 'LiquidityPriceChart');
        }

    }
}
