// AUTO FUNCTIONS
if (typeof text_title != "undefined") {
  body_index.addEventListener(
    "load",
    scrollStart(),
    titleAnimation(),
    clearSession()
  );
} else {
  page_header.style.top = "0vh";
  body_index.style.overflowY = "auto";
}

function scrollStart() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* DEBUG */
// body_index.style.overflowY = "auto";
// page_header.style.top = "0vh";
function titleAnimation() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const div = document.querySelector(".div-title");
  text_title.style.top = "44vh";
  setTimeout(function () {
    text_title.style.opacity = "1";
    text_title.style.top = "36vh";
  }, 1000);
  text_title.innerHTML = "Welcome to";
  text_title.style.fontSize = "10vw";
  text_title.style.mixBlendMode = "unset";
  setTimeout(function () {
    text_title.style.opacity = "0";
  }, 2000);
  setTimeout(function () {
    page_header.style.top = "0vh";
    body_index.style.overflowY = "auto";
    img_arrow.style.opacity = "0.2";
    img_arrow.style.bottom = "0.5vh";
    div.style.backgroundColor = "transparent";
    text_title.style.top = "";
    text_title.style.opacity = "1";
    text_title.innerHTML = "ARKADE";
    text_title.style.fontSize = "20vw";
    text_title.style.mixBlendMode = "multiply";
    video_title.play();
  }, 2500);
}

function isInViewport(element) {
  element = document.querySelector(`${element}`);

  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function nextSection(element) {
  const el = document.getElementById(element);
  el.scrollIntoView({ behavior: "smooth" });
}

const headerVar = document.querySelector("#page_header");
window.addEventListener("scroll", () => {
  if (typeof text_title != "undefined") {
    let video = isInViewport("#video_title");
    if (video == false) {
      headerVar.classList.add("header-scroll");
    } else {
      headerVar.classList.remove("header-scroll");
    }
  } else {
    headerVar.classList.add("header-scroll");
  }
});

//------------------------------------------------------------------------------------------------
// USER FUNCTIONS
const cardGroup = document.querySelector("#card_group");
const card = document.querySelector(".hidden-card");
/* DEBUG */
// hiddenCard('open');
function hiddenCard(status) {
  if (status == "open") {
    changeCard("login");
    card.style.marginTop = "0";
    cardGroup.style.opacity = "1";
    cardGroup.style.zIndex = "10";
    body_index.style.overflowY = "hidden";
    formReset();
  } else {
    card.style.marginTop = "5vh";
    cardGroup.style.opacity = "0";
    cardGroup.style.zIndex = "-5";
    body_index.style.overflowY = "auto";
    formReset();
  }
}

const cardLogin = document.querySelector(".div-login");
const cardSignup = document.querySelector(".div-signup");
function changeCard(change) {
  if (change == "signup") {
    cardLogin.style.opacity = "0";
    card.classList.add("signup");
    card.classList.remove("login");
    cardSignup.style.display = "flex";
    setTimeout(() => {
      cardSignup.style.opacity = "1";
      cardLogin.style.display = "none";
      formReset();
    }, 500);
  } else {
    cardSignup.style.opacity = "0";
    card.classList.add("login");
    card.classList.remove("signup");
    cardLogin.style.display = "flex";
    setTimeout(() => {
      cardLogin.style.opacity = "1";
      cardSignup.style.display = "none";
      formReset();
    }, 500);
  }
}

function formReset() {
  btn_signup.disabled = true;
  btn_login.disabled = true;
  check_password_signup.style.backgroundImage =
    "url(../assets/imgs/pages/home/hidePswrd.png)";
  check_password_login.style.backgroundImage =
    "url(../assets/imgs/pages/home/hidePswrd.png)";
  const arrayInputs = [
    "ipt_username_signup",
    "ipt_email_signup",
    "ipt_password_signup",
    "ipt_confirm",
    "ipt_email_login",
    "ipt_password_login",
  ];
  for (let i = 0; i < arrayInputs.length; i++) {
    let inputIndex = arrayInputs[i];
    // console.log(inputIndex);
    let inputVar = document.querySelector(`#${inputIndex}`);
    inputVar.value = null;
    inputVar.focus();
    inputVar.blur();
  }
}

function animateLabel(lbl, ipt, status) {
  let label = document.querySelector(`#${lbl}`);
  let input = document.querySelector(`#${ipt}`);
  if (status == "focus") {
    label.classList.add("label-selected");
  } else if (input.value == "") {
    label.classList.remove("label-selected");
  }
}

function passwordVisible(ipt, chk) {
  const input = document.querySelector(`#${ipt}`);
  const check = document.querySelector(`#${chk}`);
  if (input.type == "password") {
    input.type = "text";
    check.style.backgroundImage =
      "url(../assets/imgs/pages/home/showPswrd.png)";
  } else {
    input.type = "password";
    check.style.backgroundImage =
      "url(../assets/imgs/pages/home/hidePswrd.png)";
  }
}

function buttonStatus(btn) {
  let button = document.querySelector(`#btn_${btn}`);
  if (btn == "login") {
    if (ipt_email_login.value == "" || ipt_password_login.value == "") {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  } else {
    if (
      ipt_username_signup.value == "" ||
      ipt_email_signup.value == "" ||
      ipt_password_signup.value == "" ||
      ipt_confirm.value == ""
    ) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }
}
//------------------------------------------------------------------------------------------------
// BACKEND FUNCTIONS
function signup() {
  loadingIcon("img_load_signup", "gif");

  // PARAMETERIZING VARIABLES
  let nameVar = ipt_username_signup.value;
  let emailVar = ipt_email_signup.value;
  let passwordVar = ipt_password_signup.value;
  let confirmVar = ipt_confirm.value;
  let iconVar = "";

  // INPUT VALIDATIONS
  // EMPTY FIELD
  if (
    nameVar == "" ||
    emailVar == "" ||
    passwordVar == "" ||
    confirmVar == ""
  ) {
    ipt_username_signup.style.border = "0.1vh solid #7e1818";
    ipt_email_signup.style.border = "0.1vh solid #7e1818";
    ipt_password_signup.style.border = "0.1vh solid #7e1818";
    ipt_confirm.style.border = "0.1vh solid #7e1818";
    loadingIcon("img_load_signup", "png");
    return false;
  } else {
    // setInterval(sumirMensagem, 5000);
  }

  // INVALID EMAIL
  if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
    ipt_email_signup.style.border = "0.1vh solid #7e1818";
    loadingIcon("img_load_signup", "png");
    return false;
  } else {
    // setInterval(sumirMensagem, 5000);
  }

  // DIFFERENT PASSWORDS
  if (passwordVar != confirmVar) {
    ipt_password_signup.style.border = "0.1vh solid #7e1818";
    ipt_confirm.style.border = "0.1vh solid #7e1818";
    loadingIcon("img_load_signup", "png");
    return false;
  } else {
    // setInterval(sumirMensagem, 5000);
  }  

  const charsArray = [
    "Ryu",
    "Ken",
    "Sagat",
    "Guile",
    "Dhalsim",
    "Vega",
    "Balrog",
    "Chun-Li",
    "Akuma",
    "M.Bison",
  ];

  let randomChar = Math.floor(Math.random() * charsArray.length);
  iconVar = charsArray[randomChar];

  fetch("/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nameServer: nameVar,
      emailServer: emailVar,
      passwordServer: passwordVar,
      iconServer: iconVar,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("response: ", response);
        response.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          let idJson = json;
          initialItems(idJson.insertId, "initial", 1);
          loadingIcon("img_load_signup", "png");
          changeCard("login");
        });
      } else {
        throw "There was an error while Signing Up!";
      }
    })
    .catch(function (response) {
      console.log(`#ERRO: ${response}`);
      loadingIcon("img_load_signup", "png");
    });

  return false;
}
function initialItems(playerID, itemType, itemID) {
  let playerIDVar = playerID;
  let itemTypeVar = itemType;
  let itemIDVar = itemID;
  fetch("/users/setItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playerIDServer: playerIDVar,
      itemTypeServer: itemTypeVar,
      itemIDServer: itemIDVar,
    }),
  })
    .then(function (response) {
      console.log("response: ", response);

      if (response.ok) {
        console.log("Item registered");
      } else {
        throw "There was an error registering the item!";
      }
    })
    .catch(function (response) {
      console.log(`#ERRO: ${response}`);
    });
}

