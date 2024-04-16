import React, { useState, useEffect } from 'react';
import './News.css';

const News = () => {
  const dummyData = [
    {
      title: "Realme 12+ review",
      videoId: "MSaBLZ_wp58",
      imageUrl: "https://dummyimage.com/300x200",
      description: "The Realme 12 family is sprawling, so to say, and now includes five phones - Realme 12, Realme 12 Pro, Realme 12 Pro+, Realme 12x. The fifth and final member of the family we have in for review today is the Realme 12+. As its name suggests, the Realme 12+ stands a notch above the vanilla Realme 12 in terms of specs and features."
    },
    {
      title: "Tecno Spark 20 Pro+ review",
      videoId: "9QvxANs1e_A",
      imageUrl: "https://dummyimage.com/300x200",
      description: "Tecno's latest Spark 20 Pro+ is the culmination of the Spark 20 series and features everything the maker can offer in this price range without breaking the bank. And while the Spark 20 Pro+ is no flagship, it sure looks like one. Starting with an exquisite design, the Tecno Spark 20 Pro+ immediately grabs your attention. It has a curved profile with a thin, shiny frame and a back panel covered with vegan leather, which is incredibly nice on the touch. The phone is IP53-rated for dust and splash protection."
    },
    {
      title: "Poco X6 Neo hands-on review",
      videoId: "VlVJjtid6r8",
      imageUrl: "https://dummyimage.com/300x200",
      description: "The Poco X6 Neo is the most affordable model in the X6 series. The other models in the range, the X6 and the X6 Pro, borrow bits and pieces from Xiaomi's Redmi range of devices. However, the X6 Neo, for all intents and purposes, is essentially the Redmi Note 13R Pro with a different name. Since we haven't looked at that model either, this is a good opportunity to kill two birds with one stone, so to speak."
    }
  ];

  const [videoTitles, setVideoTitles] = useState({});

  useEffect(() => {
    const fetchVideoTitles = async () => {
      const titles = {};
      for (const item of dummyData) {
        try {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${item.videoId}&key=YOUR_YOUTUBE_API_KEY`);
          const data = await response.json();
          titles[item.videoId] = data.items[0].snippet.title;
        } catch (error) {
          console.error('Error fetching video title:', error);
        }
      }
      setVideoTitles(titles);
    };

    fetchVideoTitles();
  }, [dummyData]);

  const redirectToForm = () => {
    window.location.href = 'https://forms.gle/gaGZgaW1VRpEnQDD9';
  };

  return (
    <div className="co">
      <h1 className='h1, ha'>Top Mobile Phone Reviews</h1>
      <div className="news-items-container"> {/* Container for all news items */}
        {dummyData.map((item, index) => (
          <div key={index} className="news-item">
            <div className="news-item-media-wrap left">
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className="news-item-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Review credit: gsmarena</p>
            </div>
          </div>
        ))}
      </div>
      <div className="upload-review-section">
        <button className="messenger-button" onClick={redirectToForm}>Upload Your Review</button>
      </div>
      <div className="video-section">
        {dummyData.map((item, index) => (
          <div key={index} className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&controls=0&loop=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="video-frame"
            ></iframe>
            <p className="video-title">{videoTitles[item.videoId]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
