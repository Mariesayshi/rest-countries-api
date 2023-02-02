let countryTemp = document.querySelector(".countryTemp");
let countriesCont = document.querySelector(".countries");
let countryDetailed = document.querySelector(".countryDetailed");
let search = document.querySelector(".search");
let searchInput = document.querySelector(".searchInput");
let modeSwitch = document.querySelector(".modeSwitch");
let apiURL = "https://restcountries.com/v2/";
let countriesData = [];
let countriesAll = document.querySelectorAll(".country");
let searchValue = "";
let borderCountryTemp = document.querySelector(".borderCountryTemp");
let borderCountries = document.querySelector(".borderCountries");
let borderCountriesHeading = document.querySelector(".borderCountriesHeading");
let backBtn = document.querySelector(".backBtn");

const getData = async (keyword) => {
  try {
    let res = await fetch(`${apiURL}${keyword}`);
    let resJson = await res.json();
    return resJson;
  } catch (err) {
    return err;
  }
  //   other option
  //   return new Promise((resolve, reject) => {
  //     fetch(`${apiURL}${keyword}`)
  //       .then((res) => res.json())
  //       .then((res) => resolve(res))
  //       .catch((err) => reject(err));
  //   });
};

const refreshResultPage = async (keyword) => {
  countriesData = await getData(keyword);
  for (let country of countriesData) {
    let newCountry = countryTemp.cloneNode(true);
    newCountry.classList.remove("countryTemp");
    newCountry.classList.add("country");
    countriesCont.appendChild(newCountry);
    fillCountryData(newCountry, country);
  }
  countriesAll = document.querySelectorAll(".country");
};

const fillCountryData = (elem, obj) => {
  elem.children[0].style.backgroundImage = `url(${obj.flag})`;
  elem.children[1].children[0].innerHTML = obj.name;
  elem.children[1].children[1].children[0].innerHTML = obj.population;
  elem.children[1].children[2].children[0].innerHTML = obj.region;
  elem.children[1].children[3].children[0].innerHTML = obj.capital;
  elem.id = obj.name;
};

const clearCountries = () => {
  countriesCont.innerHTML = "";
};

refreshResultPage("all");

window.addEventListener("keydown", (e) => {
  if (
    e.code === "Enter" &&
    document.activeElement === searchInput &&
    searchInput.value !== "" &&
    searchInput.value !== " "
  ) {
    searchValue = searchInput.value;
    clearCountries();
    refreshResultPage(`name/${searchValue}`);
  }
});

const fillDetailedCountryData = async (country, keyword) => {
  let res = await getData(`name/${keyword}`);
  let detailedCountryData = res[0];
  console.log(detailedCountryData);
  console.log(country.children);

  for (let child of country.children) {
    if (child.classList.contains("flagCont")) {
      child.style.backgroundImage = `url(${detailedCountryData.flag})`;
    }
    if (child.classList.contains("detailedInfo")) {
      child.querySelector(".countryName").innerHTML = detailedCountryData.name;
      child.querySelector(".nativeNameData").innerHTML =
        detailedCountryData.nativeName;
      child.querySelector(".populationData").innerHTML =
        detailedCountryData.population;
      child.querySelector(".regionData").innerHTML = detailedCountryData.region;
      child.querySelector(".subRegionData").innerHTML =
        detailedCountryData.subregion;
      child.querySelector(".capitalData").innerHTML =
        detailedCountryData.capital;
      child.querySelector(".domainData").innerHTML =
        detailedCountryData.topLevelDomain;
      child.querySelector(".currenciesData").innerHTML =
        detailedCountryData.currencies[0].name;
      for (let lang of detailedCountryData.languages) {
        if (detailedCountryData.languages.indexOf(lang) === 0) {
          child.querySelector(".languagesData").innerHTML += lang.name;
        } else {
          child.querySelector(".languagesData").innerHTML += `, ${lang.name}`;
        }
      }
      if(detailedCountryData.borders === undefined){
        borderCountriesHeading.classList.add('hide');
      }else { 
        for (let border of detailedCountryData.borders) {
          borderCountriesHeading.classList.add('show');
          addBorderCountries(border);
        }
      }
     
    }
  }
};

const addBorderCountries = async (cntr) => {
  try {
    let res = await fetch(`https://restcountries.com/v2/alpha?codes=${cntr}`);
    let resJson = await res.json();
    console.log(resJson[0].name)
    let newBorderCountry = borderCountryTemp.cloneNode(true);
    newBorderCountry.classList.remove('borderCountryTemp');
    newBorderCountry.classList.add('borderCountry');
    newBorderCountry.innerHTML = resJson[0].name;
    borderCountries.appendChild(newBorderCountry);
  } catch (err) {
    console.log(err);
  }
};


modeSwitch.addEventListener("click", (e) => {
  let mainDiv = modeSwitch.parentElement.parentElement.parentElement;
  mainDiv.classList.toggle("lightMode");
  mainDiv.classList.toggle("darkMode");
});

window.addEventListener("click", (e) => {
  let targetPath = e.composedPath();
  for (let elem of targetPath) {
    if (elem.classList) {
      if (elem.classList.contains("country")) {
        let countryId = elem.id;

        countriesCont.classList.add("hide");
        search.classList.add("hide");
        countryDetailed.classList.add("show");
        console.dir(countryDetailed.children);
        fillDetailedCountryData(countryDetailed, countryId);
      }
    }
  }
});

// backBtn.addEventListener('click',(e) => {
//   countriesCont.classList.remove("hide");
//         search.classList.remove("hide");
//         countryDetailed.classList.remove("show");
//         countryDetailed.querySelector('.languages').innerHTML = "";
// })


