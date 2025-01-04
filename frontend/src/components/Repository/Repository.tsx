import { getExoplanetsWithFilters } from "@/api/Exoplanets";
import { Exoplanet } from "@/models/Global/Exoplanet";
import { DiscoveringMethod } from "@/models/Repository/ExoplanetDiscMethod";
import { ExoplanetsData } from "@/models/Repository/ExoplanetsData";
import { PlanetType } from "@/models/Repository/ExoplanetType";
import { Filters } from "@/models/Repository/Filters";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import ExoplanetHeader from "./ExoplanetHeader";
import ExoplanetPagination from "./ExoplanetPagination";
import ExoplanetRepoFilters from "./ExoplanetRepoFilters";


const Repository = () =>
{
  const [filters, setFilters] = useState<Filters>({
    clearButton: false,
    searchByText: null,
    rangeFilters: [
      { value: [0, 1], title: "Eccentric Orbit", minValue: 0, maxValue: 1, step: 0.01, allowNullValues: false },
      { value: [0, 25000], title: "Distance to Earth (ly)", minValue: 0, maxValue: 25000, step: 1, allowNullValues: false}
    ],
    selectFilters: [
      { title: "Planet Type", options: [PlanetType.UnFiltered, PlanetType.GasGiant, PlanetType.HotJupiter, PlanetType.NeptuneLike, PlanetType.SubNeptune, PlanetType.SuperEarth, PlanetType.Terrestrial, PlanetType.Unknown], value: PlanetType.UnFiltered },
      { title: "Discovering Method", options: [DiscoveringMethod.Unfiltered, DiscoveringMethod.TRAN, DiscoveringMethod.AST, DiscoveringMethod.PUL, DiscoveringMethod.OBM, DiscoveringMethod.MICRO, DiscoveringMethod.ETV, DiscoveringMethod.TTV, DiscoveringMethod.RV, DiscoveringMethod.IMA, DiscoveringMethod.DKIN, DiscoveringMethod.PTV], value: DiscoveringMethod.Unfiltered },
    ],
    showFilters: false,
    applyChanges: false,

  });
  const [infoExoplanetsData, setInfoExoplanetsData] = useState<ExoplanetsData>({
    actualPage: 1,
    exoplanetsData: null,
    numberOfPages: null,
    registriesPerPage: 20,
    isLoading: true
  });


  useEffect(() =>
  {
    getExoplanetsWithFilters(infoExoplanetsData.registriesPerPage, (infoExoplanetsData.actualPage - 1) * infoExoplanetsData.registriesPerPage, filters)
      .then((res) =>
      {
        setInfoExoplanetsData(prevState => ({
          ...prevState,
          exoplanetsData: res.data as Exoplanet[],
          isLoading: false,
        }));
      }
      );
  }, [infoExoplanetsData.actualPage]);

  useEffect(() =>
  {
    getExoplanetsWithFilters(infoExoplanetsData.registriesPerPage, (infoExoplanetsData.actualPage - 1) * infoExoplanetsData.registriesPerPage, filters)
      .then((res) =>
      {
        setInfoExoplanetsData(prevState => ({
          ...prevState,
          exoplanetsData: res.data as Exoplanet[],
          numberOfPages: Math.ceil((res.rowCountWithoutFilters ?? 0) / Number(infoExoplanetsData.registriesPerPage)),
          actualPage: 1,
          isLoading: false
        }));
      }
      ).then(() =>
        setFilters(prevState => ({
          ...prevState,
          applyChanges: false
        })));
  }, [filters.applyChanges, infoExoplanetsData.registriesPerPage]);


  return (
    <div className="my-3 mx-5">
      <ExoplanetHeader filters={filters} setFilters={setFilters}/>
      {infoExoplanetsData.exoplanetsData?.length ?? 0 > 0 ?
        filters.showFilters ?
          <div className="flex w-full">
            <ExoplanetRepoFilters filters={filters} setFilters={setFilters} setInfoExoplanetsData={setInfoExoplanetsData}
              className="w-[50%] absolute z-50 md:w-[30%] lg:w-[20%] md:relative bg-[var(--bg-color)]" />
            <ExoplanetPagination filters={filters} setInfoExoplanetsData={setInfoExoplanetsData} infoExoplanetsData={infoExoplanetsData}
              className="sm:w-full md:w-[70%] lg:md:w-[80%]" />
          </div>
          : <ExoplanetPagination filters={filters} setInfoExoplanetsData={setInfoExoplanetsData} infoExoplanetsData={infoExoplanetsData} className="w-full" />
        : Loader(infoExoplanetsData.isLoading, 50, { margin: "0 auto", display: "block" })
      }
    </div>
  );
};

export default Repository;