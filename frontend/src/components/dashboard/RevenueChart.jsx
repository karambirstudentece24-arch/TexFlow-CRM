import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/analytics")
      .then((res) => res.json())
      .then((result) => {
        setData(result.monthlyRevenue);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="recent-orders">
      <h2>Revenue Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;