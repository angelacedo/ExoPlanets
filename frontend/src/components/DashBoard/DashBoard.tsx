import { Exoplanet, ExoplanetByMonth } from '@/models/Exoplanet';
import { TopCards } from '@/models/TopCards';
import '@api/Exoplanets';
import { getExoplanets, getExoplanetsByMonth, getNumberOfClosestPlanets, getNumberOfExoplanets } from '@api/Exoplanets';
import { useEffect, useState } from "react";
import { IoEarth, IoEye, IoHeart, IoStar } from "react-icons/io5";
import DiscoveredExoplanets from './middlecard/DiscoveredExoplanets';
import EvolutionExoDiscover from './middlecard/EvolutionExoDiscover';
import LastExoplanetsTable from './middlecard/LastestExoplanets';
import TopCard from "./topcard/TopCard";

const DashBoard = () =>
{
    const [topCardsValues, setTopCardsValues] = useState<TopCards>({
        closestExoplanetsNumber: null,
        discoveredExoplanetsNumber: null,
        discoveredExoplanetsNumberThisYear: null,
        habitablePlanetsNumber: null
    });
    const [exoplanetsByMonth, setExoplanetsByMonth] = useState<ExoplanetByMonth[] | null>();
    const [lastestExoplanets, setLastestExoplanets] = useState<Exoplanet[]>([]);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    useEffect(() =>
    {
        getNumberOfExoplanets(null).then(async res =>
        {
            setTopCardsValues(prevState => ({
                ...prevState,
                discoveredExoplanetsNumber: res
            }));
        });

        getNumberOfClosestPlanets(null).then(async res =>
        {
            setTopCardsValues(prevState => ({
                ...prevState,
                closestExoplanetsNumber: res
            }));
        });

        getNumberOfExoplanets(year).then(async res =>
        {
            setTopCardsValues(prevState => ({
                ...prevState,
                discoveredExoplanetsNumberThisYear: res
            }));
        });

        getExoplanetsByMonth(null).then(res =>
        {
            setExoplanetsByMonth(
                res.map(({ year, month, exoplanetscount }: any) => ({
                    year,
                    month,
                    exoplanetsCount: exoplanetscount
                }
                ))
            );
        });
        getExoplanets(10).then((res: Exoplanet[]) =>
        {
            res.sort((a, b) => new Date(a.disc_pubdate).getTime() - new Date(b.disc_pubdate).getTime()).reverse();
            setLastestExoplanets(res);
        });
    }, []);

    return (
        <div className='my-3 mx-5'>
            <section className="flex flex-wrap sm:flex-row sm:flex-nowrap justify-center items-center lg:max-w-[80%] lg:m-auto">
                <TopCard title={"Discovered Exoplanets"} data={topCardsValues.discoveredExoplanetsNumber || 0} icon={<IoEarth width={15} color="var(--generic-text-color)" />} />
                <TopCard title={`Dicovered Exoplanets (${year})`} data={topCardsValues.discoveredExoplanetsNumberThisYear || 0} icon={<IoStar width={15} color="var(--generic-text-color)" />} />
                <TopCard title={"Closest Exoplanets"} data={topCardsValues.closestExoplanetsNumber || 0} icon={<IoEye width={15} color="var(--generic-text-color)" />} />
                <TopCard title={"Habitable Planets"} data={1000} icon={<IoHeart width={15} color="var(--generic-text-color)" />} />
            </section>
            <section>
                <div className='flex flex-wrap sm:flex-row justify-center items-center lg:max-w-[80%] mx-auto my-[1%] p-2'>
                    <DiscoveredExoplanets data={exoplanetsByMonth} month={month} year={year} />
                    <EvolutionExoDiscover data={exoplanetsByMonth} month={month} year={year} />
                </div>
                <div className='lg:max-w-[80%] mx-auto p-2'>
                    <LastExoplanetsTable data={lastestExoplanets} />
                </div>
            </section>
        </div>



    );
};



export default DashBoard;