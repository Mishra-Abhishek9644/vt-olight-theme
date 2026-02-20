import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SettingPage from '../pages/SettingPage'
import DiamondPage from '../pages/DiamondPage'
import CompletePage from '../pages/CompletePage'
import View from '../components/View'
import View2 from '../components/View2'


const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="diamond" replace />} />

      <Route path="diamond">
        <Route index element={<DiamondPage />} />
        <Route path=":sku" element={<View />} />
      </Route>

      <Route path="settings">
        <Route index element={<SettingPage />} />
        <Route path=":id" element={<View2 />} />
      </Route>

      <Route path="complete" element={<CompletePage />} />
    </Routes>
  )
}

export default RoutesIndex