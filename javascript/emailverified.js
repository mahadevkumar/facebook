const useremail = document.getElementById("useremail");
const message = document.getElementById("message");
const resendemail = document.getElementById("resendemail");
const gotohompage = document.getElementById("gotohompage");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    useremail.innerHTML = user.email;
    if (user.emailVerified) {
      console.log("emailverifed true");
      gotohompage.addEventListener("click", function () {
        window.location.assign("./../index.html");
      });
    } else {
      resendemail.addEventListener("click", function () {
        user
          .sendEmailVerification()
          .then(() => {
            message.innerHTML =
              "A verification link has been sent to your email account";
            message.style.color = "green";
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    }
  } else {
    setTimeout(() => {
      window.location.assign("./../pages/singup.html");
    }, 1000);
  }
  setInterval(() => {
    message.innerHTML = "";
  }, 2000);
});
