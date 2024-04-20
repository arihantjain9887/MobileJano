import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Search from './components/Search';
import Reviews from './components/Reviews';
import News from './components/News';
import About from'./components/about';
import Compare from './components/Compare'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
