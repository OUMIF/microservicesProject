import { Component } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexMarkers,
  ApexYAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  colors: string[];
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graphe',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.css']
})
export class GrapheComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Measurable stuff',
          data: [18, 50, 62, 100, 41, 65]
        },
        {
          name: 'Another metric',
          data: [30, 20, 35, 60, 50, 70]
        },
        {
          name: 'Yet another metric',
          data: [50, 70, 55, 80, 45, 75]
        }
      ],
      chart: {
        type: 'area',
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      colors: ['#ff7675', '#74b9ff', '#a29bfe'],
      dataLabels: { enabled: false },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ['Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec'],
        axisBorder: { show: false },
        labels: {
          style: {
            colors: '#a7a7a7',
            fontFamily: 'Poppins'
          }
        }
      },
      yaxis: {
        show: false
      },
      grid: {
        borderColor: 'rgba(0, 0, 0, 0)',
        padding: { top: -20, bottom: -8, left: 12, right: 12 }
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value: number) => `${value}K`
        },
        style: {
          fontFamily: 'Poppins'
        }
      },
      markers: {
        size: 0
      }
    };
  }
}
