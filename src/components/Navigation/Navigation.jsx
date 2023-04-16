import { BiCameraMovie, BiSlideshow } from 'react-icons/bi';
import { MdFilterList, MdOutlineHome } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import './Navigation.scss';

const navItems = [
  { content: 'Home', href: '/', icon: <MdOutlineHome /> },
  { content: 'Movies', href: '/movie', icon: <BiCameraMovie /> },
  { content: 'Series', href: '/show', icon: <BiSlideshow /> },
  { content: 'Filters', href: '/filter', icon: <MdFilterList /> },
];
const Navigation = ({ classNames }) => {
  const location = useLocation();
  return (
    <nav className={`navigation ${classNames}`}>
      <ul className="navigation__list">
        {navItems?.map((navItem) => (
          <li
            key={navItem.content}
            className={`navigation__item ${location.pathname === navItem.href ? 'active' : ''}`}
          >
            <Link to={navItem.href}>
              {navItem.icon}
              {navItem.content}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
