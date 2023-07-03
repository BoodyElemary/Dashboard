import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/models/product';
// import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardServiceService } from 'src/app/service/dashboard-service.service';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class DashboardPageComponent {
  chartData: any;
  storeInsightData: any;
  chartOptions: any;

  constructor(
    private dashbardService: DashboardServiceService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Check the user's role here
    const userRole = this.loginService.getRole(); // Replace with the actual logic to get the user's role

    if (userRole === 'admin') {
      this.dashbardService.getSingleStoreInsights().subscribe(
        (data: any) => {
          console.log(data);
          this.storeInsightData = data;
          this.initChart();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.dashbardService.getAllStoreInsights().subscribe(
        (data: any) => {
          console.log(data);
          this.storeInsightData = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const labels = this.storeInsightData?.monthlyRevenue.map(
      (item: any) => item.month
    );
    const data = this.storeInsightData?.monthlyRevenue.map(
      (item: any) => item.revenue
    );

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Monthly Revenue',
          data,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  // initChartSuper() {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue(
  //     '--text-color-secondary'
  //   );
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //   this.chartData = {
  //     labels: [],
  //     datasets: [],
  //   };

  //   this.storeInsightData.forEach((storeData: any) => {
  //     const storeLabels = storeData.monthlyRevenue.map(
  //       (item: any) => item.month
  //     );
  //     const storeDataValues = storeData.monthlyRevenue.map(
  //       (item: any) => item.revenue
  //     );

  //     this.chartData.labels = [...this.chartData.labels, ...storeLabels];

  //     this.chartData.datasets.push({
  //       label: `Store ${storeData.store}`,
  //       data: storeDataValues,
  //       fill: false,
  //       backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
  //       borderColor: documentStyle.getPropertyValue('--bluegray-700'),
  //       tension: 0.4,
  //     });
  //   });

  //   this.chartOptions = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: textColor,
  //         },
  //       },
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: textColorSecondary,
  //         },
  //         grid: {
  //           color: surfaceBorder,
  //           drawBorder: false,
  //         },
  //       },
  //       y: {
  //         ticks: {
  //           color: textColorSecondary,
  //         },
  //         grid: {
  //           color: surfaceBorder,
  //           drawBorder: false,
  //         },
  //       },
  //     },
  //   };
  // }
}
