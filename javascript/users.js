firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((users) => {
          // loader
          document.getElementById("loaderdiv").style.display = "none";
          users.forEach((usersdetail) => {
            var Name =
              usersdetail.data().Firstname + " " + usersdetail.data().Lastname;

            var user = document.getElementById("users");
            var userdetails = document.createElement("div");
            user.appendChild(userdetails);
            userdetails.setAttribute("id", "userdetailsdiv");

            var userimgdiv = document.createElement("div");
            userdetails.appendChild(userimgdiv);
            userimgdiv.setAttribute("class", "userimg col-2");

            var userimg = document.createElement("img");
            userimgdiv.appendChild(userimg);
            userimg.setAttribute("src", "./../assessts/icons/user.png");
            if (usersdetail.data().ProfilePicture !== "") {
              userimg.setAttribute("src", usersdetail.data().ProfilePicture);
            }
            userimg.setAttribute("class", "profilepicture");

            var userdata = document.createElement("div");
            userdetails.appendChild(userdata);
            userdata.setAttribute("id", "data");

            var username = document.createElement("p");
            userdata.appendChild(username);
            username.setAttribute("class", "username");
            username.innerHTML = Name;

            var signupdate = document.createElement("p");
            userdata.appendChild(signupdate);
            signupdate.setAttribute("class", "signupdate");
            signupdate.innerHTML = usersdetail.data().Signupdate;

            var dropdown = document.createElement("div");
            userdetails.appendChild(dropdown);
            dropdown.setAttribute("id", "dropdown");

            var dropdownshow = document.createElement("i");
            dropdown.appendChild(dropdownshow);
            dropdownshow.setAttribute(
              "class",
              "fa-solid fa-angle-down dropdownbuttons"
            );
            dropdownshow.setAttribute("id", "dropdownshow");

            var dropdownhide = document.createElement("i");
            dropdown.appendChild(dropdownhide);
            dropdownhide.setAttribute(
              "class",
              "fa-solid fa-angle-up dropdownbuttons"
            );
            dropdownhide.setAttribute("id", "dropdownhide");

            var userprofilesdiv = document.createElement("div");
            user.appendChild(userprofilesdiv);
            userprofilesdiv.setAttribute("id", "userpicturesdetails");
            userprofilesdiv.style.marginBottom = "5px";

            var usercoverpicture = document.createElement("img");
            userprofilesdiv.appendChild(usercoverpicture);
            usercoverpicture.setAttribute("id", "usercoverpicture");
            usercoverpicture.setAttribute("class", "col-12");
            usercoverpicture.setAttribute(
              "src",
              "./../assessts/images/Untitled design.png"
            );
            if (usersdetail.data().CoverPicture !== "") {
              usercoverpicture.setAttribute(
                "src",
                usersdetail.data().CoverPicture
              );
            }

            var userprofilepicture = document.createElement("img");
            userprofilesdiv.appendChild(userprofilepicture);
            userprofilepicture.setAttribute("id", "userprofilepicture");
            userprofilepicture.setAttribute(
              "src",
              "./../assessts/icons/user.png"
            );
            if (usersdetail.data().ProfilePicture !== "") {
              userprofilepicture.setAttribute(
                "src",
                usersdetail.data().ProfilePicture
              );
            }
            userprofilepicture.setAttribute("class", "largeprofilepicture");

            var usernameondetails = document.createElement("p");
            userprofilesdiv.appendChild(usernameondetails);
            usernameondetails.setAttribute("class", "username");
            usernameondetails.innerHTML = Name;

            dropdownshow.addEventListener("click", () => {
              dropdownhide.style.display = "block";
              dropdownshow.style.display = "none";
              userprofilesdiv.style.display = "flex";
            });

            dropdownhide.addEventListener("click", () => {
              dropdownshow.style.display = "block";
              dropdownhide.style.display = "none";
              userprofilesdiv.style.display = "none";
            });
          });
        });
    } else {
      window.location.assign("./emailverified.html");
    }
  } else {
    window.location.assign("./Login.html");
  }
});
