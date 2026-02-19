import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import SettingPage from '../pages/SettingPage'
import DiamondPage from '../pages/DiamondPage'
import CompletePage from '../pages/CompletePage'
import View from '../components/View'
import View2 from '../components/View2'


const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/ring-builder" element={<Navigate to="/diamond" replace />} />
      <Route path="/settings" element={
        <SettingPage />
        } />
      <Route path="/diamond" element={
        <DiamondPage />
        } />
      <Route path="/complete" element={<CompletePage/>} />
      <Route path="/diamond/:sku" element={<View />} />
      <Route path='/settings/:id' element={<View2/>} /> 
    </Routes>
  )
}

export default RoutesIndex