import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function TopProductsChart({ products }) {
  return (
    <div className="recent-orders">
      <h2>Top Selling Products</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={products}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="product" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="quantity"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopProductsChart;