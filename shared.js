let modeSwitch = document.querySelector(".modeSwitch");
let apiURL = "https://restcountries.com/v2/";
let countriesData = [];
let countriesAll = document.querySelectorAll(".country");
let detailedCountryId = "";

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
  let mainDiv = modeSwitch.parentElement.parentElement.parentElement;
  mainDiv.classList.toggle("lightMode");
  mainDiv.classList.toggle("darkMode");
});
