import { Component, AfterViewInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';
import { AgentModel, AgentService } from '../services/agent-service';
import { InvestmentService, IvestmentModel } from '../services/investment-service';
import { arrItem } from '../token/token.component';
import { PoolService } from '../services/pool-service';


@Component({
  selector: 'app-my-modal',
  templateUrl: 'my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent  implements AfterViewInit{
  public lineChart: any;

  public contain: any;
  public tokenAmount: any;
  public investmentRound: IvestmentModel [] = [new IvestmentModel( 'Round 1', 0 ,0, 0, 0, new arrItem(0, 'Round1', 'investmentRound'))];
  public agentsArr: AgentModel [] = [new AgentModel( 'Agent ', '%', 0, new arrItem(0, 'Agent 1', "agent"))];
  public poolArr: any;
  public width: any;
  public size: any = 18 ;
  public rgb = 255;
  public allPercents = 100;

  public agents: any [] = [];
  public percents: any [] = [];
  public labelsData: string[] = [];
  public dataPoints: number[] = [];
  public background: string[] = [];
  public legendArr: Legend [] = [];

  constructor(private agentService: AgentService,
              private poolService: PoolService,
              private investmentService: InvestmentService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contain = data.contain;
    // this.tokenAmount = data.tokenAmount;
    // this.investmentRound = data.investmentArr;
    // this.agentsArr = data.agentsArr;
    // this.poolArr = data.poolArr;
    // this.labelsData = data.labels;
    // this.dataPoints = data.dataLabels;
    // this.background = data.background;
   }

   drawChart() {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    this.lineChart = new Chart('lineChart', {
      type: 'doughnut',
      data: {
        labels: this.labelsData,
        datasets: [{
          data: this.dataPoints,
          borderColor: 'rgba(245, 245, 245, 1)',
          backgroundColor: this.background,
        }    
      ]
      },
      options: {
        responsive: true,
        aspectRatio: 7/3,
        layout: {
          padding: {
              left: 1,
              right: 1
          }
      },
        plugins: {
          
          legend: {
            // display: false,
            maxHeight: 400,
            maxWidth: 700,
            position: 'left',
            labels: {
              color: "white",
              font: {
                  size: this.size
              }
          }
          }
        }
      }
    });
  }
  
  ngOnInit() {
    this.width = window.innerWidth;
    if (this.width >= 2500) {
      this.size = 30;
    }
    this.legendArr.length = 0;
    this.rgb = 255;
    this.investmentService.arr.forEach(element => {
      if (element.investorShare > 0) {
        this.rgb -= 15;
        this.labelsData.push(element.roundTitle + ' - ' + element.investorShare.toFixed(2) + '%');
        this.dataPoints.push(element.investorShare.toFixed(2));
        this.background.push("rgba(" + (this.rgb) + ',' + (this.rgb) + ',' + (this.rgb) + ', 1)');
        this.allPercents -= element.investorShare; 
      }
    });
    this.agentService.arr.forEach(element => {
      if (element.agentShare > 0) {
        this.rgb -= 15;
        this.labelsData.push(element.agentName + ' - ' + element.agentShare.toFixed(2) + '%');
        this.dataPoints.push(element.agentShare.toFixed(2));
        this.background.push("rgba(" + (this.rgb) + ',' + (this.rgb) + ',' + (this.rgb) + ', 1)');
        this.allPercents -= element.agentShare;
      }
    });
    this.poolService.arrBlock.forEach(element => {
      if (element.poolShare > 0) {
        this.rgb -= 15;
        this.labelsData.push(element.poolTitle + ' - ' + element.poolShare.toFixed(2) + '%');
        this.dataPoints.push(<number><any>element.poolShare.toFixed(2));
        this.background.push("rgba(" + (this.rgb) + ',' + (this.rgb) + ',' + (this.rgb) + ', 1)');
        this.allPercents -= element.poolShare;
      }
    });
    this.labelsData.push("surplus" + ' - ' + this.allPercents.toFixed(2) + '%');
    this.dataPoints.push(<number><any>this.allPercents.toFixed(2));
    this.background.push("rgba(" + (this.rgb) + ',' + (this.rgb) + ',' + (this.rgb) + ', 0.2)');
  }

  myModalCl() {
    this.dialog.closeAll();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

}

export class Legend {
  public color: string = '';
  public legendName: string = '';
  public legendValue: number = 0 ;


  constructor(color: string, legendName: string, legendValue: number) {
      this.color = color;
      this.legendName = legendName;
      this.legendValue = legendValue;
  }
}