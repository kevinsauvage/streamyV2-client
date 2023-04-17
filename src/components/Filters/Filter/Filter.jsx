import { useRef, useState } from 'react';

import useClickOutside from '../../../hooks/useClickOutside';

import styles from './Filter.module.scss';

const FilterBox = ({ items, handleUpdateItems, label, icon, checkedFunction, grid, column }) => {
  const [open, setOpen] = useState(false);

  const box = useRef(null);

  const inputReference = useRef(null);

  useClickOutside(box, () => setOpen(false));

  return (
    <div className={styles.filter} ref={box}>
      <button
        type="button"
        ref={inputReference}
        className={`${styles.button} ${open && styles.open}`}
        onClick={() => setOpen(!open)}
      >
        {icon} <p className={styles.label}>{label}</p>
      </button>
      {open && (
        <div className={styles.dropdown}>
          <ul
            className={styles.list}
            style={{
              display: grid && 'grid',
              gridTemplateColumns: `repeat(${column}, 1fr )`,
            }}
          >
            {items?.length > 0 &&
              items.map((item) => (
                <li key={item.name} className={styles.item}>
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
