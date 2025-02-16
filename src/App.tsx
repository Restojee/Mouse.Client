import * as React from 'react';
import { Router } from './Router';
import AppServices from "@/Init";

const App: React.FC = () => <Router />;
AppServices.init();

export default App;
