import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// a component used on the nav bar to display the current page name.
function PageDisplay() {
    // instantiate this as a jank way to make the page name update.
    // having this line fixes the lag issue and immediately displays the 
    // current page correctly.
    const local = useLocation();
    // console.log(local);

    // get the current path and make it a readable page name.
    // this replace all gets rid of the slashes.
    let path = window.location.pathname.replaceAll('/', '');
    // takes out all the numbers.
    path = path.replaceAll(/[0-9]/g, '');
    // makes the first character uppercase.
    let pageName = path.charAt(0).toUpperCase() + path.slice(1);
    // console.log(pageName);

    useEffect(() => {
        // ensures the pathname is formatted on each page.
        path = window.location.pathname.replaceAll('/', '');
        path = path.replaceAll(/[0-9]/g, '');
        pageName = path.charAt(0).toUpperCase() + path.slice(1);
    }, [pageName]);

    useEffect(() => {
        // ensures pages that need to scoll have scroll enabled.
        let locale = window.location.pathname.replaceAll('/', '');
        locale = locale.replaceAll(/[0-9]/g, '');
        // console.log(locale);
        if(locale === 'fountains' || locale === 'fountain') {
            // console.log(locale);
        //   window.document.body.style.overflow = 'visible';
            window.document.body.classList.remove('noscroll');
        } else {
        //   console.log('failed', locale);
        //   window.document.body.style.overflow = 'hidden';
            // document.body.scrollTop = 65;
            window.scrollTo(65 , 0);
            window.document.body.classList.add('noscroll');
        }
      }, [pageName]);

    return (
        <Box>
            <Typography>
                {/* display the current page name */}
                {pageName}
            </Typography>
        </Box>
    );
}

export default PageDisplay;