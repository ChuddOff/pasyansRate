import React from 'react';
import './App.css';
import CardList from '../CardList/CardList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from '../Header/Header';
import Header2 from '../Header2/Header2';
import { TouchBackend } from 'react-dnd-touch-backend';

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function App() {
  return (
    <DndProvider backend={isMobileDevice? TouchBackend : HTML5Backend}>
      <div className="App">
        <Header/>
        <Header2/>
        <CardList/>
      </div>
    </DndProvider>
  );
}

export default App;
