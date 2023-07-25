const getUserPets = async ({}) => {
    const res = await fetch("http://localhost:3001/pets/all", {
        method: 'GET'
    });
    const data=await res.json()
    console.log("fukcu ")
    return res.json();
};



const addPet = async ({     
                          token,
                          petName,
                          species,
                          breed,
                          gender,
                          age,
                          picture,
                          description,
                          houseTrained,
                          furType,
                          size,
                          spayed,
                          petPersonality,
                          postCode,
                          reason,
                          length,
                          email,
                          firstName,
                          lastName,
                          phoneNumber,
                          postalCode,
                          city,
                          province
                      }) => {
    const res = await fetch("http://localhost:3001/pets", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            petName,
            species,
            breed,
            gender,
            age,
            picture,
            description,
            houseTrained,
            furType,
            size,
            spayed,
            petPersonality,
            postCode,
            reason,
            length,
            email,
            firstName,
            lastName,
            phoneNumber,
            postalCode,
            city,
            province
        })
    });

    const data = await res.json();
    if (!res.ok) {
        const error = data?.message;
        throw new Error (error);
    }
    return data;
};

const deletePet = async ({id}) => {
    console.log(`http://localhost:3001/pets/${id}`);
    const res = await fetch(`http://localhost:3001/pets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    if (!res.ok) {
        const error = data?.message;
        throw new Error (error);
    }
    return data;
};

const getSearchResults = async ({searchTerm, sortTerm}) => {
    const res = await fetch(`http://localhost:8080/pets/search?query=${searchTerm}&sort=${sortTerm}`, {
        method: 'GET'
    });
    return res.json();
};

export default {
    getUserPets,
    addPet,
    deletePet,
    getSearchResults
};