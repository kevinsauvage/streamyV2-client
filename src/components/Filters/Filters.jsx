import { AiFillFolderOpen } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { CgArrowTopRightR } from 'react-icons/cg';
import { FaRegCalendarAlt, FaSortAmountUp } from 'react-icons/fa';
import { RiFilter2Fill } from 'react-icons/ri';

import ratings from '../../data/rating';
import sorting from '../../data/sorting';

import FilterBox from './FilterBox/FilterBox';

import './Filters.scss';

const Filters = ({ checkQueryParameters, genres, handleFilterClick, resetForm, years }) => {
  const { innerWidth } = window;

  return (
    <div className="filters">
      <FilterBox
        items={[{ name: 'Movie' }, { name: 'Tv-series' }]}
        handleUpdateItems={(item) => {
          resetForm({ page: '1', sorting: 'popularity.desc', type: item.name });
        }}
        icon={<BiMoviePlay />}
        label="Type"
        checkedFunction={(item) => checkQueryParameters({ type: item.name })}
      />
      <FilterBox
        items={years}
        handleUpdateItems={(item) => handleFilterClick({ years: item.name })}
        icon={<FaRegCalendarAlt />}
        label="Year"
        grid
        column={innerWidth < 600 ? 4 : 6}
        checkedFunction={(item) => checkQueryParameters({ years: item.name })}
      />
      <FilterBox
        items={ratings}
        handleUpdateItems={(item) => handleFilterClick({ ratings: item.value })}
        icon={<CgArrowTopRightR />}
        label="Rating"
        checkedFunction={(item) => checkQueryParameters({ ratings: item.value })}
      />
      <FilterBox
        items={genres}
        handleUpdateItems={(item) => handleFilterClick({ genres: item.id })}
        icon={<AiFillFolderOpen />}
        label="Genre"
        grid
        column={innerWidth < 800 ? 2 : 3}
        checkedFunction={(item) => checkQueryParameters({ genres: item.id })}
      />
      <FilterBox
        items={sorting}
        handleUpdateItems={(item) => handleFilterClick({ sorting: item.value })}
        icon={<FaSortAmountUp />}
        label="Sorting"
        checkedFunction={(item) => checkQueryParameters({ sorting: item.value })}
      />
      <button type="button" className="filters__btn" onClick={() => resetForm()}>
        <RiFilter2Fill /> <p>Reset</p>
      </button>
    </div>
  );
};

export default Filters;
