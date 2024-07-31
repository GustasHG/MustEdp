import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DemandaChartProps {
    data?: any[]
}

export default function DemandaChart(
    {
        data
    }: DemandaChartProps
) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Data" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="Demanda" stroke="#0CD3F8" />
                <Line yAxisId="right" type="monotone" dataKey="Piu" stroke="#6D32FF" />
                <Line yAxisId="right" type="monotone" dataKey="Pis" stroke="#28FF52" />
                <Line yAxisId="right" type="monotone" dataKey="Add" stroke="#7C9599" />
                <Line yAxisId="right" type="monotone" dataKey="Eust" stroke="#212E3E" />
                </LineChart>
        </ResponsiveContainer>
    );
}