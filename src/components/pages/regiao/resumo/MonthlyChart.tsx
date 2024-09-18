"use client"
import { ParcelaAB } from '@/api/SimuladorAdapter/ParcelaABAdapter/ParcelaAB';
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
  Brush,
} from 'recharts';


interface MonthlyChartProps {
    data: ParcelaAB[]
}

export default function MonthlyChart(
    {
        data
    }: MonthlyChartProps
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
                <XAxis dataKey="Data" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend style={{ marginTop: "10px" }} />
                <Bar dataKey="ParcelaA" stackId="a" fill="#BECACC" />
                <Bar dataKey="ParcelaB" stackId="a" fill="#7C9599" />
                <Bar dataKey="CustoTotal" stackId="a" fill="#EDD5D3" />
                <Line type="monotone" dot={false} dataKey="Contrato" stroke="#6D32FF" strokeWidth={2} />
                <Line type="monotone" dot={false} dataKey="Demanda" stroke="#28FF52" strokeWidth={2} />
                <Line type="monotone" dot={false} dataKey="Total" stroke="#0CD3F8" strokeWidth={2} />
                <Brush  dataKey="Data" height={20} stroke="#212E3E" style={{ marginTop: "15px", marginBottom: "20px", paddingTop: "10px" }}  />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
