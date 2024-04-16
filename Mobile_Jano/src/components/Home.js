import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image1 from './image/Rectangle1.png';
import image2 from './image/Rectangle2.png';
import image3 from './image/Rectangle3.png';
import image4 from './image/Rectangle4.png';
import image5 from './image/Rectangle5.png';
import TopDevices from './TopDevices';


const ProfComponent = () => {
  const boxesData = [
    
    {
      id: 1,
      imageUrl: "https://cdn.freebiesupply.com/logos/large/2x/vivo-1-logo-png-transparent.png",
      text: "Vivo",
      url: "https://www.vivo.com/in",
    },
    {
      id: 2,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Samsung_Electronics_logo_%28english%29.svg",
      text: "Samsung",
      url: "https://www.samsung.com/in/",
    },
    {
      id: 3,
      imageUrl: "https://www.oneplus.com/content/dam/oasis/page/common/logo/OnePlus_Logo.png",
      text: "OnePlus",
      url: "https://www.oneplus.in/",
    },
    {
      id: 4,
      imageUrl: "https://static.toiimg.com/thumb/msid-72102264,width-400,resizemode-4/72102264.jpg",
      text: "Realme",
      url: "https://www.realme.com/in/",
    },
    {
      id: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/1024px-Xiaomi_logo_%282021-%29.svg.png",
      text: "Xiaomi",
      url: "https://www.mi.com/in",
    },
    {
      id: 6,
      imageUrl: "https://static.vecteezy.com/system/resources/previews/020/927/091/original/oppo-logo-brand-phone-symbol-white-design-chinese-mobile-illustration-with-black-background-free-vector.jpg",
      text: "Oppo",
      url: "https://www.oppo.com/in/store",
    },
    {
      id: 7,
      imageUrl: "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",
      text: "Apple",
      url: "https://www.apple.com/in/store",
    },
    {
      id: 8,
      imageUrl: "https://t1.gstatic.com/images?q=tbn:ANd9GcTdrOnhLyB2FmKDoOnO5_8ITYbw3w3T7eYCdXEb6esAI_pxVlwG",
      text: "Nokia",
      url: "https://www.hmd.com/en_in",
    },
    {
      id: 9,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Motorola_M_symbol_blue.svg/1024px-Motorola_M_symbol_blue.svg.png",
      text: "Motorola",
      url: "https://www.motorola.com/us/",
    },
    {
      id: 10,
      imageUrl: "https://static.vecteezy.com/system/resources/previews/020/927/282/original/lenovo-logo-brand-phone-symbol-name-black-design-china-mobile-illustration-free-vector.jpg",
      text: "Lenovo",
      url: "https://www.lenovo.com/in/en/?Redirect=False",
    },
    {
      id: 11,
      imageUrl: "https://images.indianexpress.com/2021/07/Nothing-logo.jpg",
      text: "Nothing",
      url: "https://in.nothing.tech/",
    },
    {
      id: 12,
      imageUrl: "data:image/jpeg;base64,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",
      text: "Asus",
      url: "https://www.asus.com/in/mobile-handhelds/phones/all-series/filter?Category=Gaming-Phone",
    },


    
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [image1, image2, image3, image4, image5];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(intervalId);
  }, [slides.length]);

  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email submitted:", email);
    setEmail('');
  };

  return (
    <>
      <ContactInfo>
        <ImageContainer>
          <CommonHeading>Welcome to Mobile Jano: Uncover the Magic of Mobile Technology</CommonHeading>
          <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
        </ImageContainer>
      </ContactInfo>

      <CommonHeading><br></br>Top Brands</CommonHeading>
      <Container id="home">
        {boxesData.map((box) => (
          <Box key={box.id} href={box.url}>
            <img src={box.imageUrl} alt="Box Image" />
            <BoxContent>
              <BoxText>{box.text}</BoxText>
              <Arrow>&rarr;</Arrow>
            </BoxContent>
          </Box>
        ))}
      </Container>

      <div>
        <CommonHeading><br></br>Top 20 Devices</CommonHeading>
        <p style={{textAlign: 'center'}}>This Table Data is owned by GSM Arena</p>
        <TopDevices />
      </div>

      <Footer>
        <NewsletterForm onSubmit={handleSubmit}>
          <h2>Get the latest news delivered to your inbox!</h2>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Your email address" 
            value={email}
            onChange={handleEmailChange}
            required 
          />
          <button type="submit">Subscribe</button>
        </NewsletterForm>
      </Footer>
    </>
  );
};

const ImageContainer = styled.div`
  display: block;
  margin: 0 auto;
  max-width: 100%; 
  overflow: hidden; 

  img {
    width: 80%; 
    height: auto; 
    display: block; 
    margin: 0 auto; 
  }
`;


const ContactInfo = styled.section`
  text-align: center;
  padding: 2rem;
`;

const CommonHeading = styled.h2`
  text-align: center;
  margin: 1.5rem;
  font-size: 35px;
  position: relative;

  &:hover {
    color: yellow;
    transform: rotate(2deg);
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 90%;
    width: 0px;
    height: 0px;
    background-color: yellow;
    transform: translateX(-50%) rotate(5deg);
    z-index: -1;
  }
`;

const NewsletterForm = styled.form`
  align-items: center;
  justify-content: center;

  label {
    margin-right: 1rem;
  }

  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 1rem;
    text-align: center;
  }

  h2 {
    margin-bottom: 2rem;
    font-weight: 100px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #FF0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #1f7a99;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding-top: 3rem;
  width: 90%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Box = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #f0f0f0;
  padding: 2rem;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  width: 300px;
  margin-bottom: 2rem;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BoxText = styled.p`
  text-align: left;
  font-size: 1.1rem;
  margin-left: 1px;
`;

const Arrow = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  color: white;
  border-top: thick double #32a1ce;
  border-bottom: thick double #32a1ce;
`;

export default ProfComponent;