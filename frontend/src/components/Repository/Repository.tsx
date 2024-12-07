import { getExoplanets } from "@/api/Exoplanets";
import { ExoplanetsData } from "@/models/Repository/ExoplanetsData";
import { Filters } from "@/models/Repository/Filters";
import { useEffect, useState } from "react";
import ExoplanetPagination from "./ExoplanetPagination";
import ExoplanetRepoFilters from "./ExoplanetRepoFilters";

interface Prop
{
  exoplanetsPage: ExoplanetsData,
  setExoplanetsPage: (newReg: ExoplanetsData) => void;

}
const Repository: React.FC<Prop> = () =>
{
  const [filters, setFilters] = useState<Filters>({
    clearButton: false,
    selectFilters: null,
    checkBoxFilters: [
      { checked: false, title: "Exoplaneta Confirmado" },
      { checked: false, title: "Órbita Excéntrica" },
      { checked: false, title: "Estrella Tipo Solar" },
      { checked: false, title: "Estrella Activa" },
      { checked: false, title: "En Zona Habitable" },
      { checked: false, title: "Exoplaneta Confirmado" },
    ]
  });
  const setFiltersEx = (newReg: Filters) =>
  {
    setFilters(newReg);
  };
  const [repoExoplanetsData, setRepoExoplanetsData] = useState<ExoplanetsData>({
    actualMaxRegistry: 0,
    actualPage: 1,
    nextPage: 2,
    previousPage: null,
    exoplanetsData: null
  });

  const changeRepoExoplanetsData = (newReg: ExoplanetsData) => setRepoExoplanetsData(newReg);

  useEffect(() =>
  {
    getExoplanets(import.meta.env.VITE_ROWS_PER_PAGE, 0).then(res =>
      setRepoExoplanetsData(prevState => (
        {
          ...prevState,
          exoplanetsData: res
        }
        ),
      )
    );
  }, []);
  return (
    <div className="flex my-3 mx-5">
      <div className="w-[15%]">
        <ExoplanetRepoFilters filters={filters} setFilters={setFiltersEx} />
      </div>
      <div className="w-[85%] mx-2">
        <ExoplanetPagination filters={filters} repoExoplanetsData={repoExoplanetsData} setRepoExoplanetsDate={changeRepoExoplanetsData} />
      </div>
    </div>
  );
};

export default Repository;