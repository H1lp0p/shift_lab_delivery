import './App.css'
import { useMyDispatch } from './domain/hooks/my-dispatch'
import { useMySelector } from './domain/hooks/my-selectior'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './present/base-layout/base-layout';
import { Card } from './present/common/card/card';
import { UserIco } from './present/icons';
import { HomePage } from './present/pages/home/home';


function App() {

  const dispatch = useMyDispatch();

  const state = useMySelector((st) => st);
  console.log(state);

  const theme = state.theme.theme

  return (
    <div className='app' data-theme={theme}>
      <Router>
        <Routes>
          <Route element={<BaseLayout/>}>
            <Route path='login'/>
            <Route path='' element={<HomePage/>}/>
            <Route path='order'/>
            <Route path='profile'/>
            <Route path='history'/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
