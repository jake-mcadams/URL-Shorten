//Variables
const submitButton = document.getElementById("shorten_button");
const urlInput = document.getElementById("fullUrl");
const login = document.getElementById('login')


//functions
const createUrlLink = (longUrl) => {
  const apiId = config.API_ID;
  const grpID = config.GROUP_ID;
  const fetchUrl = "https://api-ssl.bitly.com/v4/shorten";
  const headers = {
    'Authorization': 'Bearer' + apiId,
    'Content-Type': 'application/json',
  };

  let payload = {
      //'domain': 'bit.ly',
      //'title': '',
      //'tags': ['',''],
      'group_guid': grpID,
      'long_url': longUrl
  }

  let params = {
      'method': 'POST',
      'headers': 'headers',
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true
  }

  let response = UrlFetchApp.fetch(fetchUrl, params);
  let shortUrl = JSON.parse(response.getContentText()).link;
};

//create link object

const urlLink = {
  fullUrl: urlInput.value,
  shortLink: "test",
};

//main

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (urlInput.value === null || urlInput.value === "") {
    urlInput.setAttribute("placeholder", "Please input a URL...");
    urlInput.classList.add("input_error");
    // createUrlLink();
    let test = fetch("http://www.google.com/");
    console.log(test)
  }
});

urlInput.addEventListener("input", () => {
  urlInput.setAttribute("placeholder", "Shorten a link here...");
  urlInput.classList.remove("input_error");
});


const testingFetch =()=>{
  fetch('localhost:5000/testing')
  .then(response=> response.text)
}

login.addEventListener('click', testingFetch())