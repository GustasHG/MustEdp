"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PenalidadeBarChartProps {
  data: PenalidadeBarChartData[]
}

export interface PenalidadeBarChartData {
  TipoContrato: string,
  Piu?: number,
  Pis?: number,
  Add?: number,
  Eust?: number,
}

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
        <XAxis dataKey="TipoContrato" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Piu" stackId="a" fill="#6D32FF" />
        <Bar dataKey="Pis" stackId="a" fill="#28FF52" />
        <Bar dataKey="Add" stackId="a" fill="#7C9599" />
        <Bar dataKey="Eust" stackId="a" fill="#212E3E" />
        </BarChart>
    </ResponsiveContainer>
  );
}