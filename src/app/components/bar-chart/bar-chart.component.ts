import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

  interface Repo {
    stargazers_count: number;
    name: string;
    forks: number;
  }

  interface RepoData {
    label: string;
    value: number;
  }


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @Input() data: RepoData[] | null = null;
  public barChartLegend = true;
  public barChartPlugins = [];

   labels: string[] = [];
  values: number[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.labels = this.data.map((item) => item.label);
      this.values = this.data.map((item) => item.value);

      this.barChartData = {
        labels: this.labels,
        datasets: [{ data: this.values, label: 'Forked Repos' }],
      };

      console.log(this.data);
  }
}
}
