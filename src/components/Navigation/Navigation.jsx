import { BiCameraMovie, BiSlideshow } from 'react-icons/bi';
import { MdFilterList, MdOutlineHome } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import styles from './Navigation.module.scss';

const navItems = [
  { content: 'Home', href: '/', icon: <MdOutlineHome /> },
  { content: 'Movies', href: '/movie', icon: <BiCameraMovie /> },
  { content: 'Series', href: '/show', icon: <BiSlideshow /> },
  { content: 'Filters', href: '/filter', icon: <MdFilterList /> },
];

const Navigation = ({ classNames }) => {
  const location = useLocation();
  return (
    <nav className={`${styles.navigation} ${classNames}`}>
      <ul className={styles.list}>
        {navItems?.map((navItem) => (
          <li
            key={navItem.content}
            className={`${styles.item} ${location.pathname === navItem.href ? styles.active : ''}`}
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
