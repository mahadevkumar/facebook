function login() {
  const email = document.getElementById("emailinput");
  const password = document.getElementById("passwordinput");
  const Message = document.getElementById("message");
  const emailvalue = email.value;
  const passwordvalue = password.value;
  var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

  if (emailvalue === "") {
    Message.innerHTML = "Email Address required!";
    Message.style.color = "red";
    email.focus();
  } else if (!emailvalue.match(regex)) {
    Message.innerHTML = "Please enter correct email!";
    Message.style.color = "red";
    email.focus();
  } else if (passwordvalue === "") {
    Message.innerHTML = "Password required!";
    Message.style.color = "red";
    password.focus();
  } else if (passwordvalue.length < 6) {
    Message.innerHTML = "Please Enter at least 6 digits password";
    Message.style.color = "red";
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailvalue, passwordvalue)
      .then((userCredential) => {
        Message.innerHTML = "Successfully Login";
        Message.style.color = "green";
        if (userCredential.user.emailVerified) {
          setTimeout(() => {
            window.location.assign("./../index.html");
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.assign("./../pages/emailverified.html");
          }, 2000);
        }
      })
      .catch((error) => {
        Message.innerHTML = error.message;
        Message.style.color = "red";
      });
  }
  setTimeout(() => {
    Message.innerHTML = "";
  }, 3000);
}
