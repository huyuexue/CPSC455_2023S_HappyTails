import {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import BasicSurvey from "./BasicSurvey";
import AboutYou from "./AboutYou";
import PetInfo from "./PetInfo";
import Preview from "./Preview";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {addPetAsync} from "../../../redux/pets/thunks";

const steps = ['Basic Survey', 'About You', 'Pet Info', 'Preview'];


export default function AddNewPet(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        petName:'',
        species:'',
        extra: false,
        otherSpecies: 'Please specify',
        breed: '',
        gender: '',
        ageYear: '',
        ageMonth: '',
        picture: null,
        description: '',
        houseTrained: '',
        furType: '',
        size: '',
        spayed: '',
        petPersonality: [],
        postcode: 'Please enter post code',
        reason:'',
        length:'',
        email:'',
        firstName:'',
        lastName:'',
        phoneNumber:'',
        postalCode:'',
        city:'',
        province:'',
        pictureName: '',
    });

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const handleNext = () => {
        checkFill();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const checkFill = () => {
        if (activeStep === 0) {
            if(formData.extra === false ){
                if(formData.species === '') {
                    return;
                }
            }else {
                if( !formData.otherSpecies || formData.otherSpecies === 'Please specify'){
                    return;
                }
            };
            if(!formData.spayed || !formData.reason || !formData.length){
                return;
            }
        } else if (activeStep === 1) {
            if (!formData.email || !formData.firstName || !formData.lastName || !formData.phoneNumber ||
                !formData.postalCode || !formData.city || !formData.province) {
                return;
            }
        } else if (activeStep === 2) {
            if (!formData.petName || !formData.breed || !formData.gender || !formData.ageYear ||! formData.ageMonth ||
                !formData.size || !formData.furType || !formData.houseTrained || !formData.postcode ||
                !formData.description || !formData.picture || formData.petPersonality.length === 0) {
                return;
            }
        } else {
            return;
        }
        handleComplete();
    }

    const handleBack = () => {
        checkFill();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        checkFill();
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
    };

    const jumpToPage = (page) => {
        setActiveStep(page);
    };

    const handleChange = (e, updatedFormData) => {
        if (e === "setPetPersonality") {
            console.log(updatedFormData.petPersonality);
            setFormData((prevData) => ({
                ...prevData,
                petPersonality: updatedFormData.petPersonality,
            }));
        } else if (e === "setHouseTrained") {
            setFormData((prevData) => ({
                ...prevData,
                houseTrained: updatedFormData.houseTrained,
            }));
        }
        else {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = () => {
        if (Object.keys(completed).length !== 3) {
            return;
        }
        dispatch(addPetAsync({
            petName:formData.petName,
            species: (formData.extra === true) ? formData.otherSpecies : formData.species,
            breed: formData.breed,
            gender: formData.gender,
            age: formData.ageYear*12 +formData.ageMonth,
            picture: formData.picture,
            description: formData.description,
            houseTrained: (formData.houseTrained === 'yes'),
            furType: formData.furType,
            size: formData.size,
            petPersonality: formData.petPersonality,
            spayed: formData.spayed,
            postCode: formData.postcode,
            /*reason: formData.reason,
            length: formData.length,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            postalCode: formData.postalCode,
            city: formData.city,
            province: formData.province,*/
        //TODO: check if we need these since use need to login
        }));
        navigate('/');//TODO: navigate to user dashboard
    }

    const setExtra = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            ["extra"]: e,
        }));
        if (e === false) {
            setFormData((prevData) => ({
                ...prevData,
                ["otherSpecies"]: 'Please specify',
            }));
        }
    }
    const onOtherSpeciesFocus = () => {
        setFormData((prevData) => ({
            ...prevData,
            ["otherSpecies"]: '',
        }));

    };

    const onPostcodeFocus = () => {
        setFormData((prevData) => ({
            ...prevData,
            ["postcode"]: '',
        }));

    };

    const onPhotoChanged = (e, fileName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataURL = event.target.result;
                setFormData((prevData) => ({
                    ...prevData,
                    ["picture"]: imageDataURL,
                    ["pictureName"]: fileName,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const subForms = [
        <BasicSurvey formData={formData} handleChange={handleChange} setExtra={setExtra}
                     onOtherSpeciesFocus={onOtherSpeciesFocus}/>,
        <AboutYou formData={formData} handleChange={handleChange}/>,
        <PetInfo formData={formData} handleChange={handleChange} onPhotoChanged={onPhotoChanged} onPostcodeFocus={onPostcodeFocus}/>,
        <Preview formData={formData} jumpToPage={jumpToPage}/>,
    ]

    return (
        <Box sx={{width: '100%'}}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Fragment>
                    {subForms[activeStep]}
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}>
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button disabled={activeStep === 3} onClick={handleNext} sx={{mr: 1}}>
                            Next
                        </Button>

                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button disabled={activeStep !== 3} onClick={handleSubmit} sx={{mr: 1}}>
                            {activeStep === 3
                                ? 'Submit'
                                : ''}
                        </Button>
                    </Box>
                </Fragment>
            </div>
        </Box>
    );
}