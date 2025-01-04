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
        if (topCardsValues.discoveredExoplanetsNumber === null)
            getNumberOfExoplanets(null).then(async res =>
            {
                setTopCardsValues(prevState => ({
                    ...prevState,
                    discoveredExoplanetsNumber: res
                }));

            });
        if (topCardsValues.closestExoplanetsNumber === null)
            getNumberOfClosestPlanets(null).then(async res =>
            {
                setTopCardsValues(prevState => ({
                    ...prevState,
                    closestExoplanetsNumber: res
                }));
            });

        if (topCardsValues.discoveredExoplanetsNumberThisYear === null)
            getNumberOfExoplanets(date.getFullYear()).then(async res =>
            {
                setTopCardsValues(prevState => ({
                    ...prevState,
                    discoveredExoplanetsNumberThisYear: res
                }));
            });

        if (topCardsValues.lastTimeUpdated === null)
            getLastTimeUpdated().then(async last_update =>
            {
                console.log(last_update);
                setTopCardsValues(prevState => ({
                    ...prevState,
                    lastTimeUpdated: new Date(last_update)
                }));
            });

        if (exoplanetsByMonth === undefined)
            getExoplanetsByMonth().then(res =>
            {

                setExoplanetsByMonth(
                    res.map(({ year, month, exoplanetsCount }: any) => ({
                        year,
                        month,
                        exoplanetsCount
                    }
                    ))
                );
            });

        if (lastestExoplanets === undefined)
            getExoplanets(10, 0).then((res: Exoplanet[]) => setLastestExoplanets(res));
    }, []);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<DashBoard topCardsValues={topCardsValues} exoplanetsByMonth={exoplanetsByMonth} lastestExoplanets={lastestExoplanets} actualDate={date}/>} />
                <Route path='/repository' element={<Repository />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Index;