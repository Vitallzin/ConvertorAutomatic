//import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Converter from './components/Converter/Converter'
import Alerts from './components/Alerts'
import Footer from './components/Footer'
import FeatureCards from './components/FeatureCards/FeatureCards'

function App() {
  

  return (
    <>
      <Header />
      <FeatureCards/>
      <Converter />
      <Alerts />
      <Footer /> 
    </>
  )
}

export default App
