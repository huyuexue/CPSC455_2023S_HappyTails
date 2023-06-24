import {SelectPetProperties} from "../components/results/ComponentsPopulation";
import {Grid, Paper} from "@mui/material";
import PetResults from "../components/results/PetResults";


export default function BrowsePage() {
    return (
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <Paper elevation={8} sx={{
                    borderRadius: 0,
                    padding: 2,
                    height: "100vh",
                }}>
                    <SelectPetProperties></SelectPetProperties>
                </Paper>

            </Grid>

            <Grid item xs={8}>
                <PetResults></PetResults>
            </Grid>
        </Grid>
    )
}