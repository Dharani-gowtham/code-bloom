import PropTypes from "prop-types";

const NewsItem = ({ title, tags, description, img, link }) => {
  return (
    <div className="news-item">
      <a href={link}>
        <img src={img} alt={title} />
        <div className="content">
          <h3>{title}</h3>
          <div className="tags">
            {Array.isArray(tags) ? (
              tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))
            ) : (
              <span className="tag">{tags}</span>
            )}
          </div>
          <p className="description">{description.slice(0, 75)}...</p>
        </div>
      </a>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NewsItem;
