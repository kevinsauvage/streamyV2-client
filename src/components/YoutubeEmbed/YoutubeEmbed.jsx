import styles from './YoutubeEmbed.module.scss';

const YoutubeEmbed = ({ embedId }) => (
  <div className={styles.container}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
