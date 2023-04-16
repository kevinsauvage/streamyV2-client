import { AiOutlineCloseSquare } from 'react-icons/ai';

import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed';

import './ModalTrailer.scss';

const ModalTrailer = ({ setTrailer, trailer }) => (
  <div className="modal-trailer">
    <button type="button" className="modal-trailer__close" onClick={() => setTrailer()}>
      <AiOutlineCloseSquare />
    </button>
    <YoutubeEmbed embedId={trailer.key} />
  </div>
);

export default ModalTrailer;
