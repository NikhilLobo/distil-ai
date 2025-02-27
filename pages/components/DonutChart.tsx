import React from "react";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const data = [
  { name: "Busy", value: 25, color: "#97A5B1", labelX: 220, labelY: 80 },
  { name: "Average", value: 50, color: "#A8CF45", labelX: 30, labelY: 130 },
  { name: "Quiet", value: 25, color: "#E65045", labelX: 220, labelY: 200 },
];

// ✅ Custom Label with Line
const renderCustomLabel = (props: any) => {
  const { cx, cy, outerRadius, name, color, value, midAngle } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  // Starting point: just outside the outer radius
  const startX = cx + (outerRadius + 1) * cos;
  const startY = cy + (outerRadius + 1) * sin;

  // Horizontal line: extend 30 units to right if cos>=0, left if cos<0
  const lineX2 = startX + (cos >= 0 ? 30 : -30);
  const lineY2 = startY;

  // Push the label further out on the left side
  const labelX = lineX2 + (cos >= 0 ? 25 : -30);
  const percentageY = lineY2 - 5; // Percentage text above the line
  const labelY = lineY2 + 10; // Label text below the line

  return (
    <>
      {/* Horizontal line from start to end */}
      <line
        x1={startX}
        y1={startY}
        x2={lineX2}
        y2={lineY2}
        stroke={color}
        strokeWidth={2}
      />

      <circle cx={lineX2} cy={lineY2} r={3} fill={color} />

      <text
        x={labelX}
        y={percentageY}
        fill={color}
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {value}%
      </text>

      <text
        x={labelX}
        y={labelY}
        fill={color}
        textAnchor="middle"
        fontSize={12}
      >
        {name.toLowerCase()}
      </text>
    </>
  );
};

const DonutChart = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box textAlign="center" sx={{ backgroundColor: "#F5F5F5", mt: 1 }}>
      <PieChart width={isMdScreen ? 650 : 375} height={isMdScreen ? 388 : 366}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={isMdScreen ? 85 : 60}
          outerRadius={isMdScreen ? 150 : 100}
          dataKey="value"
          label={renderCustomLabel} // ✅ Custom label with lines
          labelLine={false} // ✅ Hide default labels
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default DonutChart;
