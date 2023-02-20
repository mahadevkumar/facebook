function forgetpassword() {
  const email = document.getElementById("emailinput");
  const Message = document.getElementById("message");
  var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
  if (email.value === "") {
    Message.innerHTML = "Please Enter Your Email";
    Message.style.color = "red";
    email.focus();
  } else if (!email.value.match(regex)) {
    Message.innerHTML = "Please Enter Correct Email Address";
    Message.style.color = "red";
    email.focus();
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        Message.innerHTML = "Password reset email sent. Please check email.";
        Message.style.color = "green";
      })
      .catch((error) => {
        Message.innerHTML = error.message;
        Message.style.color = "red";
      });
  }
  setTimeout(() => {
    Message.innerHTML = "";
  }, 2000);
}
