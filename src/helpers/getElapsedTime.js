const getElapsedTime = (date) => {
  const seconds = Math.floor((Date.now() - date) / 1000);
  if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2)
    return `${Math.round(seconds / (60 * 60 * 24 * 365.25))} years ago`;
  if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1) return '1 year ago';
  if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2)
    return `${Math.round(seconds / (60 * 60 * 24 * 30.4))} months ago`;
  if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1) return '1 month ago';
  if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2)
    return `${Math.round(seconds / (60 * 60 * 24 * 7))} weeks ago`;
  if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return '1 week ago';
  if (Math.round(seconds / (60 * 60 * 24)) >= 2)
    return `${Math.round(seconds / (60 * 60 * 24))} days ago`;
  if (Math.round(seconds / (60 * 60 * 24)) >= 1) return '1 day ago';
  if (Math.round(seconds / (60 * 60)) >= 2) return `${Math.round(seconds / (60 * 60))} hours ago`;
  if (Math.round(seconds / (60 * 60)) >= 1) return '1 hour ago';
  if (Math.round(seconds / 60) >= 2) return `${Math.round(seconds / 60)} minutes ago`;
  if (Math.round(seconds / 60) >= 1) return '1 minute ago';
  if (seconds >= 2) return `${seconds} seconds ago`;
  return `${seconds}1 second ago`;
};

export default getElapsedTime;
