window.onload = () =>{
    const filmsInput = document.getElementById("filmsInput");
    const filmsOutput = document.getElementById("filmsOutput");
    const speciesInput = document.getElementById("speciesInput");
    const hairColorInput = document.getElementById("hairColorInput");
    const eyeColorInput = document.getElementById("eyeColorInput");
    const genderInput = document.getElementById("genderInput");
    const peopleOutput = document.getElementById("peopleOutput");


    let filmsArray = [];
    let peopleArray = [];
    let speciesArray = [];
    let locationsArray = [];
    let vehiclesArray = [];

    //Create Arrays

    //filmsArray
    const filmReq = new XMLHttpRequest;  
    filmReq.open('GET','https://ghibliapi.herokuapp.com/films?limit=250');
    filmReq.onload = () => {
        filmsArray = JSON.parse(filmReq.responseText);
        let option = document.createElement("option");
        option.innerHTML = "Choose a film";
        option.setAttribute("value","none");
        filmsInput.appendChild(option);
        for (let i = 0; i < filmsArray.length; i++){
            option = document.createElement("option");
            option.innerHTML = filmsArray[i].title;
            option.setAttribute("value",filmsArray[i].id);
            filmsInput.appendChild(option);
        }
    };
    filmReq.send();

    //peopleArray
    const peopleReq = new XMLHttpRequest; 
    peopleReq.open('GET','https://ghibliapi.herokuapp.com/people?limit=250');
    peopleReq.onload = () => {
        peopleArray = (peopleReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        peopleArray = (peopleArray).replace(/https:\/\/ghibliapi.herokuapp.com\/species\//g,"");
        peopleArray = JSON.parse(peopleArray);

        //populate hairColorInput
        const hairColorArray = [];
        peopleArray.forEach((person) => {
            if (!hairColorArray.includes(person.hair_color)){
                hairColorArray.push(person.hair_color);
            }
        });
        let option = document.createElement("option");
        option.innerHTML = "Choose a hair";
        option.setAttribute("value","none");
        hairColorInput.appendChild(option); 
        for (let i = 0; i < hairColorArray.length; i++){
            option = document.createElement("option");
            option.innerHTML = hairColorArray[i];
            option.setAttribute("value",hairColorArray[i]);
            hairColorInput.appendChild(option); 
        }

        //populate eyeColorInput
        const eyeColorArray = [];
        peopleArray.forEach((person) => {
            if (!eyeColorArray.includes(person.eye_color)){
                eyeColorArray.push(person.eye_color);
            }
        });
        option = document.createElement("option");
        option.innerHTML = "Choose a eye color";
        option.setAttribute("value","none");
        eyeColorInput.appendChild(option); 
        for (let i = 0; i < eyeColorArray.length; i++){
            option = document.createElement("option");
            option.innerHTML = eyeColorArray[i];
            option.setAttribute("value",eyeColorArray[i]);
            eyeColorInput.appendChild(option);
        }

        //populate genderInput
        const genderArray = [];
        peopleArray.forEach((person) => {
            if (!genderArray.includes(person.gender)){
                genderArray.push(person.gender);
            }
        });
        option = document.createElement("option")
        option.innerHTML = "Choose a gender";
        option.setAttribute("value","none");
        genderInput.appendChild(option); 
        html = `<option value="none">Choose a gender</option>`; 
        for (let i = 0; i < genderArray.length; i++){
            option = document.createElement("option")
            option.innerHTML = genderArray[i];
            option.setAttribute("value",genderArray[i]);
            genderInput.appendChild(option);
        }
    };
    peopleReq.send();

    //speciesArray
    const speciesReq = new XMLHttpRequest;  
    speciesReq.open('GET','https://ghibliapi.herokuapp.com/species?limit=250');
    speciesReq.onload = () => {
        speciesArray = (speciesReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        speciesArray = JSON.parse(speciesArray);

        //populate species input
        let option = document.createElement("option")
        option.innerHTML = "Choose a species";
        option.setAttribute("value","none");
        speciesInput.appendChild(option); 
        for (let i = 0; i < speciesArray.length; i++){
            option = document.createElement("option")
            option.innerHTML = speciesArray[i].name;
            option.setAttribute("value",speciesArray[i].id);
            speciesInput.appendChild(option)
        }
    };
    speciesReq.send();

    //locationsArray
    const locationsReq = new XMLHttpRequest;  
    locationsReq.open('GET','https://ghibliapi.herokuapp.com/locations?limit=250');
    locationsReq.onload = () => {
        locationsArray = (locationsReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        locationsArray = (locationsArray).replace(/https:\/\/ghibliapi.herokuapp.com\/people\//g,"");
        locationsArray = JSON.parse(locationsArray);
    };
    locationsReq.send();

    //vehiclesArray
    const vehiclesReq = new XMLHttpRequest;  
    vehiclesReq.open('GET','https://ghibliapi.herokuapp.com/vehicles?limit=250');
    vehiclesReq.onload = () => {
        vehiclesArray = (vehiclesReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        vehiclesArray = JSON.parse(vehiclesArray);
    };
    vehiclesReq.send();

    // Sort by Character
    function sortPeople(){
        peopleOutput.innerHTML = "";
        
        let sortedPeopleArray = peopleArray;
        if (speciesInput.value !== "none"){
            sortedPeopleArray = sortedPeopleArray.filter(obj => obj.species === speciesInput.value);            
        }
        if (hairColorInput.value !== "none"){
            sortedPeopleArray = sortedPeopleArray.filter( obj => obj.hair_color === hairColorInput.value);
        }
        if (eyeColorInput.value !== "none"){
            sortedPeopleArray = sortedPeopleArray.filter( obj => obj.eye_color === eyeColorInput.value);
        }
        if (genderInput.value !== "none"){
            sortedPeopleArray = sortedPeopleArray.filter( obj => obj.gender === genderInput.value);
        }
        printPeopleTable(sortedPeopleArray);
    }

    function printPeopleTable(array) {
        //Create Table from sortedPeople Array
        let personTable = document.createElement("table");
        personTable.setAttribute("id","personTable");
        //header
        let tHead = personTable.createTHead();
        let row = tHead.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = "Name";
        cell = row.insertCell();
        cell.innerHTML = "Gender";
        cell = row.insertCell();
        cell.innerHTML = "Specie";
        cell = row.insertCell();
        cell.innerHTML = "Age";
        cell = row.insertCell();
        cell.innerHTML = "Eye Color";
        cell = row.insertCell();
        cell.innerHTML = "Hair Color";
        cell = row.insertCell();
        cell.innerHTML = "Film";

        let tBody = personTable.createTBody();
        array.forEach((person) => {
            const film = filmsArray.find(obj => obj.id === person.films[0]);
            const specie = speciesArray.find(obj => obj.id === person.species);
            row = tBody.insertRow();
            row.addEventListener("click", () => {
                filmsInput.value = film.id;
                filmsInput.dispatchEvent(new Event('input'));
            });
            cell = row.insertCell();
            cell.innerHTML = person.name;
            cell = row.insertCell();
            cell.innerHTML = person.gender;
            cell = row.insertCell();
            cell.innerHTML = specie !== undefined ? specie.name:"N/A";
            cell = row.insertCell();
            cell.innerHTML = person.age.replace("Unspecified/","");
            cell = row.insertCell();
            cell.innerHTML = person.eye_color;
            cell = row.insertCell();
            cell.innerHTML = person.hair_color;
            cell = row.insertCell();
            cell.innerHTML = film.title;
        });

        peopleOutput.appendChild(personTable);

    }

    speciesInput.addEventListener("input", () => {sortPeople();});
    hairColorInput.addEventListener("input", () => {sortPeople();});
    eyeColorInput.addEventListener("input", () => {sortPeople();});
    genderInput.addEventListener("input", () => {sortPeople();});

    

    //Display film information
    filmsInput.addEventListener("input", () => {
        filmsOutput.innerHTML = "";
        if (filmsInput.value !== "none"){
            const filmObj = filmsArray.find(obj => obj.id === filmsInput.value);
            let banner = document.createElement("img")
            banner.setAttribute("src", filmObj.movie_banner);
            banner.setAttribute("alt", "movieposter");
            filmsOutput.appendChild(banner);
            let table = document.createElement("table");
            //Header
            let row = table.insertRow();
            let cell = row.insertCell();
            cell.setAttribute("colspan",2);
            cell.innerHTML = `<h2>${filmObj.title}</h2>`;
            //Info
            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Orginal title:</span> ${filmObj.original_title}</p>`;
            cell = row.insertCell();
            cell.setAttribute("rowspan",7)
            cell.setAttribute("width","7em")
            cell.innerHTML = `<img style="width: 10em" src="${filmObj.image}" alt="movieposter">`;

            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Orginal title romanised:</span>  ${filmObj.original_title_romanised}</p>`;

            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Release Date:</span>  ${filmObj.release_date}</p>`;

            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Director:</span>  ${filmObj.director}</p>`;

            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Producer:</span>  ${filmObj.producer}</p>`;

            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Running Time:</span>  ${filmObj.running_time} minutes</p>`;

            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<p><span>Rotten Tomate Score:</span>  ${filmObj.rt_score}</p>`

            row = table.insertRow();
            cell = row.insertCell();
            cell.setAttribute("colspan",2);
            cell.innerHTML = `<p><span>Description:</span>  ${filmObj.description}</p>`;
            filmsOutput.appendChild(table); 

            //List species and characters
            const specieArray = speciesArray.filter( obj => obj.films.includes(filmsInput.value));
            specieArray.forEach((specie) => {
                const temp = peopleArray.filter( obj => obj.films.includes(filmsInput.value));
                const personArray = temp.filter( obj => obj.species.includes(specie.id));

                if (personArray[0]) {
                    details = document.createElement("details");
                    details.innerHTML += `<summary>${specie.name}s</summary>`;
                    filmsOutput.appendChild(details);

                    let table = document.createElement("table");
                    //header
                    let tHead = table.createTHead();
                    let row = tHead.insertRow();
                    let cell = row.insertCell();
                    cell.innerHTML = "Name";
                    cell = row.insertCell();
                    cell.innerHTML = "Gender";
                    cell = row.insertCell();
                    cell.innerHTML = "Age";
                    cell = row.insertCell();
                    cell.innerHTML = "Eye Color";
                    cell = row.insertCell();
                    cell.innerHTML = "Hair Color";
                    let tBody = table.createTBody();

                    personArray.forEach((person) => {
                        row = tBody.insertRow();
                        cell = row.insertCell();
                        cell.innerHTML = person.name;
                        cell = row.insertCell();
                        cell.innerHTML = person.gender;
                        cell = row.insertCell();
                        cell.innerHTML = person.age.replace("Unspecified/","");
                        cell = row.insertCell();
                        cell.innerHTML = person.eye_color;
                        cell = row.insertCell();
                        cell.innerHTML = person.hair_color;
                    });  
                    details.appendChild(table);  
                }   
            });

            //List Fordon
            const vehicleArray = vehiclesArray.filter( obj => obj.films.includes(filmsInput.value));
            if (vehicleArray[0]) {
                details = document.createElement("details");
                details.innerHTML += `<summary>Vehicles</summary>`;
                filmsOutput.appendChild(details);

                let table = document.createElement("table");
                //header
                let tHead = table.createTHead();
                let row = tHead.insertRow();
                let cell = row.insertCell();
                cell.innerHTML = "Name";
                cell = row.insertCell();
                cell.innerHTML = "Class";
                cell = row.insertCell();
                cell.innerHTML = "Length";
                cell = row.insertCell();
                cell.innerHTML = "Pilot";
                let tBody = table.createTBody();

                vehicleArray.forEach((vehicle) => {
                    row = tBody.insertRow();
                    cell = row.insertCell();
                    cell.innerHTML = vehicle.name;
                    cell = row.insertCell();
                    cell.innerHTML = vehicle.vehicle_class;
                    cell = row.insertCell();
                    cell.innerHTML = vehicle.length;
                    cell = row.insertCell();
                    const pilot = peopleArray.find(obj => obj.id === vehicle.pilot.slice(39));
                    cell.innerHTML = pilot.name;
                });  
                details.appendChild(table);  
            }  
            
            
            //List Platser
            const locationArray = locationsArray.filter( obj => obj.films.includes(filmsInput.value));
            if (locationArray[0]) {
                details = document.createElement("details");
                details.innerHTML += `<summary>Locations</summary>`;
                filmsOutput.appendChild(details);

                let table = document.createElement("table");
                //header
                let tHead = table.createTHead();
                let row = tHead.insertRow();
                let cell = row.insertCell();
                cell.innerHTML = "Name";
                cell = row.insertCell();
                cell.innerHTML = "Climate";
                cell = row.insertCell();
                cell.innerHTML = "Terrain";
                cell = row.insertCell();
                cell.innerHTML = "Surface Water";
                cell = row.insertCell();
                cell.innerHTML = "Residents";
                let tBody = table.createTBody();

                locationArray.forEach((location) => {
                    row = tBody.insertRow();
                    cell = row.insertCell();
                    cell.innerHTML = location.name;
                    cell = row.insertCell();
                    cell.innerHTML = location.climate;
                    cell = row.insertCell();
                    cell.innerHTML = location.terrain;
                    cell = row.insertCell();
                    cell.innerHTML = location.surface_water;
                    cell = row.insertCell();
                    if (location.residents[0] !== "TODO") {
                        let html = '';
                        location.residents.forEach((resident) => {
                            const person = peopleArray.find(obj => obj.id === resident);
                            if (person) html += `${person.name}, `;
                        });
                        html += '</p>';
                        cell.innerHTML = html;
                    }
                });    
                details.appendChild(table);  
            }      
        }
    });
};