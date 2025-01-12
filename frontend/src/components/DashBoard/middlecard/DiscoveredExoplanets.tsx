import Loader from '@/components/Loader';
import { ExoplanetByMonth } from '@/models/Global/Exoplanet';
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
            <div className="bg-white p-4 rounded-lg opacity-75 border border-gray-400">
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
        const actualMonthExoCount = actualYearData![month] ? actualYearData![month].exoplanetsCount : null;
        const prevMonthExoCount = actualYearData![month - 1] ? actualYearData![month - 1].exoplanetsCount : null;
        console.log(actualMonthExoCount, prevMonthExoCount);
        let percentage: number | null = 0;

        if (actualMonthExoCount !== null && actualMonthExoCount !== undefined && prevMonthExoCount !== null && prevMonthExoCount !== undefined)
            if (actualMonthExoCount >= prevMonthExoCount)
                percentage = ((Number(actualMonthExoCount) - Number(prevMonthExoCount)) / Number(prevMonthExoCount)) * 100;
            else
                percentage = -((Number(actualMonthExoCount) - Number(prevMonthExoCount)) / Number(prevMonthExoCount)) * 100;
        else
            percentage = null;

        if (percentage != null && Number(percentage) >= 0)
            return <p><span className='text-green-600'> {(percentage).toFixed(2)}</span>% less than last month</p>;
        else if (percentage != null && Number(percentage) < 0)
            return <p><span className='text-red-600'> {(percentage).toFixed(2)}</span>% more than last month</p>;
        else
            return null;
    };


    useEffect(() => setActualYearData(filterYearFromDiscoveredExoplanets(data, year)), [data]);
    return (

        <div className='w-[100%] md:w-[40%] shadow-md rounded-lg bg-[var(--generic-text-color)] p-3 h-[450px]'>
            {actualYearData ? <>
                <div className='p-3 md:px-0 py-1'>
                    <h3 className='font-bold'>Discovered Exoplanets by month</h3>
                    {compareMonthPercentage() != null ? compareMonthPercentage() : null}
                </div>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={actualYearData} className="rounded-xl" margin={{ top: 30, right: 40, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="5" vertical={false} color=''/>
                        <XAxis dataKey="month" stroke="var(--color-axe)" tickLine={false} />
                        <YAxis axisLine={false} tickMargin={10} tickLine={false} stroke="var(--color-axe)" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="exoplanetsCount" name="Discovered Exoplanets" fill="var(--accent-color)" barSize={10} radius={10} />
                    </BarChart>
                </ResponsiveContainer>
            </> : <div className='flex justify-center items-center h-full'>{Loader(true, 50)}</div>
            }
        </div>

    );
};

export default DiscoveredExoplanets;