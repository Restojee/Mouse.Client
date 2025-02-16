import * as React from 'react';
import AppServices from "@/Init";
import { Router } from './Router';

AppServices.init();
const App: React.FC = () => <Router />;

export default App;
