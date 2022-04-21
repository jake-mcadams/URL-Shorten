//Variables
const submitButton = document.getElementById("shorten_button");
const urlInput = document.getElementById("fullUrl");
const login = document.getElementById("login");
const linkContainer = document.getElementById("link_container");
// const copyButton = document.querySelectorAll('.copy-button');
const copyButtonList = document.getElementsByClassName("copy-button");
const testButton = document.getElementById("buttonTest");
const testAddEvent = document.getElementById("signUp");
const mainForm = document.getElementById("shorten");

//functions

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (urlInput.value === null || urlInput.value === "") {
    urlInput.setAttribute("placeholder", "Please input a URL...");
    urlInput.classList.add("input_error");
    return
  }
  // console.log(urlInput.value)
  const validUrlProtocol = (url = "") =>
    ["http://", "https://", "ftp://"].some((protocol) =>
      url.startsWith(protocol)
    );

  const validTopDomain = (url = "") =>
    [".com", ".org", ".net"].some((domain) => url.endsWith(domain));

  const validPro = validUrlProtocol(urlInput.value);
  const validDom = validTopDomain(urlInput.value);

  //check for spaces
  const spaceCheck =(v)=>{
    if(/s/.test(v)){
      return v.replace(/\s+/g, '');
    }else{
      return v
    }
  }
  //append .com
  if (!validDom) {
    // spaceCheck(urlInput.value);
    console.log(urlInput.value)
    contentPost(spaceCheck(urlInput.value).concat(".com"), validPro);
    //get content after post
    contentGet();
  } else {
    // console.log(contentPost(urlInput.value, validPro));
    contentPost(spaceCheck(urlInput.value), validPro);
    //get content after post
    contentGet();
  }

  //clear form after submit
  mainForm.reset();
});

//Adding protocol value after client side check. if false node will prepend protocol in the reponse
const contentPost = (url, protocol) => {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const myRequest = new Request("http://localhost:5000/ShortUrl", {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  fetch(myRequest, {
    body: JSON.stringify({
      fullUrl: url,
      hasProtocol: protocol,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json;
    })
    .then((data) => {
      console.log(typeof data);
    });
};

urlInput.addEventListener("input", () => {
  urlInput.setAttribute("placeholder", "Shorten a link here...");
  urlInput.classList.remove("input_error");
});

const contentGet = () => {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
  });

  const myRequest = new Request("http://localhost:5000/shortUrl", {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });

  fetch(myRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      for (let [key, value] of Object.entries(data)) {
        // value.forEach((e) => console.log(e));
        value.forEach((e) => {
          return createCard(e.full, e.short, e.id);
        });
        let shortID = document.querySelectorAll(".short_url");
        shortID.forEach((e) => {
          // console.log(e.firstChild.innerHTML);
        });
      }
      document.querySelectorAll(".copy-button").forEach((el) => {
        el.addEventListener("click", (e) => {
          console.log(e.target);

          let shortenedUrl = el.previousElementSibling.firstChild.innerHTML;
          copyShortUrl(shortenedUrl);

          console.log(shortenedUrl);
          let thisButton = e.target;
          if (thisButton.classList.contains("copied")) {
            thisButton.style.backgroundColor = "hsl(180, 66%, 49%)";
            thisButton.innerHTML = "Copy";
            thisButton.classList.remove("copied");
          } else {
            thisButton.style.backgroundColor = "hsl(257, 27%, 26%)";
            thisButton.innerHTML = "Copied!";
            thisButton.classList.add("copied");
          }
        });
      });
    });
};

//Create new card with fetched data
const createCard = (full, short, id) => {
  const urlContainer = document.createElement("div");
  const fullUlrDiv = document.createElement("div");
  const shortUrlDiv = document.createElement("div");
  const fullUrlLink = document.createElement("a");
  const shortUrlLink = document.createElement("a");
  const copyButton = document.createElement("button");
  const fullText = document.createTextNode(full);
  const shortText = document.createTextNode("http://" + short);
  const copyButtonText = document.createTextNode("Copy");

  //set attributes
  urlContainer.setAttribute("class", "test_url_shortened");
  fullUlrDiv.setAttribute("class", "full_url");
  shortUrlDiv.setAttribute("class", "short_url");
  fullUrlLink.setAttribute("href", full);
  shortUrlLink.setAttribute("id", id);
  shortUrlLink.setAttribute("href", full);
  copyButton.setAttribute("class", "button");
  copyButton.classList.add("copy-button");

  //append nodes
  urlContainer.appendChild(fullUlrDiv);
  fullUlrDiv.appendChild(fullUrlLink);
  fullUrlLink.appendChild(fullText);
  urlContainer.appendChild(shortUrlDiv);
  shortUrlDiv.appendChild(shortUrlLink);
  shortUrlLink.appendChild(shortText);
  urlContainer.appendChild(copyButton);
  copyButton.appendChild(copyButtonText);

  linkContainer.appendChild(urlContainer);
};

// login.addEventListener("click", contentGet);

//copy short url link
const copyShortUrl = (short) => {
  navigator.clipboard.writeText(short).then(
    () => {
      console.log(short);
    },
    (err) => {
      console.log("Could not copy short url");
    }
  );
};
