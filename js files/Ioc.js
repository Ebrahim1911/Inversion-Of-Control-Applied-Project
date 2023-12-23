//Class#1
class ApiService {
  constructor(api) {
    this.api = api;
  }
  //Fetching Data
  async fetchData() {
    // Perform API call and return data
    const response = await fetch(this.api);
    const data = await response.json();
    return data;
  }
}
// DisplayData focuses on displaying data, without knowing the data's source.
//Class#2
class DisplayData {
  constructor(apiService) {
    this.apiService = apiService;
  }
  async display() {
    const data = await this.apiService.fetchData();
    return data;
  }
}
// Inject ApiService dependency
const apiService = new ApiService("https://api.adviceslip.com/advice");
const data = new DisplayData(apiService);
console.log(data.display());
//Data Displaying
const btn = document.querySelector(".button");
const advice = document.querySelector(".advice");
btn.addEventListener("click", async () => {
  advice.textContent = "";
  const result = await data.display();
  adviceText = result.slip.advice;
  let i = 0;
  let interval = setInterval(function () {
    advice.textContent += adviceText[i];
    advice.style.cssText =
      "margin:3rem auto;color:hsl(210, 100%, 65%);font-size:1.5rem";
    i++;
    if (i === adviceText.length) {
      clearInterval(interval);
    }
  }, 45);
});
