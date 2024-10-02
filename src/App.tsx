import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FormBuilder from "./components/FormBuilder";
import FormViewer from "./components/FormViewer";
import Header from "./components/Header";


const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<FormBuilder/>}/>
                <Route path="/view" element={<FormViewer/>}/>
            </Routes>
        </Router>
    );
};

export default App;
