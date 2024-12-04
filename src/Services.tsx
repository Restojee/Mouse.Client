import * as React from 'react';
import { Router } from './Router';
import Services from "@common/services";

new Services().init();

const App: React.FC = () => <Router />;

export default App;
