import { BiCameraMovie, BiSlideshow } from 'react-icons/bi';
import { MdFilterList, MdOutlineHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './Navigation.scss';

const navItems = [
  { content: 'Home', href: '/', icon: <MdOutlineHome /> },
  { content: 'Movies', href: '/movie', icon: <BiCameraMovie /> },
  { content: 'Series', href: '/show', icon: <BiSlideshow /> },
  { content: 'Filters', href: '/filter', icon: <MdFilterList /> },
];

const Navigation = ({ classNames }) => (
  <nav className={`navigation ${classNames}`}>
    <ul className="navigation__list">
      {navItems?.map((navItem) => (
        <li
          key={navItem.content}
          className={`navigation__item ${
            window.location.pathname === navItem.href ? 'active' : ''
          }`}
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

export default Navigation;
