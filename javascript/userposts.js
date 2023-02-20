let currentusername = "";
let userprofilesrc = "";
let allusersdataary = []
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      var postsdiv = document.getElementById("userposts");
      //get user name
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((doc) => {
          doc.forEach((users) => {
            allusersdataary.push(users.data())
            if (users.data().uid === user.uid) {
              currentusername =
                users.data().Firstname + " " + users.data().Lastname;
              userprofilesrc = users.data().ProfilePicture;
            }
          });
        });
      //get user data
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot((allpostsposts) => {
          postsdiv.innerHTML = "";
          var totalposts = [];
          document.getElementById("loaderdiv").style.display = "none";
          // Loader
          if (allpostsposts.size === 0) {
            document.getElementById("messagediv").style.display = "flex";
          } else {
        
            allpostsposts.forEach((posts) => {
              totalposts.push(posts.data().fileType);
            });
            for (
              let postsindex = 0;
              postsindex < totalposts.length;
              postsindex++
            ) {
              if (totalposts[postsindex].fileType === "video/mp4") {
                var Likeary = totalposts[postsindex].Likes;
                var Dislikeary = totalposts[postsindex].Dislikes;
                var Commentary = totalposts[postsindex].Comments;
                //message
                var post = document.createElement("div");
                postsdiv.appendChild(post);
                post.setAttribute("class", "post col-12");

                var userdetails = document.createElement("div");
                post.appendChild(userdetails);
                userdetails.setAttribute("class", "userdetailsdiv col-12");

                var userprofilediv = document.createElement("div");
                userdetails.appendChild(userprofilediv);
                userprofilediv.setAttribute("class", "userprofilediv col-2");

                var userprofile = document.createElement("img");
                userprofilediv.appendChild(userprofile);
                userprofile.setAttribute("class", "profilepicture");
                userprofile.setAttribute("src", "./../assessts/icons/user.png");
                if (userprofilesrc !== "") {
                  userprofile.setAttribute("src", userprofilesrc);
                }

                var usernameanddetailsdiv = document.createElement("div");
                userdetails.appendChild(usernameanddetailsdiv);
                usernameanddetailsdiv.setAttribute(
                  "class",
                  "usernameanddetailsdiv"
                );

                var username = document.createElement("p");
                usernameanddetailsdiv.appendChild(username);
                username.setAttribute("class", "username");
                username.innerHTML = currentusername;

                var postdate = document.createElement("p");
                usernameanddetailsdiv.appendChild(postdate);
                postdate.setAttribute("class", "postdate");
                postdate.innerHTML = totalposts[postsindex].PostDate;
             
                // if (totalposts[postsindex].fileType === "video/mp4") {
                  var postfilediv = document.createElement("div");
                  post.appendChild(postfilediv);
                  postfilediv.setAttribute("class", "col-12");
                  postfilediv.setAttribute("id", "postfilediv");
               

                    let postvideo = document.createElement("video");
                    post.appendChild(postvideo);
                    postvideo.setAttribute("controls", "true");
                    postvideo.setAttribute("class", "postVideo");
                    let source = document.createElement("source");
                    postvideo.appendChild(source);
                    source.setAttribute("src", totalposts[postsindex].FileSrc);
                    source.setAttribute("type", "video/mp4");
                  
                // }
                var fotter = document.createElement("div");
                post.appendChild(fotter);
                fotter.setAttribute("class", "col-12 impressionsdiv");

                //like
                var likebutton = document.createElement("button");
                fotter.appendChild(likebutton);
                likebutton.setAttribute("class", "likebutton");

                var likeicons = document.createElement("i");
                likebutton.appendChild(likeicons);
                likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

                var liketitle = document.createElement("p");
                likebutton.appendChild(liketitle);
                liketitle.setAttribute("class", "impressionstitle");
                liketitle.innerHTML = `Like (${Likeary.length})`;

                for (
                  let likeIndex = 0;
                  likeIndex < Likeary.length;
                  likeIndex++
                ) {
                  if (Likeary[likeIndex] === user.uid) {
                    likeicons.style.color = "blue";
                    liketitle.style.color = "blue";
                  }
                }

                //disklike
                var disklikediv = document.createElement("div");
                fotter.appendChild(disklikediv);
                disklikediv.setAttribute("class", "disklikediv");

                var dislikeicon = document.createElement("i");
                disklikediv.appendChild(dislikeicon);
                dislikeicon.setAttribute("class", "fa-regular fa-thumbs-down");

                var diskliketitle = document.createElement("p");
                disklikediv.appendChild(diskliketitle);
                diskliketitle.setAttribute("class", "impressionstitle");
                diskliketitle.innerHTML = `Dislike (${Dislikeary.length})`;
                for (
                  let dislikeindex = 0;
                  dislikeindex < Dislikeary.length;
                  dislikeindex++
                ) {
                  if (Dislikeary[dislikeindex] === user.uid) {
                    dislikeicon.style.color = "blue";
                    diskliketitle.style.color = "blue";
                  }
                }

                //All comments
                if (Commentary.length !== "") {
                  for (let commentindex = 0; commentindex < Commentary.length; commentindex++) {
                    var allusercomments = document.createElement("div");
                    post.appendChild(allusercomments);
                    allusercomments.setAttribute("id", "allusercomments")

                    var commentuserprofilediv = document.createElement("div");
                    allusercomments.appendChild(commentuserprofilediv);
                    commentuserprofilediv.setAttribute("class", "col-2")

                    var commentuserprofile = document.createElement("img");
                    commentuserprofilediv.appendChild(commentuserprofile);
                    commentuserprofile.setAttribute("id", "allusercommentsprofile");
                    commentuserprofile.setAttribute("class", "profilepicture")
                    commentuserprofile.setAttribute("src", "./../assessts/icons/user.png")
                    for (let alluserindex = 0; alluserindex < allusersdataary.length; alluserindex++) {
                      if (totalposts[postsindex].uid === allusersdataary[alluserindex].uid) {
                        if (allusersdataary[alluserindex].ProfilePicture !== "") {
                          commentuserprofile.setAttribute("src", allusersdataary[alluserindex].ProfilePicture)
                        }
                      }
                    }

                    var usercommentdetailsdiv = document.createElement("div");
                    allusercomments.appendChild(usercommentdetailsdiv);
                    usercommentdetailsdiv.setAttribute("id", "usercommentdetailsdiv");
                    usercommentdetailsdiv.setAttribute("class", "col-10")

                    var commentusername = document.createElement("p");
                    usercommentdetailsdiv.appendChild(commentusername);
                    commentusername.setAttribute("id", "commentusername");
                    for (let b = 0; b < allusersdataary.length; b++) {
                      if (allusersdataary[b].uid === totalposts[postsindex].uid) {
                        commentusername.innerHTML = allusersdataary[b].Firstname + " " + allusersdataary[b].Lastname;
                      }
                    }

                    var commenttext = document.createElement("p");
                    usercommentdetailsdiv.appendChild(commenttext);
                    commenttext.setAttribute("id", "commenttext");
                    commenttext.innerHTML = Commentary[commentindex].comment;
                  }
                }


                //comment
                var commentdiv = document.createElement("div");
                fotter.appendChild(commentdiv);
                commentdiv.setAttribute("class", "commentdiv");

                var commenticon = document.createElement("i");
                commentdiv.appendChild(commenticon);
                commenticon.setAttribute("class", "fa-regular fa-message");

                var commenttitle = document.createElement("p");
                commentdiv.appendChild(commenttitle);
                commenttitle.setAttribute("class", "impressionstitle");
                commenttitle.innerHTML = `Comment (${Commentary.length})`;

                var currentusercommentdiv = document.createElement("div");
                post.appendChild(currentusercommentdiv);
                currentusercommentdiv.setAttribute(
                  "class",
                  "currentusercommentdiv col-12"
                );

                var currentusercommentinput = document.createElement("input");
                currentusercommentdiv.appendChild(currentusercommentinput);
                currentusercommentinput.setAttribute(
                  "placeholder",
                  "Write Comment....."
                );
                currentusercommentinput.setAttribute(
                  "class",
                  "currentusercommentinput"
                );
                currentusercommentinput.setAttribute(
                  "id",
                  `commentdata${postsindex}`
                );
                var currentusercommentsendbutton =
                  document.createElement("button");
                currentusercommentdiv.appendChild(currentusercommentsendbutton);
                currentusercommentsendbutton.setAttribute(
                  "class",
                  "currentusercommentsendbutton"
                );
                currentusercommentsendbutton.setAttribute("id", postsindex);

                var currentusercommentsendbuttonimg =
                  document.createElement("postindex");
                currentusercommentsendbutton.appendChild(
                  currentusercommentsendbuttonimg
                );
                currentusercommentsendbuttonimg.setAttribute(
                  "class",
                  "fa-solid fa-paper-plane sendemailbutton"
                );

                //like function
                likebutton.addEventListener("click", () => {
                  let like = false;
                  for (
                    let likeIndex = 0;
                    likeIndex < Likeary.length;
                    likeIndex++
                  ) {
                    if (Likeary[likeIndex] === user.uid) {
                      like = true;
                      Likeary.splice(likeIndex, 1);
                    }
                  }
                  if (!like) {
                    Likeary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Likes: Likeary,
                    });
                });

                //Dislike
                disklikediv.addEventListener("click", () => {
                  let dislike = false;
                  for (
                    let dislikeIndex = 0;
                    dislikeIndex < Dislikeary.length;
                    dislikeIndex++
                  ) {
                    if (Dislikeary[dislikeIndex] === user.uid) {
                      dislike = true;
                      Dislikeary.splice(dislikeIndex, 1);
                    }
                  }
                  if (!dislike) {
                    Dislikeary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Dislikes: Dislikeary,
                    });
                });
                //comment
                currentusercommentsendbutton.addEventListener("click", () => {
                  let targetcommentdata = document.getElementById(
                    `commentdata${postsindex}`
                  );
                  if (targetcommentdata.value === "") {
                    alert("Please write something.....!");
                  } else {
                    let Comment = {
                      comment: targetcommentdata.value,
                      uid: user.uid,
                    };
                    Commentary.push(Comment);
                    //update comment in firebase
                    firebase
                      .firestore()
                      .collection("posts/")
                      .doc(totalposts[postsindex].id)
                      .update({
                        Comments: Commentary,
                      });
                  }
                });
              } else {
                //Message
                document.getElementById("messagediv").style.display = "flex";
              }
            }
          }
        });
    } else {
      window.location.assign("./../pages/emailverified.html");
    }
  } else {
    window.location.assign("./../pages/Login.html");
  }
});
