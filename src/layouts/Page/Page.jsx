import Navigation from '../../components/Navigation/Navigation';
import PageLoader from '../../components/PageLoader/PageLoader';

import styles from './Page.module.scss';

const Page = ({ children, className, loading, ...rest }) => {
  if (loading) return <PageLoader />;

  return (
    <div className={`${styles.page} ${className || ''}`} {...rest}>
      <Navigation classNames="hide-desktop" />
      {children}
    </div>
  );
};

export default Page;
