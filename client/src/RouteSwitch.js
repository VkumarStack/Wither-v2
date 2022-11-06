import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './Routes/Home'
import Profile from './Routes/Profile';

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/users/:id' element={<Profile/>} />
                <Route path='/users/:id/:pid' element={<User/>} />
            </Routes>
        </BrowserRouter>
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
