import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.css',
})
export class DoughnutComponent {
  @Input() data: { label: string; value: number }[] | null = null;

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor() {}

  ngOnChanges(): void {
    if (this.data) {
      this.doughnutChartLabels = this.data.map((item) => item.label);
      this.doughnutChartDatasets = [
        {
          data: this.data.map((item) => item.value),
        },
      ];
    }
  }
}
