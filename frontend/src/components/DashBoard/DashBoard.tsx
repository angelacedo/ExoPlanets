import { ExoplanetByMonth } from '@/models/Exoplanet';
import { TopCards } from '@/models/TopCards';
import '@api/Exoplanets';
import { getExoplanetsByMonth, getNumberOfClosestPlanets, getNumberOfExoplanets } from '@api/Exoplanets';
import { faEarth, faHeart, faSatellite, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DiscoveredExoplanets from './middlecard/DiscoveredExoplanets';
import EvolutionExoDiscover from './middlecard/EvolutionExoDiscover';
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
    }, []);

    return (
        <div>
            <section className="flex flex-wrap sm:flex-row sm:flex-nowrap justify-center items-center lg:max-w-[80%] lg:m-auto">
                <TopCard title={"Discovered Exoplanets"} data={topCardsValues.discoveredExoplanetsNumber || 0} icon={<FontAwesomeIcon icon={faEarth} width={15} color="var(--generic-text-color)" />} />
                <TopCard title={`Dicovered Exoplanets (${year})`} data={topCardsValues.discoveredExoplanetsNumberThisYear || 0} icon={<FontAwesomeIcon icon={faStar} width={15} color="var(--generic-text-color)" />} />
                <TopCard title={"Closest Exoplanets"} data={topCardsValues.closestExoplanetsNumber || 0} icon={<FontAwesomeIcon icon={faSatellite} width={15} color="var(--generic-text-color)" />} />
                <TopCard title={"Habitable Planets"} data={1000} icon={<FontAwesomeIcon icon={faHeart} width={15} color="var(--generic-text-color)" />} />
            </section>
            <section className='flex flex-wrap sm:flex-row justify-center items-center lg:max-w-[75%] lg:m-auto'>
                <DiscoveredExoplanets data={exoplanetsByMonth} month={month} year={year} />
                <EvolutionExoDiscover data={exoplanetsByMonth} month={month} year={year} />
            </section>
        </div>



    );
};



export default DashBoard;