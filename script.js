/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = this.document.getElementById('form');
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const missionTarget = document.getElementById("missionTarget");
         let index = 0;
         form.addEventListener("submit", function() {
            missionTarget.innerHTML = `
               <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
               </ol>
               <img src="${json[index].image}">
            `; 
            index = (index + 1) % json.length;
        })

      })
   })
   
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let inputArray = [pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput];
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let faultyItems = document.getElementById("faultyItems");
      let fuelStatus = document.getElementById("fuelStatus");
      let launchStatus = document.getElementById("launchStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      for (let i = 0; i < inputArray.length; i++) {
         if (inputArray[i].value === '') {
           alert("All fields are required!");
           event.preventDefault();
           break;
         }
      }

      if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Incorrect input. Please enter a number for fuel level or cargo mass.");
         event.preventDefault();
      } else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
            alert("Incorrect input. Please enter a name for pilot or copilot.");
            event.preventDefault();
       } else {
            pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} Ready`;
            copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} Ready`;
       }

       if (Number(fuelLevelInput.value) < 10000) {
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
            launchStatus.style.color = 'red';
            launchStatus.innerHTML = `Shuttle Not Ready For Launch`;
            event.preventDefault();
       } else if (Number(cargoMassInput.value) > 10000) {
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerHTML = `There is too much mass for the shuttle to takeoff.`;
            launchStatus.style.color = 'red';
            launchStatus.innerHTML = `Shuttle Not Ready For Launch`;
            event.preventDefault();
       } else {
            faultyItems.style.visibility = 'visible';
            launchStatus.style.color = 'green';
            launchStatus.innerHTML = `Shuttle Is Ready For Launch`;
            event.preventDefault();
       }

       

       
       




       
      



   })
})
