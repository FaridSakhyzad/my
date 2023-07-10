import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "./redux/user/actions";

const Layout = ({children}) => {
    const dispatch = useDispatch();

    dispatch(getUser());

    return children
}

export default Layout;
