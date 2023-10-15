import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './Routes/Home'
import Profile from './Routes/Profile';

const RouteSwitch = () => {
    return (
        <HashRouter basename='/'>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/users/:id' element={<Profile/>} />
            </Routes>
        </HashRouter>
    );
};

export default RouteSwitch;
