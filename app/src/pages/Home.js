import PetsBrief from "../components/pets/PetsBrief";
import ButtonBar from "../components/elements/ButtonBar";
import {Grid, Stack, useMediaQuery, Box} from "@mui/material";
import React from "react";
import {faHouseChimney} from "@fortawesome/free-solid-svg-icons";
import {LargeIconButton} from "../components/elements/LargeIconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import BlogPosts from "../components/blog/BlogPosts";
import {SectionButtons, Sections} from "../components/Sections";


export default function Home() {
    const nav = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div className="Home">
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={0} sm={2}>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <PetsBrief/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box display="flex" flexDirection="column" alignItems="center" sx={{paddingTop: 5}}>
                        <Stack spacing={isSmallScreen ? 1 : 2} alignItems={isSmallScreen ? "center" : "flex-start"}
                               justifyContent={isSmallScreen ? "center" : "flex-start"}
                               direction={isSmallScreen ? "row" : "column"}>
                            <ButtonBar/>
                            <Link to="/addNewPet" style={{textDecoration: 'none'}}>
                                <LargeIconButton sx={{
                                    boxShadow: 3,
                                    width: isSmallScreen ? "100%" : 446,
                                    flexGrow: isSmallScreen ? 1 : 0,
                                    textAlign: isSmallScreen ? "center" : "left",
                                }}>
                                    <Stack spacing={1}>
                                        <FontAwesomeIcon icon={faHouseChimney} size={isSmallScreen ? "2x" : "5x"}/>
                                        <h3>Find a Home</h3>
                                    </Stack>
                                </LargeIconButton>
                            </Link>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item sm={12}>
                    <Sections elevation={0}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={4}
                        >
                            <h3 sx={{fontSize: "1.5rem"}}>Browse our selection of hundreds of adoptable pets</h3>
                            <SectionButtons variant="contained" onClick={() => nav("/browse")}>
                                <h2>Find your new friend</h2>
                            </SectionButtons>
                        </Stack>
                    </Sections>
                </Grid>

                <Grid item sm={12} sx={{paddingLeft: "10vw", paddingRight: "10vw", paddingBottom: "10vw"}}>
                    <BlogPosts></BlogPosts>
                </Grid>
            </Grid>
        </div>
    );
}