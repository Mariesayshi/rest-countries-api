let countryTemp = document.querySelector(".countryTemp");
let countriesCont = document.querySelector(".countries");
let search = document.querySelector(".search");
let searchInput = document.querySelector(".searchInput");
let searchValue = "";
const filter = document.querySelector(".filter");
const filterOps = document.querySelector(".filterOps");

const fillShortInfoData = (elem, obj) => {
  elem.children[0].style.backgroundImage = `url(${obj.flag})`;
  elem.children[1].children[0].innerHTML = obj.name;
  elem.children[1].children[1].children[0].innerHTML = obj.population;
  elem.children[1].children[2].children[0].innerHTML = obj.region;
  elem.children[1].children[3].children[0].innerHTML = obj.capital;
  elem.id = obj.name;
  elem.href = `${elem.href}?country=${encodeURIComponent(obj.name)}`;
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

const filterByRegion = (region) => {
  for (let elem of countriesAll) {
    elem.classList.add("hide");
  }
  for (let country of countriesAll) {
    let countryRegionElem = country.querySelector('.regionData');
    if (countryRegionElem.innerText.toLowerCase() === region) {
      country.classList.remove("hide");
    }
  }
};

window.addEventListener("click", (e) => {
  for (let elem of e.composedPath()) {
    if (elem.classList) {
      if (elem.classList.contains("filter")) {
        filterOps.classList.toggle("show");
      } else if (elem.classList.contains("filterOp")) {
        let region = elem.id;
        filterByRegion(region);
      }
    }
  }
});
