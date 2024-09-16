"use client"
import { SummaryData } from '@/api/SimuladorAdapter/SummaryAdapter/SummaryData';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


interface SummaryChartProps {
    data: SummaryData[]
}

export default function SummaryChart(
    {
        data
    }: SummaryChartProps
) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 55,
                    bottom: 0,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="Ano" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ParcelaA" stackId="a" fill="#BECACC" />
                <Bar dataKey="ParcelaB" stackId="a" fill="#7C9599" />
                <Bar dataKey="CustoTotal" stackId="a" fill="#EDD5D3" />
                <Line type="monotone" dataKey="Contrato" stroke="#6D32FF" />
                <Line type="monotone" dataKey="Demanda" stroke="#28FF52" />
                <Line type="monotone" dataKey="Total" stroke="#0CD3F8" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
