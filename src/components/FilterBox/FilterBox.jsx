import { useRef, useState } from 'react';

import useClickOutside from '../../hooks/useClickOutside';

import './FilterBox.scss';

const FilterBox = ({ items, handleUpdateItems, label, icon, checkedFunction, grid, column }) => {
  const [open, setOpen] = useState(false);

  const box = useRef(null);

  const inputReference = useRef(null);

  useClickOutside(box, () => setOpen(false));

  return (
    <div className="FilterBox" ref={box}>
      <button
        type="button"
        ref={inputReference}
        className={`FilterBox__visible ${open && 'FilterBox__visible--open'}`}
        onClick={() => setOpen(!open)}
      >
        {icon} <p className="FilterBox__label">{label}</p>
      </button>
      {open && (
        <div className="FilterBox__dropBox">
          <ul
            className="FilterBox__list"
            style={{
              display: grid && 'grid',
              gridTemplateColumns: `repeat(${column}, 1fr )`,
            }}
          >
            {items?.length > 0 &&
              items.map((item) => (
                <li key={item.name} className="FilterBox__listItem">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleUpdateItems(item);
                    }}
                  >
                    <input readOnly type="checkbox" checked={checkedFunction(item)} />
                    {item.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
