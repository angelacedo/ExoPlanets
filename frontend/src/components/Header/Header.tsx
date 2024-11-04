import logo from '@/img/logo.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import ExoplanetApi from "../../api/Exoplanets";
import { Exoplanet } from "../../models/Exoplanet";
function Header()
{
  const [exoplanets, setExoplanets] = useState<Exoplanet[]>();

  useEffect(() =>
  {
    const getExoplanets = async () =>
    {
      const response = await ExoplanetApi.getExoplanets(1);
      setExoplanets(response);
    };
    getExoplanets();
  }, []);


  return (
    <header className='flex' >
      <div className='w-[20%]'>
        <img src={logo} width={100} alt="" />
      </div>
      <div className="flex w-[80%] items-center">
        <div className="title w-[20%]">
          <h3 className='font-thin' color='var(--generic-text-color)'>DashBoard</h3>
        </div>
        <search className='flex justify-end items-center w-[80%]'>
          <form className='flex justify-end w-[40%] border rounded-lg overflow-hidden'>
            <button className='w-[10%] rounded-l-sm p-2 bg-[var(--input-bg-color)] outline-none'><FontAwesomeIcon icon={faSearch} width={10} color="var(--generic-text-color-black)"/></button>
            <input className='text-sm w-[90%] rounded-r-sm p-2 bg-[var(--input-bg-color)] outline-none' type="search" name="search" autoComplete="off" />

          </form>
        </search>
      </div>


    </header>
  );
}

export default Header;