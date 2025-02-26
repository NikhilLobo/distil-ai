import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { Box, Typography } from "@mui/material";

// ✅ Mock Data
const data = [
  { week: "-5 ", above: 0, below: 196 },
  { week: "-4 ", above: 45, below: 160 },
  { week: "-3 ", above: 35, below: 170 },
  { week: "-2 ", above: 60, below: 120 },
  { week: "-1 ", above: null, below: null },
  { week: "Current", above: null, below: null },
];

const TrackingChart = () => {
  return (
    <Box
      mt={0}
      sx={{ backgroundColor: "#F5F5F5", p: { xs: 1, md: 2 }, borderRadius: 2 }}
    >
      {/* ✅ Title */}
      <Typography variant="subtitle1" fontWeight="bold">
        Tracking to Expectation
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
        Based on these seasonal expectations it appears that
      </Typography>

      {/* ✅ Summary Section */}
      <Box display="flex" justifyContent="space-between" my={2}>
        <Typography variant="body2" sx={{ mx: 1 }}>
          <strong>120 Services</strong> are below expectations. <br />
          <span style={{ color: "#5A5A5A", fontWeight: "bold" }}>
            4% Improvement
          </span>
        </Typography>
        <Typography variant="body2">
          <strong>20 Services</strong> are above expectations. <br />
          <span style={{ color: "#5A5A5A", fontWeight: "bold" }}>
            4% Improvement
          </span>
        </Typography>
      </Box>

      {/* ✅ Table Section */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
          mb: 2,
        }}
      >
        <table width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ fontSize: "14px", fontWeight: "bold" }}>
              <th style={{ textAlign: "left", fontWeight: "bold" }}>Weeks</th>
              {data.map((d, i) => (
                <th
                  key={i}
                  style={{
                    padding: "8px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#5A5A5A",
                    fontWeight: d.week === "-2 Weeks" ? "bold" : "normal", // ✅ Bold Current Week
                  }}
                >
                  {d.week}
                </th>
              ))}
            </tr>
          </thead>
          <tr>
            <td colSpan={data.length + 1} style={{ padding: "0" }}>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#DCDCDC",
                  margin: "4px 0",
                }}
              />
            </td>
          </tr>
          <tbody>
            {/* ✅ Above Row */}
            <tr style={{ fontSize: "14px" }}>
              <td style={{ textAlign: "left", fontWeight: "bold" }}>Above</td>
              {data.map((d, i) => (
                <td
                  key={i}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    color: "#5A5A5A",
                  }}
                >
                  {d.above ?? "-"}
                </td>
              ))}
            </tr>

            {/* ✅ Horizontal Line */}
            <tr>
              <td colSpan={data.length + 1} style={{ padding: "0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#DCDCDC",
                    margin: "4px 0",
                  }}
                />
              </td>
            </tr>

            {/* ✅ Below Row */}
            <tr style={{ fontSize: "14px" }}>
              <td style={{ textAlign: "left", fontWeight: "bold" }}>Below</td>
              {data.map((d, i) => (
                <td
                  key={i}
                  style={{
                    textAlign: "center",
                    color: "#5A5A5A",
                  }}
                >
                  {d.below ?? "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Box>

      {/* ✅ Line Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {/* ✅ Y-Axis Added Here */}
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, 200]} // Adjust Y-axis range
            axisLine={true} // ✅ Ensure Y-axis line is visible
            tickLine={false} // Remove tick lines
            interval={0}
          />

          {/* ✅ Aligned Grid to X-Axis */}
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
          <CartesianGrid
            stroke="#DCDCDC"
            strokeWidth={1}
            vertical={true}
            horizontal={true}
          />

          <XAxis
            dataKey="week"
            tick={{ fontSize: 12 }}
            interval={0} // ✅ Show all X labels
          />
          <Tooltip />

          {/* ✅ Red Line (Below) */}
          <Line
            type="monotone"
            dataKey="below"
            stroke="#E65045"
            strokeWidth={2}
            dot={{ fill: "#E65045", r: 5 }}
          >
            <LabelList
              dataKey="below"
              position="right"
              content={({ x, y, value, index }) => {
                const isFirst = index === 0;
                const isLast = index === data.length - 3; // Adjust based on valid data points

                return (isFirst || isLast) && value ? (
                  <foreignObject x={x + 5} y={y - 10} width="80" height="25">
                    <Box
                      sx={{
                        backgroundColor: "#E65045",
                        color: "white",
                        fontSize: "12px",
                        // padding: "4px 10px",
                        margin: "7px",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      {value} Below
                    </Box>
                  </foreignObject>
                ) : null;
              }}
            />
          </Line>

          {/* ✅ Green Line (Above) */}
          <Line
            type="monotone"
            dataKey="above"
            stroke="#A8CF45"
            strokeWidth={2}
            dot={{ fill: "#A8CF45", r: 5 }}
          >
            <LabelList
              dataKey="above"
              position="right"
              content={({ x, y, value, index }) => {
                const isFirst = index === 0;
                const isLast = index === data.length - 3; // Adjust based on valid data points

                return (isFirst || isLast) && value ? (
                  <foreignObject x={x + 5} y={y - 10} width="80" height="25">
                    <Box
                      sx={{
                        backgroundColor: "#A8CF45",
                        color: "white",
                        fontSize: "12px",
                        margin: "2px",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      {value} Above
                    </Box>
                  </foreignObject>
                ) : null;
              }}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TrackingChart;
