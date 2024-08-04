"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

interface PenalidadeBarChartProps {
  data: PenalidadeBarChartData[]
}

export interface PenalidadeBarChartData {
  TipoContrato: string,
  Contrato?: number,
  Piu?: number,
  Pis?: number,
  Add?: number,
  Eust?: number,
  Id: number
}

const RenderCustomizedLabel = (
  { x, y, width, height, value }: any
) => {
  const sqrHeight = 20;
  const sqrWidth = 40;
  return (
    <>
    {
      height - sqrHeight >= 0 && <g>
        <rect
          x={x + width / 2 - sqrWidth / 2}
          y={y + height / 2 - sqrHeight / 2}
          width={sqrWidth}
          height={sqrHeight}
          fill="transparent"
        />
        <text
          x={x + width / 2}
          y={y + height / 2}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontWeight: "bold" }}
        >
          {parseFloat(value).toFixed(2)}
        </text>
      </g>
    }
    </>
  );
};

export default function PenalidadeBarChart (
  {
    data
  }: PenalidadeBarChartProps
) {
  return (
    <ResponsiveContainer width="100%" height="100%" style={{ float: "left" }}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis angle={0} dataKey="TipoContrato" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Eust" stackId="a" fill="#212E3E">
          <LabelList dataKey="Eust" fill='#000000' content={RenderCustomizedLabel} />
        </Bar>
        <Bar dataKey="Add" stackId="a" fill="#6D32FF">
          <LabelList dataKey="Add" fill='#000000' content={RenderCustomizedLabel} />
        </Bar>
        <Bar dataKey="Piu" stackId="a" fill="#E32C2C">
          <LabelList dataKey="Piu" fill='#000000' content={RenderCustomizedLabel} />
        </Bar>
        <Bar dataKey="Pis" stackId="a" fill="#28FF52">
          <LabelList dataKey="Pis" fill='#000000' content={RenderCustomizedLabel} />
        </Bar>
        </BarChart>
    </ResponsiveContainer>
  );
}