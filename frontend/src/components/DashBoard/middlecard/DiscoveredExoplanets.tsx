import { ExoplanetByMonth } from '@models/Exoplanet';
import { filterYearFromDiscoveredExoplanets, getMonthName } from '@utils/date';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props
{
    data: ExoplanetByMonth[] | undefined | null,
    month: number,
    year: number;
}
const CustomTooltip = ({ active, payload }: any) =>
{
    if (active && payload && payload.length > 0)
    {
        return (
            <div className="bg-white p-4 rounded-lg opacity-75">
                <p className="label">{`${getMonthName(payload[0].payload.month)}`}</p>
                <p className="intro">{`Exoplanetas descubiertos: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};
const DiscoveredExoplanets: React.FC<Props> = ({ data, month, year }) =>
{
    const [actualYearData, setActualYearData] = useState<ExoplanetByMonth[] | null>(filterYearFromDiscoveredExoplanets(data, year));
    const compareMonthPercentage = () =>
    {
        const percentage = (actualYearData![month].exoplanetsCount * 100) / actualYearData![month - 1].exoplanetsCount;
        return (percentage - 100).toFixed(2);
    };


    useEffect(() => setActualYearData(filterYearFromDiscoveredExoplanets(data, year)), [data]);
    return (

        <div className='w-[100%] md:w-[40%] md:mt-0 shadow-md rounded-lg bg-cards-color p-3 h-[450px]'>
            {actualYearData && actualYearData.length > 0 ? <>
                <div className='p-3'>
                    <h3 className='font-bold'>Discovered Exoplanets by month</h3>
                    <span>{compareMonthPercentage() + "% than last month"}</span>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={actualYearData} className="rounded-xl bg-color-bar-chart" margin={{ top: 30, right: 40, left: 0, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="5" vertical={false} />
                        <XAxis dataKey="month" stroke="var(--bg-color-bar-chart-axe)" tickLine={false} />
                        <YAxis axisLine={false} tickMargin={10} tickLine={false} stroke="var(--bg-color-bar-chart-axe)" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="exoplanetsCount" name="Discovered Exoplanets" fill="var(--bg-color)" barSize={10} radius={10} />
                    </BarChart>
                </ResponsiveContainer>
            </> : <p>Loading data</p>}
        </div>

    );
};

export default DiscoveredExoplanets;