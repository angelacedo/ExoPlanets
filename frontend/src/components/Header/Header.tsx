import logo from '@/img/logo.png';
import { Link } from 'react-router-dom';
function Header()
{

  return (
    <header className='flex w-full border-b-[1px] shadow-md' >
      <div className='w-[20%]'>
        <img src={logo} width={70} alt="planet logo" className='ml-3' />
      </div>
      <nav className="font-thin flex items-center">
        <Link className='mx-auto mr-5' color='var(--generic-text-color)' to="/">DashBoard</Link>
        <Link className='mx-auto' color='var(--generic-text-color)' to="/repository">Repository</Link>
      </nav>



    </header>
  );
}

export default Header;