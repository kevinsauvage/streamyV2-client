import './CreditBox.scss';

const getActors = (cast, number_) => {
  const actors = Object.values(
    Object.fromEntries(Object.entries(cast).sort((a, b) => a[1] - b[1]))
  );

  const shorterActors = actors.splice(0, number_);

  return shorterActors.map((item, index) => {
    if (index === shorterActors.length - 1 && actors.length < shorterActors.length)
      return `${item.name}.`;
    if (index === shorterActors.length - 1 && actors.length > shorterActors.length)
      return `${item.name}...`;
    return `${item.name}, `;
  });
};

const getProductor = (crew, number_) => {
  const items = crew.filter((item) => item.known_for_department === 'Production');
  const shorterItems = items.splice(0, number_);
  return shorterItems.map((item, index) => {
    if (index === shorterItems.length - 1 && items.length < shorterItems.length)
      return `${item.name}.`;
    if (index === shorterItems.length - 1 && items.length > shorterItems.length)
      return `${item.name}...`;
    return `${item.name}, `;
  });
};

const CreditBox = ({ credits }) => (
  <div className="CreditBox">
    {credits?.crew?.find((item) => item.known_for_department === 'Production') && (
      <div className="CreditBox__director">
        <h6 className="CreditBox__title">Productor</h6>
        <p className="CreditBox__names">{getProductor(credits.crew, 10)}</p>
      </div>
    )}
    <div className="CreditBox__cast">
      <h6 className="CreditBox__title">Cast</h6>
      <p className="CreditBox__names">{credits?.cast && getActors(credits?.cast, 10)}</p>
    </div>
  </div>
);

export default CreditBox;
