let alluser = [];
let postsshow = document.getElementById("postsdiv");
let createpostinput = document.getElementById("createpostdiv");
let currentuserprofile = document.getElementById("usercommentimage");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((doc) => {
          doc.forEach((users) => {
            alluser.push(users.data())
            if(users.data().uid === user.uid){
              if(users.data().ProfilePicture !== ""){
              document.getElementById("usercommentimage").setAttribute("src" , users.data().ProfilePicture)
              }
              document.getElementById("createpostdiv").setAttribute("placeholder", `what's on your mind ${users.data().Firstname + " " + users.data().Lastname}`)
            }
          });
        });
      //Posts
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot((doc) => {
          document.getElementById("loaderdiv").style.display = "none";
          postsshow.innerHTML = "";
          var allposts = [];
          if (doc.size === 0) {
            document.getElementById("messagediv").style.display = "flex";
          } else {
            doc.forEach((posts) => {
              allposts.push(posts.data());
            });
            for (let postindex = 0; postindex < allposts.length; postindex++) {
              let likeary = allposts[postindex].Likes;
              let dislikeary = allposts[postindex].Dislikes;
              let commentary = allposts[postindex].Comments;

              var post = document.createElement("div");
              postsshow.appendChild(post);
              post.setAttribute("class", "post col-12");
              post.setAttribute("id", postindex);

              var postheader = document.createElement("div");
              post.appendChild(postheader);
              postheader.setAttribute("class", "userdetailsdiv col-12");

              var userprofilediv = document.createElement("div");
              postheader.appendChild(userprofilediv);
              userprofilediv.setAttribute("class", "userprofilediv col-2");

              var userprofile = document.createElement("img");
              userprofilediv.appendChild(userprofile);
              userprofile.setAttribute("src", "./assessts/icons/user.png");
              userprofile.setAttribute("class", "profilepicture");
              for (let b = 0; b < alluser.length; b++) {
                if (alluser[b].uid === allposts[post.id].uid) {
                  if (alluser[b].ProfilePicture !== "") {
                    userprofile.setAttribute("src", alluser[b].ProfilePicture);
                  }
                }
              }

              var usernameanddetailsdiv = document.createElement("div");
              postheader.appendChild(usernameanddetailsdiv);
              usernameanddetailsdiv.setAttribute("class","usernameanddetailsdiv");

              var username = document.createElement("p");
              usernameanddetailsdiv.appendChild(username);
              username.setAttribute("class", "username");

              var postdate = document.createElement("p");
              usernameanddetailsdiv.appendChild(postdate);
              postdate.setAttribute("class", "postdate");
            

              for (let b = 0; b < alluser.length; b++) {
                if(alluser[b].uid === allposts[post.id].uid){
                  username.innerHTML = alluser[b].Firstname + " " + alluser[b].Lastname;
                  postdate.innerHTML = allposts[b].PostDate;
                }
              }


              if (allposts[postindex].Post !== "") {
                var posttext = document.createElement("p");
                post.appendChild(posttext);
                posttext.setAttribute("class", "posttext col-12");
                posttext.innerHTML = allposts[postindex].Post;
              } else if (allposts[postindex].FileSrc !== "") {
                if (
                  allposts[postindex].FileType === "image/png" ||
                  allposts[postindex].FileType === "image/jpeg" ||
                  allposts[postindex].FileType === "image/jpg" ||
                  allposts[postindex].FileType === "image/webp"
                ) {
                  var postimage = document.createElement("img");
                  post.appendChild(postimage);
                  postimage.setAttribute("class", "posttext col-12");
                  postimage.setAttribute("src", allposts[postindex].FileSrc);
                } else {
                  let postvideo = document.createElement("video");
                  post.appendChild(postvideo);
                  postvideo.setAttribute("controls", "true");
                  postvideo.setAttribute("class", "postVideo");
                  let source = document.createElement("source");
                  postvideo.appendChild(source);
                  source.setAttribute("src", allposts[postindex].FileSrc);
                  source.setAttribute("type", "video/mp4");
                }
              }
    

              var footer = document.createElement("div");
              post.appendChild(footer);
              footer.setAttribute("class", "col-12 impressionsdiv");
              //like
              var likebutton = document.createElement("button");
              footer.appendChild(likebutton);
              likebutton.setAttribute("class", "likebutton");

              var likeicons = document.createElement("i");
              likebutton.appendChild(likeicons);
              likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

              var liketitle = document.createElement("p");
              likebutton.appendChild(liketitle);
              liketitle.setAttribute("class", "impressionstitle");
              liketitle.innerHTML = `Like (${likeary.length})`;
              for (let likeIndex = 0; likeIndex < likeary.length; likeIndex++) {
                if (likeary[likeIndex] === user.uid) {
                  likeicons.style.color = "blue";
                  liketitle.style.color = "blue";
                }
              }


              //disklike
              var disklikediv = document.createElement("div");
              footer.appendChild(disklikediv);
              disklikediv.setAttribute("class", "disklikediv");

              var dislikeicon = document.createElement("i");
              disklikediv.appendChild(dislikeicon);
              dislikeicon.setAttribute("class", "fa-regular fa-thumbs-down");

              var diskliketitle = document.createElement("p");
              disklikediv.appendChild(diskliketitle);
              diskliketitle.setAttribute("class", "impressionstitle");
              diskliketitle.innerHTML = `Dislike (${dislikeary.length})`;
              for (
                let dislikeindex = 0;
                dislikeindex < dislikeary.length;
                dislikeindex++
              ) {
                if (dislikeary[dislikeindex] === user.uid) {
                  dislikeicon.style.color = "blue";
                  diskliketitle.style.color = "blue";
                }
              }

              //comment
              var commentdiv = document.createElement("div");
              footer.appendChild(commentdiv);
              commentdiv.setAttribute("class", "commentdiv");
              commentdiv.setAttribute("id", postindex);

              var commenticon = document.createElement("postindex");
              commentdiv.appendChild(commenticon);
              commenticon.setAttribute("class", "fa-regular fa-message");

              var commenttitle = document.createElement("p");
              commentdiv.appendChild(commenttitle);
              commenttitle.setAttribute("class", "impressionstitle");
              commenttitle.innerHTML = `Comment (${commentary.length})`;


              //All comments
              if (commentary.length !== "") {
              for (let commentindex = 0; commentindex < commentary.length; commentindex++) {
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
                for (let alluserindex = 0; alluserindex < alluser.length; alluserindex++) {
                  if (allposts[postindex].uid === alluser[alluserindex].uid) {
                    if (alluser[alluserindex].ProfilePicture !== "") {
                      commentuserprofile.setAttribute("src", alluser[alluserindex].ProfilePicture)
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
                for (let b = 0; b < alluser.length; b++) {
                  if (alluser[b].uid === allposts[postindex].uid) {
                    commentusername.innerHTML = alluser[b].Firstname + " " + alluser[b].Lastname;
                  }
                }

                var commenttext = document.createElement("p");
                usercommentdetailsdiv.appendChild(commenttext);
                commenttext.setAttribute("id", "commenttext");
                commenttext.innerHTML = commentary[commentindex].comment;
              }
              }

              //create comment
              var currentusercommentdiv = document.createElement("div");
              post.appendChild(currentusercommentdiv);
              currentusercommentdiv.setAttribute("class","currentusercommentdiv col-12");

              var currentusercommentinput = document.createElement("input");
              currentusercommentdiv.appendChild(currentusercommentinput);
              currentusercommentinput.setAttribute("placeholder","Write Comment.....");
              currentusercommentinput.setAttribute("class","currentusercommentinput");
              currentusercommentinput.setAttribute("id",`commentdata${postindex}`);

              var currentusercommentsendbutton =document.createElement("button");
              currentusercommentdiv.appendChild(currentusercommentsendbutton);
              currentusercommentsendbutton.setAttribute("class","currentusercommentsendbutton");
              currentusercommentsendbutton.setAttribute("id", postindex);

              var currentusercommentsendbuttonimg =document.createElement("postindex");
              currentusercommentsendbutton.appendChild(currentusercommentsendbuttonimg);
              currentusercommentsendbuttonimg.setAttribute("class","fa-solid fa-paper-plane sendemailbutton");
              
              //like function
              likebutton.addEventListener("click", () => {
                let like = false;
                for (
                  let likeIndex = 0;
                  likeIndex < likeary.length;
                  likeIndex++
                ) {
                  if (likeary[likeIndex] === user.uid) {
                    like = true;
                    likeary.splice(likeIndex, 1);
                  }
                }
                if (!like) {
                  likeary.push(user.uid);
                }
                firebase
                  .firestore()
                  .collection("posts/")
                  .doc(allposts[postindex].id)
                  .update({
                    Likes: likeary,
                  });
              });

              //Dislike
              disklikediv.addEventListener("click", () => {
                let dislike = false;
                for (
                  let dislikeIndex = 0;
                  dislikeIndex < dislikeary.length;
                  dislikeIndex++
                ) {
                  if (dislikeary[dislikeIndex] === user.uid) {
                    dislike = true;
                    dislikeary.splice(dislikeIndex, 1);
                  }
                }
                if (!dislike) {
                  dislikeary.push(user.uid);
                }
                firebase
                  .firestore()
                  .collection("posts/")
                  .doc(allposts[postindex].id)
                  .update({
                    Dislikes: dislikeary,
                  });
              });
              //comment
              currentusercommentsendbutton.addEventListener("click", () => {
                let targetcommentdata = document.getElementById(
                  `commentdata${postindex}`
                );
                if (targetcommentdata.value === "") {
                  alert("Please write something.....!");
                } else {
                  let Comment = {
                    comment: targetcommentdata.value,
                    uid: user.uid,
                  };
                  commentary.push(Comment);
                  //update comment in firebase
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(allposts[postindex].id)
                    .update({
                      Comments: commentary,
                    });
                }
              });
            }
          }
        });
    } else {
      window.location.assign("./pages/emailverified.html");
    }
  } else {
    window.location.assign("./pages/Login.html");
  }
});
