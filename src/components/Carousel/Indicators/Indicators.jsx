/* eslint-disable react/no-array-index-key */
import './Indicators.scss';

const Indicators = ({ childrensCount, itemsShow, page, updateActive }) => (
  <div className="indicators">
    {new Array(Math.ceil(childrensCount / itemsShow)).fill('').map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => updateActive(index)}
        className={
          index === page ? 'indicators__outer indicators__outer--active' : 'indicators__outer'
        }
      />
    ))}
  </div>
);

export default Indicators;
