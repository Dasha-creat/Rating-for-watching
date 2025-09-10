import { Navbar } from 'flowbite-react';
import "./Header.css"
import { logo, i22, bell } from '../../../shared/assets/index'

export const Header: React.FC = () => {
  return (
    <Navbar className='mainNavbar navbar' fluid={true}>

        <Navbar.Brand>
          <img src={logo} alt={'logotype'} className="logo" />
        </Navbar.Brand>

          <div className='navbar-list'>

        <Navbar.Collapse>
          <img src={bell} alt={'belltype'} className="bell" />
        </Navbar.Collapse>

        <Navbar.Brand>
          <img src={i22} alt={'teacherNumbertype'} className="teacher-profile" />
        </Navbar.Brand>

          </div>
          
    </Navbar>
  );
}