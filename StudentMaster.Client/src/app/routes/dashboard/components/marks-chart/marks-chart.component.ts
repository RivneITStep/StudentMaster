import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { GetMarks } from '@core/redux/actions/marks.actions';

import ApexCharts from 'apexcharts';
@Component({
  selector: 'app-marks-chart',
  templateUrl: './marks-chart.component.html',
  styleUrls: ['./marks-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarksChartComponent implements OnInit, AfterViewInit, OnDestroy {
  chart1 = null;
  data: any = null;
  constructor(
    private store: Store<IAppState>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}
  // private data: any = null;

  ngOnInit() {
    this.store.select('marks').subscribe(x => {
      if (x.marksForChart != null && x.marksForChart !== undefined) {
        if (x.marksForChart.marks !== null) {
          this.ngZone.runOutsideAngular(() =>
            this.initChart(x.marksForChart.marks, x.marksForChart.dates)
          );
        }
      }
    });
  }
  ngAfterViewInit(): void {
    // let chart1 = null;
    // this.store.select('marks').subscribe(x => {
    //   // this.data = x.marksForChart;
    //   this.chartDestroy();
    //   chart1 = this.genChart1(x.marksForChart);
    // });
    // NOTE:
    // this.settings.notice.subscribe(res => {
    //   chart1.forceFit();
    // });
  }

  generateChart(series: any[], dates: any[]) {
    const chart = [
      {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 10,
        },
        series: series,
        xaxis: {
          type: 'datetime',
          categories: dates,
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
      },
    ];

    return chart;
  }
  initChart(siries: any, dates: any): any {
    this.chartDestroy();
    const options = this.generateChart([...siries], [...dates]);
    this.chart1 = new ApexCharts(document.querySelector('#chart1'), options[0]);
    this.chart1.render();
    // this.chart1 = this.generateChart();
  }

  ngOnDestroy() {
    if (this.chart1) {
      this.chart1.destroy();
    }
  }
  chartDestroy() {
    document.getElementById('chart1').innerHTML = '';
  }

  // G2 chart

  // genChart1(data) {
  //   const chart = new G2.Chart({
  //     container: 'chart1',
  //     forceFit: true,
  //     height: 300,
  //     padding: [20, 20, 80, 50],
  //   });
  //   chart.source(data, {
  //     date: {
  //       alias: '日期',
  //       type: 'time',
  //       mask: 'MM-DD',
  //     },
  //   });
  //   chart.tooltip({
  //     crosshairs: {
  //       type: 'line',
  //     },
  //   });
  //   chart.axis('count', {
  //     label: {
  //       formatter: function formatter(val) {
  //         return val;
  //       },
  //     },
  //   });
  //   chart
  //     .line()
  //     .position('date*count')
  //     .color('indicator');
  //   chart
  //     .point()
  //     .position('date*count')
  //     .color('indicator')
  //     .size(10)
  //     .shape('circle')
  //     .opacity(0.9)
  //     .style({
  //       stroke: '#fff',
  //       lineWidth: 1,
  //     });
  //   chart.render();

  //   return chart;
  // }
}