function login() {
  loadingIcon("img_load_login", "gif");

  let emailVar = ipt_email_login.value;
  let passwordVar = ipt_password_login.value;

  // VERIFY IF EMAIL OR PASSWORD ARE EMPTY 
  if (emailVar == "" || passwordVar == "") {
    input_email.style.border = "0.1vh solid #7e1818";
    input_senha.style.border = "0.1vh solid #7e1818";
    loadingIcon("img_load_login", "png");
    return false;
  } else {
    // setInterval(sumirMensagem, 5000);
  }

  // VERIFY IF EMAIL IS PROPERLY OCCUPIED
  if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
    input_email.style.border = "0.1vh solid #7e1818";
    loadingIcon("img_load_login", "png");
    return false;
  } else {
    // setInterval(sumirMensagem, 5000);
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM PASSWORD: ", passwordVar);

  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      passwordServer: passwordVar,
    }),
  })
    .then(function (response) {
      console.log("IN THEN OF entrar()!");

      if (response.ok) {
        console.log(response);

        response.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.PLAYER_ID = json.idPlayer;
          sessionStorage.PLAYER_USERNAME = json.namePlayer;
          sessionStorage.PLAYER_EMAIL = json.emailPlayer;
          sessionStorage.PLAYER_ARKSCORE = json.arkScore;
          sessionStorage.PLAYER_ARKCOIN = json.arkCoin;
          sessionStorage.PLAYER_FIGHTS = json.fights;
          sessionStorage.PLAYER_WINS = json.wins;
          sessionStorage.PLAYER_LOSS = json.loss;
          sessionStorage.PLAYER_ICON = json.iconPlayer;          
          setTimeout(function () {
            loadingIcon("img_load_signup", "gif");
            window.location = "./lobby.html";
          }, 1000); // apenas para exibir o loading
        });
      } else {
        console.log("There was an error while login!");
        loadingIcon("img_load_signup", "gif");
        return false;
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
