import React from 'react';
import './App.css';
import CardList from '../CardList/CardList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ChooseGame = lazy(() => import ('../pages/choosegame'))

const Game = lazy(() => import ('../pages/game'))

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function App() {
  return (
    <Router>
      <DndProvider backend={isMobileDevice? TouchBackend : HTML5Backend}>
        <div className="App">
          <Suspense>
            <Routes>

            <Route path="*" element={<Game />} />

            <Route path="/games" element={<ChooseGame />} />

            <Route path="/games/:easyHard" element={<Game />} />

            </Routes>

          </Suspense>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
