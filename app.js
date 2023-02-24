let countryTemp = document.querySelector(".countryTemp");
let countriesCont = document.querySelector(".countries");
let search = document.querySelector(".search");
let searchInput = document.querySelector(".searchInput");
let searchValue = "";




const fillShortInfoData = (elem, obj) => {
  elem.children[0].style.backgroundImage = `url(${obj.flag})`;
  elem.children[1].children[0].innerHTML = obj.name;
  elem.children[1].children[1].children[0].innerHTML = obj.population;
  elem.children[1].children[2].children[0].innerHTML = obj.region;
  elem.children[1].children[3].children[0].innerHTML = obj.capital;
  elem.id = obj.name;
};

const refreshResultPage = async (keyword) => {
  countriesData = await getData(keyword);
  for (let country of countriesData) {
    let newCountry = countryTemp.cloneNode(true);
    newCountry.classList.remove("countryTemp");
    newCountry.classList.add("country");
    countriesCont.appendChild(newCountry);
    fillShortInfoData(newCountry, country);
  }
  countriesAll = document.querySelectorAll(".country");
};

refreshResultPage("all");

const clearCountries = () => {
  countriesCont.innerHTML = "";
};

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




window.addEventListener("click", (e) => {
  let targetPath = e.composedPath();
  for (let elem of targetPath) {
    if (elem.classList) {
      if (elem.classList.contains("country")) {
        detailedCountryId = elem.id;
        sessionStorage.setItem('detailedCountryId', detailedCountryId);
      }
    }
  }
});




