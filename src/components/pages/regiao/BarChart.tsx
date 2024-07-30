"use client"
import { Contract } from '@/api/ContractAdapter/Contract';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface PenalidadeBarChartProps {
  data: Contract[]
}

export default function PenalidadeBarChart (
  {
    data
  }: PenalidadeBarChartProps
) {
  console.log(data)
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
        <Bar dataKey="Piu" stackId="a" fill="#0CD3F8" />
        <Bar dataKey="Pis" stackId="a" fill="#225E66" />
        <Bar dataKey="Add" stackId="a" fill="#263CC8" />
        <Bar dataKey="Eust" stackId="a" fill="#6D32FF" />
        <Bar dataKey="Total" stackId="a" fill="#28FF52" />
        </BarChart>
    </ResponsiveContainer>
  );
}