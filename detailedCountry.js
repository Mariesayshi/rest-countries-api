let countryDetailed = document.querySelector(".countryDetailed");
let borderCountryTemp = document.querySelector(".borderCountryTemp");
let borderCountries = document.querySelector(".borderCountries");
let borderCountriesHeading = document.querySelector(".borderCountriesHeading");
let backBtn = document.querySelector(".backBtn");


detailedCountryId = sessionStorage.getItem('detailedCountryId');

const fillDetailedCountryData = async (country, keyword) => {
    console.log(detailedCountryId);
    let res = await getData(`name/${keyword}`);
    let detailedCountryData = res[0];
    
  
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
        if (detailedCountryData.borders === undefined) {
          borderCountriesHeading.classList.add("hide");
        } else {
          for (let border of detailedCountryData.borders) {
            borderCountriesHeading.classList.add("show");
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
      let newBorderCountry = borderCountryTemp.cloneNode(true);
      newBorderCountry.classList.remove("borderCountryTemp");
      newBorderCountry.classList.add("borderCountry");
      newBorderCountry.innerHTML = resJson[0].name;
      borderCountries.appendChild(newBorderCountry);
    } catch (err) {
      console.log(err);
    }
  };

  fillDetailedCountryData(countryDetailed, detailedCountryId);
