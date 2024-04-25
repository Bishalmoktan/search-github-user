import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  @Input() data: Record<
    string,
    { label: string; value: number; stars: number }
  > | null = null;
  public pieChartOptions: ChartOptions = {
    responsive: false,
  };

  public pieChartLabels: string[] = [];
  public pieChartDataSets: ChartDataset[] = [];
  public pieChartLegend = true;
  public pieChartPlugins: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.pieChartLabels = Object.values(this.data).map((item) => item.label);
      this.pieChartDataSets = [
        {
          data: Object.values(this.data).map((item) => item.value),
        },
      ];
    }
  }
}
