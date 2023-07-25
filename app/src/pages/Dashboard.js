import PetDetail from "../components/petDetail/PetDetail";
import {useSelector} from "react-redux";

import {updateStatus} from "../components/updatePet/updateFormSlice";
import UpdateForm from "../components/updatePet/UpdateFrom";
import PetsList from "../components/pets/PetsList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";

export default function Dashboard({itemsList}){
    const detailViewIsOpen = useSelector(state => state.petDetail.detailOpen);
    const updateIsOpen = useSelector(updateStatus)
    const auth = getAuth();
    const nav = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            getIdToken(user)
        } else {
               nav('/login')
        }
        });
    const getIdToken= async (user)=>{
        const token=await user.getIdToken()
        console.log(token)
    }



    return (
        <div className="Dashboard">

            <PetsList />
            {detailViewIsOpen && <PetDetail />}
            {updateIsOpen && <UpdateForm />}
        </div>
    );
}