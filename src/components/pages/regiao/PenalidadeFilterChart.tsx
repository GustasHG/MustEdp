"use client"
import { Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { useState } from "react";

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const displayName = payload.name === "Todas" ? "Custo Total" : payload.name;
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {displayName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${displayName}`}</text>
        {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
};

export interface PieChatData {
  name: string;
  value: number;
  fill: string;
}

interface PenalidadeFilterChartProps {
  data: PieChatData[]
  onClick?: (data: any, index: number, e: React.MouseEvent<Element, MouseEvent>) => void
  selected?: string | null
}

export default function PenalidadeFilterChart(
  {
    data,
    onClick,
    selected
  }: PenalidadeFilterChartProps
) {
    const getIndex = (): number | undefined => {
      if (!selected) return undefined;
      for (let index = 0; index < data.length; index++) {
        if (data[index].name == selected) return index;
      }
    }
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(getIndex());
    const chartClickHandler = (data: any, index: number, e: React.MouseEvent<Element, MouseEvent>) => {
      setSelectedIndex(index);
      onClick && onClick(data, index, e);
    }
    return (
      <ResponsiveContainer
        height={300}
        width="100%"
        style={{
            fontSize: "14px"
        }}
      >
        <PieChart width={400} height={400}>
            <Pie
                activeIndex={selectedIndex}
                activeShape={renderActiveShape}
                data={data}
                cursor="pointer"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                // fill="#8884d8"
                dataKey="value"
                // onMouseEnter={onPieEnter}
                onClick={chartClickHandler}
            />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
}