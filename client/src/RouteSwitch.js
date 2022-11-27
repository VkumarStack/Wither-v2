import { HahsRouter, BrowserRouter, Routes, Route, useParams, HashRouter } from 'react-router-dom';
import Home from './Routes/Home'
import HeaderBar from './Routes/HeaderBar';
import Profile from './Routes/Profile';

const RouteSwitch = () => {
    return (
        <HashRouter basename='/'>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/users/:id' element={<Profile/>} />
                <Route path='/users/:id/:pid' element={<User/>} />
            </Routes>
        </HashRouter>
    );
};

function User() {
    var { id, pid } = useParams()
    return (
        <div>
            <h3> {id} . {pid} </h3>
        </div>
    );
}

export default RouteSwitch;
