import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MinimalLayout from './components/layout/MinimalLayout';
import ModelShowcasePage from './pages/ModelShowcasePage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ScrollExperience from './slices/ScrollExperience';
import Hero from './slices/Hero';
import Bounded from './components/ui/Bounded';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <MinimalLayout>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Bounded>
                  <ScrollExperience />
                </Bounded>
              </>
            } />
            <Route path="/model-showcase" element={<ModelShowcasePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MinimalLayout>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;