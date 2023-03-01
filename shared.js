let modeSwitch = document.querySelector(".modeSwitch");
let apiURL = "https://restcountries.com/v2/";
let countriesData = [];
let countriesAll = document.querySelectorAll(".country");
let detailedCountryId = "";
let mainDiv = document.getElementById("main");

let currMode = sessionStorage.getItem('currMode');

if(currMode !== undefined){
  if(currMode === 'lightMode'){
    mainDiv.classList.add('lightMode');
    mainDiv.classList.remove('darkMode');
  }else{
    mainDiv.classList.remove('lightMode');
    mainDiv.classList.add('darkMode');
  }
}


let sessionObj;
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

modeSwitch.addEventListener("click", (e) => {
  // let mainDiv = modeSwitch.parentElement.parentElement.parentElement;
  mainDiv.classList.toggle("lightMode");
  mainDiv.classList.toggle("darkMode");
  currMode = mainDiv.classList[0];
  sessionStorage.setItem("currMode", currMode);
});
