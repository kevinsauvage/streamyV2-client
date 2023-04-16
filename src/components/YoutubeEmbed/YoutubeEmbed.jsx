import './YoutubeEmbed.scss';

const YoutubeEmbed = ({ embedId }) => (
  <div className="YoutubeEmbed ">
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
