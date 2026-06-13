'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

type MonthlySpendSummaryProps = {
  monthlySpend: number;
  yearlySpend: number;
  currentMonth: string;
};

export default function MonthlySpendChart({
  monthlySpend,
  yearlySpend,
  currentMonth,
}: MonthlySpendSummaryProps) {
  const remainingSpend =
    yearlySpend - monthlySpend > 0 ? yearlySpend - monthlySpend : 0;

  const data: ChartData<'doughnut'> = {
    labels: ['Monthly Spend', 'Remaining Budget'],
    datasets: [
      {
        data: [monthlySpend, remainingSpend],
        backgroundColor: ['#17C6FA', '#000000'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) =>
            `${context.label}: ₹${context.parsed}`,
        },
      },
    },
  };

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-sm sm:max-w-md
        bg-white
        rounded-2xl
        shadow-sm
        p-4 sm:p-5
        mb-24
      "
    >
      {/* Header */}
      <div className="mb-2 text-center">
        <h2 className="text-base sm:text-lg font-semibold">
          Monthly Expenses
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          {currentMonth}
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-56 sm:h-64">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-bold">
            ₹{monthlySpend}
          </span>
          <span className="text-xs sm:text-sm text-gray-600">
            Spent
          </span>
        </div>

        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
