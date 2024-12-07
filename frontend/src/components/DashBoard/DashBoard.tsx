import { Exoplanet, ExoplanetByMonth } from '@/models/DashBoard/Exoplanet';
import { TopCards } from '@/models/DashBoard/TopCards';
import '@api/Exoplanets';
import { IoEarth, IoEye, IoHeart, IoStar } from "react-icons/io5";
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
                <TopCard title={"Discovered Exoplanets"} data={topCardsValues.discoveredExoplanetsNumber || 0} icon={<IoEarth width={15} color="var(--generic-text-color)" />} />
                <TopCard title={`Disc. Exoplanets (${actualDate.getFullYear()})`} data={topCardsValues.discoveredExoplanetsNumberThisYear || 0} icon={<IoStar width={15} color="var(--generic-text-color)" />} />
                <TopCard title={"Closest Exoplanets"} data={topCardsValues.closestExoplanetsNumber || 0} icon={<IoEye width={15} color="var(--generic-text-color)" />} />
                <TopCard title={"Habitable Planets"} data={1000} icon={<IoHeart width={15} color="var(--generic-text-color)" />} />
            </section>
            <section>
                <div className='flex flex-wrap sm:flex-row justify-center items-center lg:max-w-[80%] mx-auto my-[1%] p-2'>
                    <DiscoveredExoplanets data={exoplanetsByMonth} month={actualDate.getMonth()} year={actualDate.getFullYear()} />
                    <EvolutionExoDiscover data={exoplanetsByMonth} month={actualDate.getMonth()} year={actualDate.getFullYear()} />
                </div>
                <div className='lg:max-w-[80%] mx-auto p-2'>
                    <LastExoplanetsTable data={lastestExoplanets ?? []} />
                </div>
            </section>
        </div>



    );
};



export default DashBoard;