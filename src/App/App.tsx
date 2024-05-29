import React from 'react';
import './App.css';
import CardList from '../CardList/CardList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from '../Header/Header';
import Header2 from '../Header2/Header2';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Header/>
        <Header2/>
        <CardList/>
      </div>
    </DndProvider>
  );
}

export default App;
