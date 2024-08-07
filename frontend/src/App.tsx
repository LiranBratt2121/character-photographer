import React, { useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import AppContent from './components/AppContent';


const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;