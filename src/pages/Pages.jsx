import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Home from './Home'
import Cuisine from './Cuisine'
import Searched from './Searched'
import Recipe from './Recipe'

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence wait>
      <Routes location={location} key={location.pathname}>
        <Route path='/cook-book' element={<Home />} />
        <Route path='/cook-book/cuisine/:type' element={<Cuisine />} />
        <Route path='/cook-book/searched/:search' element={<Searched />} />
        <Route path='/cook-book/recipe/:id' element={<Recipe />} />
      </Routes>
    </AnimatePresence >
  )
}

export default Pages