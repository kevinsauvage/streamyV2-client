const range = (start, stop, step) => {
  const a = [stop];
  let b = stop;
  while (b > start) {
    a.push(b);
    b -= step || 1;
  }
  return a;
};

export default range;
