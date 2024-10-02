import {NavLink} from "react-router-dom";
import React from "react";
const Header = () => {
    return (
        <nav>
            <NavLink to="/" style={{marginRight: '10px'}}>Создание формы</NavLink>
            <NavLink to="/view">Просмотр формы</NavLink>
        </nav>
    )
}
export default Header