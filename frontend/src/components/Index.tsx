import { getExoplanets, getExoplanetsByMonth, getNumberOfClosestPlanets, getNumberOfExoplanets } from '@/api/Exoplanets';
import { Exoplanet, ExoplanetByMonth } from '@/models/DashBoard/Exoplanet';
import { TopCards } from '@/models/DashBoard/TopCards';
import { ExoplanetsData } from '@/models/Repository/ExoplanetsData';
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
        habitablePlanetsNumber: null
    });
    const [exoplanetsByMonth, setExoplanetsByMonth] = useState<ExoplanetByMonth[]>();
    const [lastestExoplanets, setLastestExoplanets] = useState<Exoplanet[]>();
    const date = new Date();

    //Repository
    const [exoplanetsPage, setExoplanetsPage] = useState<ExoplanetsData>({
        actualMaxRegistry: 0,
        actualPage: 1,
        exoplanetsData: [],
        nextPage: null,
        previousPage: 2
    });

    const modifyExoplanetsPage = (newReg: ExoplanetsData) => {
        setExoplanetsPage(newReg);
    }


    /* DashBoard */
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

        getNumberOfExoplanets(date.getFullYear()).then(async res =>
        {
            setTopCardsValues(prevState => ({
                ...prevState,
                discoveredExoplanetsNumberThisYear: res
            }));
        });

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

        getExoplanets(10, 0).then((res: Exoplanet[]) => setLastestExoplanets(res));
    }, []);


    /*Repository*/
    useEffect(() =>
    {

        getExoplanets(exoplanetsPage.actualMaxRegistry + 10, exoplanetsPage.actualMaxRegistry).then((res: Exoplanet[]) =>
        {
            setExoplanetsPage((prevState: ExoplanetsData) =>
            {
                if (!prevState) return prevState;

                return {
                    ...prevState,
                    exoplanetsPage: res
                };
            });
        })

    }, []);


    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<DashBoard topCardsValues={topCardsValues} exoplanetsByMonth={exoplanetsByMonth} lastestExoplanets={lastestExoplanets} actualDate={date} />} />
                <Route path='/repository' element={<Repository exoplanetsPage={exoplanetsPage} setExoplanetsPage={modifyExoplanetsPage}/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Index;