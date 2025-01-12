import logo from '@/img/logo.png';
import { Link } from 'react-router-dom';
function Header()
{

  return (
    <header className='grid grid-cols-3 items-center w-full border-b-[1px] shadow-md' >
      <div className='px-2 flex justify-end'>
        <img src={logo} width={80} height="100%" alt="planet logo" className='ml-3' />
      </div>
      <nav className="flex justify-center">
        <ul className='flex space-x-5'>
          <li><Link color='var(--generic-text-color)' to="/">DashBoard</Link></li>
          <li><Link color='var(--generic-text-color)' to="/repository">Repository</Link></li>
        </ul>

      </nav>
    </header>
  );
}

export default Header;