import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@common/containers/Layout/Layout';
import LevelsModule from "@/modules/levels/view";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/levels" element={<LevelsModule />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
