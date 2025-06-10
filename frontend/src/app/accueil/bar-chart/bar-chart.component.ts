import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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
  ApexPlotOptions,
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
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
  public showChart = false;
  chartOptions: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeChart();
      this.showChart = true;
    }
  }


  private async initializeChart() {
    // Lazy load ApexCharts in browser only
    const ApexCharts = await import('apexcharts');
    this.chartOptions = {
      series: [
        { name: 'Mathématiques de base', data: [18, 50, 62, 100, 41, 65] },
        { name: 'Algèbre avancée', data: [30, 20, 35, 60, 50, 70] },
        { name: 'Fondamentaux de la géométrie', data: [50, 70, 55, 80, 45, 75] }
      ],
      chart: {
        type: 'bar',
        stacked: false,
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false }
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
      dataLabels: { enabled: false },
      stroke: { show: false },
      fill: { opacity: 1 },
      tooltip: {
        enabled: true,
        y: { formatter: (value: number) => `${value}%` },
        style: { fontFamily: 'Poppins' }
      },
      grid: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        padding: { top: -20, bottom: -8, left: 12, right: 12 }
      },
      yaxis: { show: true },
      markers: { size: 0 },
      colors: ['#b22222', '#313131', '#475569'],
      title: { text: '' },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusWhenStacked: 'end',
          columnWidth: '50%',
          horizontal: false,
          distributed: false
        }
      }
    };
  }
}