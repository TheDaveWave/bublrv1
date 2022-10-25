import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function PageDisplay() {

    // console.log(window.location.pathname);
    let path = window.location.pathname.replace('/', '');
    // console.log(path);
    let pageName = path.charAt(0).toUpperCase() + path.slice(1);
    // console.log(pageName);

    return (
        <Box>
            <Typography>
                {pageName}
            </Typography>
        </Box>
    );
}

export default PageDisplay;