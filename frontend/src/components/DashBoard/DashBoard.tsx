import { TopCards } from '@/models/DashBoard/TopCards';
import { Exoplanet, ExoplanetByMonth } from '@/models/Global/Exoplanet';
import '@api/Exoplanets';
import { IoEarth, IoEye, IoReload, IoStar } from "react-icons/io5";
import DiscoveredExoplanets from './middlecard/DiscoveredExoplanets';
import EvolutionExoDiscover from './middlecard/EvolutionExoDiscover';
import LastExoplanetsTable from './middlecard/LastestExoplanets';
import TopCard from "./topcard/TopCard";

interface Props
{
    topCardsValues: TopCards,
    exoplanetsByMonth: ExoplanetByMonth[] | undefined,
    lastestExoplanets: Exoplanet[] | undefined,
    actualDate: Date
}
const DashBoard: React.FC<Props> = ({topCardsValues, exoplanetsByMonth, lastestExoplanets, actualDate}) =>
{
    return (
        <div className='my-3 mx-5'>
            <section className="flex flex-wrap sm:flex-row sm:flex-nowrap justify-center items-center lg:max-w-[80%] lg:m-auto">
                <TopCard classname={"mr-2 mt-2"} title={"Discovered Exoplanets"} data={topCardsValues.discoveredExoplanetsNumber} icon={<IoEarth width={15} color="var(--generic-text-color)" />} />
                <TopCard classname={"mr-2 mt-2"} title={`Disc. Exoplanets (${actualDate.getFullYear()})`} data={topCardsValues.discoveredExoplanetsNumberThisYear} icon={<IoStar width={15} color="var(--generic-text-color)" />} />
                <TopCard classname={"mr-2 mt-2"} title={"Closest Exoplanets"} data={topCardsValues.closestExoplanetsNumber} icon={<IoEye width={15} color="var(--generic-text-color)" />} />
                <TopCard classname={"mt-2"} title={"Updated At"} data={topCardsValues.lastTimeUpdated} icon={<IoReload width={15} color="var(--generic-text-color)" />} />
            </section>
            <section>
                <div className='flex flex-wrap sm:flex-row justify-center items-center lg:max-w-[80%] mx-auto my-3'>
                    <DiscoveredExoplanets data={exoplanetsByMonth} month={actualDate.getMonth()} year={actualDate.getFullYear()} />
                    <EvolutionExoDiscover data={exoplanetsByMonth} year={actualDate.getFullYear()} />
                </div>
                <div className='lg:max-w-[80%] mx-auto'>
                    <LastExoplanetsTable data={lastestExoplanets} />
                </div>
            </section>
        </div>



    );
};



export default DashBoard;