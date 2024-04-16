import React from 'react';
import './News.css'; 

const News = () => {
  const dummyData = [
    {
      title: "Dummy News 1",
      imageUrl: "https://dummyimage.com/300x200",
      description: "This is a dummy news description 1."
    },
    {
      title: "Dummy News 2",
      imageUrl: "https://dummyimage.com/300x200",
      description: "This is a dummy news description 2."
    },
    {
      title: "Dummy News 3",
      imageUrl: "https://dummyimage.com/300x200",
      description: "This is a dummy news description 3."
    },
    {
        title: "Dummy News 4",
        imageUrl: "https://dummyimage.com/300x200",
        description: "This is a dummy news description 1."
      },
      {
        title: "Dummy News 5",
        imageUrl: "https://dummyimage.com/300x200",
        description: "This is a dummy news description 2."
      },
      {
        title: "Dummy News ",
        imageUrl: "https://dummyimage.com/300x200",
        description: "This is a dummy news description 3."
      }
  ];

  return (
    <div className="co">
      <h1 className='h1, ha'>Fresh Mobile Gossip</h1>
      <div className="news-items-container"> {/* Container for all news items */}
        {dummyData.map((item, index) => (
          <div key={index} className="news-item">
            <div className="news-item-media-wrap left">
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className="news-item-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
