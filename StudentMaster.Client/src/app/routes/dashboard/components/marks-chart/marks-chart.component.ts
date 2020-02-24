import {
  Component,
  OnInit,

  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';

import ApexCharts from 'apexcharts';
@Component({
  selector: 'app-marks-chart',
  templateUrl: './marks-chart.component.html',
  styleUrls: ['./marks-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarksChartComponent implements OnInit, OnDestroy {
  chart1 = null;
  data: any = null;

  constructor(
    private store: Store<IAppState>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
  }

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

  generateChart(series: any[], dates: any[]) {
    const chart = [
      {
        chart: {
          height: 350,
          type: 'scatter',
        },
        dataLabels: {
          enabled: true,
        },
        // stroke: {
        //   width: 10,
        // },
        series,
        xaxis: {
          type: 'datetime',
          categories: dates,
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
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

  }

  ngOnDestroy() {
    if (this.chart1) {
      this.chart1.destroy();
    }
  }

  chartDestroy() {
    document.getElementById('chart1').innerHTML = '';
  }
}
