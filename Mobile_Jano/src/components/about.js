import React from 'react';
import styled from 'styled-components';

const AboutUs = () => {
  return (
    <Wrapper>
      <CommonHeading>
        <h2>About MobileJano</h2>
      </CommonHeading>
      <ContactText>
        <h5>Welcome to MobileJano, your go-to destination for the latest device details, news, and reviews!</h5><br></br>
      </ContactText>

      <Section>
        <h3>Our Mission</h3>
        <p>At MobileJano, our mission is to empower consumers by providing them with accurate and comprehensive information about mobile devices. We aim to simplify the process of choosing the perfect device by offering detailed specifications, comparisons, and unbiased reviews.</p>
      </Section>

      <Section>
        <h3>Our Vision</h3>
        <p>Our vision is to become the most trusted source for mobile device information worldwide. We strive to continuously innovate and improve our platform to better serve the needs of our users, keeping them informed and confident in their purchasing decisions.</p>
      </Section>

      <Section>
        <h3>More About Us</h3>
        <p>MobileJano is dedicated to delivering up-to-date news and in-depth reviews on the latest mobile devices. Whether you're looking for detailed specifications, expert opinions, or user experiences, you'll find everything you need right here. Our team of tech enthusiasts is passionate about technology and committed to providing you with valuable insights to make informed choices.</p>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CommonHeading = styled.div`
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

const ContactText = styled.div`
  font-size: 1rem;
  line-height: 2;
  text-align: center;
  letter-spacing: 1px;
  line-spacing: 5px;
`;

const Section = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    h3 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
  }
`;

export default AboutUs;
