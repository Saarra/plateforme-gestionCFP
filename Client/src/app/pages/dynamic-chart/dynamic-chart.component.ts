import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from '../../services/Dashboard/dashboard.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes:  [{
        ticks: {
          beginAtZero: true
        }
      }] },
  };
  public barChartLabels: Label[] = [];
  public barChart2Labels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];public barChart2Data: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {
    this.dashboardService.inscriptionByFormation().then(resp=>{
      let labels =[];
      let data =[];
      resp.forEach(value => {
        labels.push(value.nomFormation.substring(0, 30));
        data.push(value.total);
      })
      this.barChartLabels= labels;
      this.barChartData = [ {
        data: data,
        label: 'Nombre d\'inscriptions'
      }];
    })
    this.dashboardService.formationsByYear().then(resp=>{
      let yearLabels =[];
      let yearData =[];
      resp.forEach(value => {
        yearLabels.push(value.year);
        yearData.push(value.total);
      })
      this.barChart2Labels= yearLabels;
      this.barChart2Data = [ {
        data: yearData,
        label: 'Nombre des formations'
      }];
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

}
