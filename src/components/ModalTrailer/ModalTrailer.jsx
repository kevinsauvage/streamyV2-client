import { AiOutlineCloseSquare } from 'react-icons/ai';

import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed';

import styles from './ModalTrailer.module.scss';

const ModalTrailer = ({ setTrailer, trailer }) => (
  <div className={styles.modal}>
    <button type="button" className={styles.close} onClick={() => setTrailer()}>
      <AiOutlineCloseSquare />
    </button>
    <YoutubeEmbed embedId={trailer.key} />
  </div>
);

export default ModalTrailer;
