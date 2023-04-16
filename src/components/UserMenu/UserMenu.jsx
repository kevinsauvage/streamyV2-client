import { useContext, useRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { ImSearch } from 'react-icons/im';
import {
  MdAppRegistration,
  MdLogin,
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineMovieFilter,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { getItem } from '../../helpers/sessionStorage';
import useClickOutside from '../../hooks/useClickOutside';

import './UserMenu.scss';

const UserMenu = ({ displayUserMenu, setDisplayUserMenu, setDisplaySearch }) => {
  const userMenuReference = useRef(null);
  const { handleLogOut } = useContext(UserContext);

  useClickOutside(userMenuReference, () => setDisplayUserMenu(false));

  return (
    <div className="user-menu" ref={userMenuReference}>
      <button
        type="button"
        className="user-menu__button user-menu__button-search"
        onClick={() => {
          setDisplaySearch(true);
          setDisplayUserMenu(false);
        }}
      >
        <ImSearch />
      </button>
      <button
        type="button"
        className="user-menu__button user-menu__button-avatar"
        onClick={() => setDisplayUserMenu((previous) => !previous)}
      >
        <FaUserAlt />
      </button>
      {displayUserMenu && (
        <nav className="user-menu__navigation">
          <ul className="user-menu__navigation-list">
            {getItem('user_token_streamy') ? (
              <>
                <li className="user-menu__navigation-item">
                  <Link to="/account">
                    <MdOutlineAccountCircle />
                    Account
                  </Link>
                </li>
                <li className="user-menu__navigation-item">
                  <Link to="/list">
                    <MdOutlineMovieFilter />
                    Watch List
                  </Link>
                </li>
                <li className="user-menu__navigation-item">
                  <button type="button" onClick={handleLogOut}>
                    <MdLogout />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="user-menu__navigation-item">
                  <Link to="/register">
                    <MdAppRegistration />
                    REGISTER
                  </Link>
                </li>
                <li className="user-menu__navigation-item">
                  <Link to="/login">
                    <MdLogin />
                    LOGIN
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UserMenu;
