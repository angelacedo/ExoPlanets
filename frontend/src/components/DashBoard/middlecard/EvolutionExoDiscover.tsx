import { ExoplanetByMonth } from '@models/Exoplanet';
import { filterYearFromDiscoveredExoplanets, getMonthName, getYearsFromDiscoveredExoplanets } from '@utils/date';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props
{
    data: ExoplanetByMonth[] | undefined | null,
    month: number;
    year: number;
}
const CustomTooltip = ({ active, payload }: any) =>
{
    if (active && payload && payload.length > 0)
    {
        return (
            <div className="bg-white p-4 rounded-lg opacity-75 border border-gray-400">
                <p className="label">{`${getMonthName(payload[0].payload.month)} de ${payload[0].payload.year}`}</p>
                <p className="intro">{`Exoplanetas descubiertos: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};
const EvolutionExoDiscover: React.FC<Props> = ({ data, month, year }) =>
{
    const [actualYearData, setActualYearData] = useState<ExoplanetByMonth[] | null>(filterYearFromDiscoveredExoplanets(data, year));

    useEffect(() => setActualYearData(filterYearFromDiscoveredExoplanets(data, year)), [data]);
    return (
        <div className='w-[100%] md:w-[59%] ml-[1%] md:mt-0 mt-[1%] shadow-md rounded-lg bg-cards-color p-3 h-[450px]'>
            {actualYearData && actualYearData.length > 0 ? <>
                <div className='flex justify-between p-3'>
                    <h3 className='font-bold'>Evolution of the discovered exoplanets</h3>
                    <select defaultValue={year} className='border rounded-lg p-1' onChange={(e) => setActualYearData(filterYearFromDiscoveredExoplanets(data, Number(e.currentTarget.value)))}>
                        {getYearsFromDiscoveredExoplanets(data, year).map(val => <option key={`opt-${val}`}>{val}</option>)}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart width={730} height={350} data={actualYearData}
                        margin={{ top: 30, right: 40, left: 0, bottom: 30 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--areachar-color)" />
                                <stop offset="100%" stopColor="#ffffff" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="5" vertical={false} />
                        <XAxis dataKey="month" stroke="var(--bg-color-bar-chart-axe)" tickLine={false} />
                        <YAxis axisLine={false} tickMargin={10} tickLine={false} stroke="var(--bg-color-bar-chart-axe)" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="exoplanetsCount" strokeWidth={3} stroke="var(--areachar-color)" fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer></> : <p>Loading data</p>}

        </div>

    );
};

export default EvolutionExoDiscover;