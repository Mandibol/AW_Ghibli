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
    const filmReq = new XMLHttpRequest;  
    filmReq.open('GET','https://ghibliapi.herokuapp.com/films?limit=250');
    filmReq.onload = () => {
        filmsArray = JSON.parse(filmReq.responseText);
        let html = `<option value="NaN">Choose a film</option>`; 
        for (let i = 0; i < filmsArray.length; i++){
            html += `<option value="${filmsArray[i].id}">${filmsArray[i].title}</option>`;
        }
        filmsInput.innerHTML = html;
        console.log(filmsArray);
    };
    filmReq.send();

    const peopleReq = new XMLHttpRequest; 
    peopleReq.open('GET','https://ghibliapi.herokuapp.com/people?limit=250');
    peopleReq.onload = () => {
        let temp = (peopleReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        temp = (temp).replace(/https:\/\/ghibliapi.herokuapp.com\/species\//g,"");
        peopleArray = JSON.parse(temp);
        //populate hairColorInput
        const hairColorArray = [];
        peopleArray.forEach((person) => {
            if (!hairColorArray.includes(person.hair_color)){
                hairColorArray.push(person.hair_color);
            }
        });
        let html = `<option value="none">Choose a hair color</option>`; 
        for (let i = 0; i < hairColorArray.length; i++){
            html += `<option value="${hairColorArray[i]}">${hairColorArray[i]}</option>`;
        }
        hairColorInput.innerHTML = html;

        //populate eyeColorInput
        const eyeColorArray = [];
        peopleArray.forEach((person) => {
            if (!eyeColorArray.includes(person.eye_color)){
                eyeColorArray.push(person.eye_color);
            }
        });
        html = `<option value="none">Choose a eye color</option>`; 
        for (let i = 0; i < eyeColorArray.length; i++){
            html += `<option value="${eyeColorArray[i]}">${eyeColorArray[i]}</option>`;
        }
        eyeColorInput.innerHTML = html;

        //populate gender
        const genderArray = [];
        peopleArray.forEach((person) => {
            if (!genderArray.includes(person.gender)){
                genderArray.push(person.gender);
            }
        });
        html = `<option value="none">Choose a gender</option>`; 
        for (let i = 0; i < genderArray.length; i++){
            html += `<option value="${genderArray[i]}">${genderArray[i]}</option>`;
        }
        genderInput.innerHTML = html;

    };
    peopleReq.send();

    const speciesReq = new XMLHttpRequest;  
    speciesReq.open('GET','https://ghibliapi.herokuapp.com/species?limit=250');
    speciesReq.onload = () => {
        const temp = (speciesReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        speciesArray = JSON.parse(temp);
        //populate species input
        let html = `<option value="none">Choose a specie</option>`; 
        for (let i = 0; i < speciesArray.length; i++){
            html += `<option value="${speciesArray[i].id}">${speciesArray[i].name}</option>`;
        }
        speciesInput.innerHTML = html;
        console.log(speciesArray);
    };
    speciesReq.send();

    const locationsReq = new XMLHttpRequest;  
    locationsReq.open('GET','https://ghibliapi.herokuapp.com/locations?limit=250');
    locationsReq.onload = () => {
        let temp = (locationsReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        temp = (temp).replace(/https:\/\/ghibliapi.herokuapp.com\/people\//g,"");
        locationsArray = JSON.parse(temp);
    };
    locationsReq.send();

    const vehiclesReq = new XMLHttpRequest;  
    vehiclesReq.open('GET','https://ghibliapi.herokuapp.com/vehicles?limit=250');
    vehiclesReq.onload = () => {
        const temp = (vehiclesReq.responseText).replace(/https:\/\/ghibliapi.herokuapp.com\/films\//g,"");
        vehiclesArray = JSON.parse(temp);
    };
    vehiclesReq.send();

    function sortPeople(){
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

        //print sortedPeopleArray to html
        let html = ""
        sortedPeopleArray.forEach((person) => {
            const movie = filmsArray.find(obj => obj.id === person.films[0]);
            const specie = speciesArray.find(obj => obj.id === person.species);
            html += `<div class="box">`  
            html += `<h3>${person.name}</h3>`;
            html += `<p>`
            html += `<span>Movie:</span> ${movie.title} <br>`;
            html += `<span>Gender:</span> ${person.gender} <br>`;
            if (specie !== undefined){
                html += `<span>Species:</span> ${specie.name} <br>`;    
            }
            html += `<span>Age:</span> ${person.age} <br> `;
            html += `<span>Eye color:</span> ${person.eye_color} <br>`;
            html += `<span>Hair color:</span> ${person.hair_color} <br>`;
            html += `</p>`;
            html += `</div>`            
        });  
        peopleOutput.innerHTML = html;

    }
    speciesInput.addEventListener("input", () => {sortPeople();});
    hairColorInput.addEventListener("input", () => {sortPeople();});
    eyeColorInput.addEventListener("input", () => {sortPeople();});
    genderInput.addEventListener("input", () => {sortPeople();});

    





    filmsInput.addEventListener("input", () => {
        let html = "";
        if (filmsInput.value !== "NaN"){
            const filmObj = filmsArray.find(obj => obj.id === filmsInput.value);
            html += `<img src="${filmObj.movie_banner}" alt="movieposter">`;
            html += `<h2>${filmObj.title}</h2>`;
            html += `<section id="description">`;
            html += `<img style="float:right; width:30%; margin-left: 8px;" src="${filmObj.image}" alt="movieposter">`;
            html += `<p><span>Orginal title:</span> ${filmObj.original_title}</p>`;
            html += `<p><span>Orginal title romanised:</span>  ${filmObj.original_title_romanised}</p>`;
            html += `<p><span>Release Date:</span>  ${filmObj.release_date}</p>`;
            html += `<p><span>Director:</span>  ${filmObj.director}</p>`;
            html += `<p><span>Producer:</span>  ${filmObj.producer}</p>`;
            html += `<p><span>Running Time:</span>  ${filmObj.running_time} minutes</p>`;
            html += `<p><span>Rotten Tomate Score:</span>  ${filmObj.rt_score}</p>`
            html += `<p><span>Description:</span>  ${filmObj.description}</p>`;
            html += `</section>`;      

            //Lista species
            const specieArray = speciesArray.filter( obj => obj.films.includes(filmsInput.value));
            specieArray.forEach((specie) => {
                const temp = peopleArray.filter( obj => obj.films.includes(filmsInput.value));
                const personArray = temp.filter( obj => obj.species.includes(specie.id));
                if (personArray[0]) {
                    html += `<h2>${specie.name}s</h2>`;
                    html += '<section>'
                    personArray.forEach((person) => {
                        html += `<div class="box">`
                        html += `<h3>${person.name}</h3>`;
                        html += `<p>`
                        html += `<span>Gender:</span> ${person.gender} <br>`;
                        html += `<span>Age:</span> ${person.age} <br> `;
                        html += `<span>Eye color:</span> ${person.eye_color} <br>`;
                        html += `<span>Hair color:</span> ${person.hair_color} <br>`;
                        html += `</p>`;
                        html += `</div>`
                    });  
                    html += '</section>'    
                }
                
            });

            //Lista Fordon
            const vehicleArray = vehiclesArray.filter( obj => obj.films.includes(filmsInput.value));
            if (vehicleArray[0]) {
                html += `<h2>Vehicles</h2>`;
                html += '<section>'
                vehicleArray.forEach((vehicle) => {
                    html += `<div class="box">`
                    html += `<h3>${vehicle.name}</h3>`;
                    html += '<p>'
                    html += `<span>Name:</span> ${vehicle.name}<br>`;
                    html += `<span>Class:</span> ${vehicle.vehicle_class}<br>`;
                    html += `<span>length:</span> ${vehicle.length}<br>`;
                    const pilot = peopleArray.find(obj => obj.id === vehicle.pilot.slice(39));
                    html += `<span>Pilot:</span> ${pilot.name}<br>`;
                    html += '</p>'
                    html += `</div>`
                });
                html += '</section>'
            }
            
            //Lista Platser
            const locationArray = locationsArray.filter( obj => obj.films.includes(filmsInput.value));
            if (locationArray[0]) {
                html += `<h2>Locations</h2>`;
                html += '<section>'
                locationArray.forEach((location) => {
                    html += `<div class="box">`
                    html += `<h3>${location.name}</h3>`;
                    html += '<p>'
                    html += `<span>Climate:</span> ${location.climate} <br>`;
                    html += `<span>Terrain:</span> ${location.terrain} <br>`;
                    html += `<span>Surface Water:</span> ${location.surface_water}`;
                    html += '</p>'
                    if (location.residents[0] !== "TODO") {
                        html += '<h4>Residents:</h4>'
                        html += '<p>'
                        location.residents.forEach((resident) => {
                            const person = peopleArray.find(obj => obj.id === resident);
                            if (person) html += `${person.name}<br>`;
                        });
                        html += '</p>';
                    }
                    html += `</div>`
                });
                html += '</section>'
            }      
        }
        filmsOutput.innerHTML = html;
        //Gör slidetogglar alla element som följer en h2 rubrik när du trycker på den
        $("h2").click(function(){
        $(this).next("section").slideToggle("slow");
        $("#description").css("display", "block");
    });
    });
};