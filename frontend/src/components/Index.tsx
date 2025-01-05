import { getExoplanets, getExoplanetsByMonth, getLastTimeUpdated, getNumberOfClosestPlanets, getNumberOfExoplanets } from '@/api/Exoplanets';
import { TopCards } from '@/models/DashBoard/TopCards';
import { Exoplanet, ExoplanetByMonth } from '@/models/Global/Exoplanet';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './DashBoard/DashBoard';
import Header from './Header/Header';
import Repository from './Repository/Repository';

const Index = () =>
{
    //DashBoard
    const [topCardsValues, setTopCardsValues] = useState<TopCards>({
        closestExoplanetsNumber: null,
        discoveredExoplanetsNumber: null,
        discoveredExoplanetsNumberThisYear: null,
        lastTimeUpdated: null
    });
    const [exoplanetsByMonth, setExoplanetsByMonth] = useState<ExoplanetByMonth[]>();
    const [lastestExoplanets, setLastestExoplanets] = useState<Exoplanet[]>();
    const date = new Date();

    /* DashBoard */
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const [
                discoveredExoplanetsNumber,
                closestExoplanetsNumber,
                discoveredExoplanetsNumberThisYear,
                lastTimeUpdated,
                exoplanetsByMonthRes,
                lastestExoplanetsRes,
            ] = await Promise.all([
                getNumberOfExoplanets(null),
                getNumberOfClosestPlanets(null),
                getNumberOfExoplanets(date.getFullYear()),
                getLastTimeUpdated(),
                getExoplanetsByMonth(),
                getExoplanets(10, 0),
            ]);

            setTopCardsValues({
                discoveredExoplanetsNumber,
                closestExoplanetsNumber,
                discoveredExoplanetsNumberThisYear,
                lastTimeUpdated: new Date(lastTimeUpdated),
            });
            setExoplanetsByMonth(
                exoplanetsByMonthRes.map(({ year, month, exoplanetsCount }: any) => ({
                    year,
                    month,
                    exoplanetsCount,
                }))
            );
            setLastestExoplanets(lastestExoplanetsRes);
        };

        fetchData();
    }, []);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<DashBoard topCardsValues={topCardsValues} exoplanetsByMonth={exoplanetsByMonth} lastestExoplanets={lastestExoplanets} actualDate={date} />} />
                <Route path='/repository' element={<Repository />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Index;