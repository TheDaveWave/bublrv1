import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PageDisplay() {

    // instantiate this as a jank way to make the page name update.
    const local = useLocation();

    // console.log(local);

    // console.log(window.location.pathname);
    let path = window.location.pathname.replaceAll('/', '');
    path = path.replaceAll(/[0-9]/g, '');
    console.log(path);
    let pageName = path.charAt(0).toUpperCase() + path.slice(1);
    // console.log(pageName);

    useEffect(() => {
        path = window.location.pathname.replaceAll('/', '');
        path = path.replaceAll(/[0-9]/g, '');
        console.log(path);
        pageName = path.charAt(0).toUpperCase() + path.slice(1);
    }, [pageName]);

    return (
        <Box>
            <Typography>
                {pageName}
            </Typography>
        </Box>
    );
}

export default PageDisplay;