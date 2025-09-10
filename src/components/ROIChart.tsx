// import { type FC} from "react";
import { forwardRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface ROIChartProps {
  data: { label: string; value: number }[];
}

const ROIChart = forwardRef<HTMLDivElement | null, ROIChartProps>(
  ({ data }, ref) => (
    <div ref={ref} className="h-64 mt-4 bg-white p-2 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
);

ROIChart.displayName = "ROIChart";

export default ROIChart;
