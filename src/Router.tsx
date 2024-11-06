import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@common/containers/Layout/Layout';
import { Levels } from '@/modules/levels/view/containers/Levels';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/levels" element={<Levels />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
