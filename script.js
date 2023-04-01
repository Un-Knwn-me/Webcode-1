let newElement = document.createElement("h1");
newElement.setAttribute("class", "text-center");
newElement.innerText = "Find Your Nationality";
document.body.append(newElement);

let newElement1 = document.createElement("p");
newElement1.setAttribute("class", "text-center");
newElement1.textContent = "Enter a name below to find your 'Nationality'.";
document.body.append(newElement1);

let searchbox = document.createElement("div");
searchbox.setAttribute("class", "input-group mb-3");
searchbox.innerHTML = `<input type="text" class="form-control" placeholder="Enter a name" aria-describedby="button-addon2" style='text-transform:uppercase'>
<div class="input-group-append">
  <button class="btn btn-info" type="submit" onclick="findCountry()" id="button-addon2">Search</button>`;
document.body.append(searchbox);

var details = document.createElement("div");
details.setAttribute("class", "d-flex card-deck");
async function findCountry() {
  try {
    const name1 = document.querySelector("input").value;
    const name = name1.toUpperCase();
    const API_url = `https://api.nationalize.io/?name=${name}`;
    let response = await fetch(API_url, {
      method: "GET",
    });
    const data = await response.json();
    details.innerHTML = "";

    for (let i = 0; i < data.country.length; i++) {
      var countId = data.country[i].country_id;
      var prob = data.country[i].probability;
      
      var prob_per = (prob*100).toFixed(2);
      if (i < 2) {
        details.innerHTML += `
        <div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
          <div class="card-header">Probablity no: ${i + 1}</div>
          <div class="card-body">
          <h5 class="card-title">Name: ${name}</h5>
          <p class="card-text">Country code: ${countId}</p>
          <p class="card-text">Probablity: ${prob_per} %</p>
        </div>`;
      }
    }

    document.body.append(details);
  } catch (error) {
    console.log(error);
  }
}
