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
        <Route path='/h-alan.github.io/cook-book' element={<Home />} />
        <Route path='/h-alan.github.io/cook-bookcuisine/:type' element={<Cuisine />} />
        <Route path='/h-alan.github.io/cook-booksearched/:search' element={<Searched />} />
        <Route path='/h-alan.github.io/cook-bookrecipe/:id' element={<Recipe />} />
      </Routes>
    </AnimatePresence >
  )
}

export default Pages