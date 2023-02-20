var postsshowbutton = document.getElementById("postsbutton");
var updatedatabutton = document.getElementById("updatedatabutton")
var showuserprofilebutton = document.getElementById("userprofilebutton");
var userdata = document.getElementById("editabledatadiv");
var currentuserpost = document.getElementById("showposts");
var userprofileimg = document.getElementById("userprofileimg");
var usercoverimg = document.getElementById("usercoverimg");
var progressbardiv = document.getElementById("progressdiv")
var progressbar = document.getElementById("progressbar");
var message = document.getElementById("message");
let allusersdataary = [];
let useruid = "";
let userprofilesrc = "";
let usercoversrc = "";
var createpostinput = document.getElementById("createpostinput")

//change cover picture function
function changecoverpicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${useruid}/coverpicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbardiv.style.visibility = "visible"
      var uploadpercentage = Math.round(progress)
      progressbar.style.width = `${uploadpercentage}%`
      progressbar.innerHTML = `${uploadpercentage}%`
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((coverpicture) => {
        progressbardiv.style.visibility = "hidden"
        firebase
          .firestore()
          .collection("users/")
          .doc(useruid)
          .update({ CoverPicture: coverpicture });
      });
    }
  );
}

//change profile picture function
function changeprofilepicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${useruid}/profilepicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbardiv.style.visibility = "visible"
      var uploadpercentage = Math.round(progress)
      progressbar.style.width = `${uploadpercentage}%`
      progressbar.innerHTML = `${uploadpercentage}%`
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((profilepicture) => {
        progressbardiv.style.visibility = "hidden"
        firebase
          .firestore()
          .collection("users/")
          .doc(useruid)
          .update({ ProfilePicture: profilepicture });
      });
    }
  );
}
postsshowbutton.addEventListener("click", () => {
  userdata.style.display = "none";
  currentuserpost.style.display = "block";
  postsshowbutton.style.backgroundColor = "#0000ff";
  postsshowbutton.style.color = "white";
  showuserprofilebutton.style.backgroundColor = "white";
  showuserprofilebutton.style.color = "#0000ff";
  document.getElementById("currentuserpostsdiv").style.display = "block"
});
showuserprofilebutton.addEventListener("click", () => {
  userdata.style.display = "block";
  currentuserpost.style.display = "none";
  showuserprofilebutton.style.backgroundColor = "#0000ff";
  showuserprofilebutton.style.color = "white";
  postsshowbutton.style.backgroundColor = "white";
  postsshowbutton.style.color = "#0000ff";
  document.getElementById("currentuserpostsdiv").style.display = "none"
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    useruid = user.uid;
    if (user.emailVerified) {
      let Name = "";
      //doc
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((doc) => {
          doc.forEach((users) => {
            allusersdataary.push(users.data())
            if (users.data().uid === user.uid) {
              Name = users.data().Firstname + " " + users.data().Lastname
              userprofilesrc = users.data().ProfilePicture;
              usercoversrc = users.data().CoverPicture;
              user
              if(userprofilesrc !== ""){
                userprofileimg.setAttribute("src" , userprofilesrc)
                document.getElementById("currentusercommentprofile").setAttribute("src" , userprofilesrc)
              }
              if(usercoversrc !== ""){
                usercoverimg.setAttribute("src" , usercoversrc)
              }
              document.getElementById("createpostinput").setAttribute("placeholder", `what's on your mind ${Name}`)
              document.getElementById("firstname").value = users.data().Firstname;
              document.getElementById("lastname").value = users.data().Lastname;
              document.getElementById("mobileno").value = users.data().MobileNo;
              document.getElementById("emailaddress").value = users.data().Email;
              document.getElementById("userdescription").value = users.data().Description
            }
          });
        });
      //update data
      updatedatabutton.addEventListener("click", () => {
        firebase.firestore().collection("users/").doc(user.uid).update({
          Firstname: document.getElementById("firstname").value,
          Lastname: document.getElementById("lastname").value,
          MobileNo: document.getElementById("mobileno").value,
          Description: document.getElementById("userdescription").value
        }).then(() => {
          message.innerHTML = "Successfully Updated";
          message.style.color = "green"
          setInterval(() => {
            message.innerHTML = ""
          }, 2000);
        })
      })
      //Posts
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot((allposts) => {
          document.getElementById("loaderdiv").style.display = "none"
          currentuserpost.innerHTML = ""
          let totalposts = []
          if (allposts.size === 0) {
            //message
            document.getElementById("messagediv").style.display = "flex"
          } else {
            allposts.forEach((posts) => {
              totalposts.push(posts.data());
            });
            for (let postsindex = 0; postsindex < totalposts.length; postsindex++) {
              if (totalposts[postsindex].uid === user.uid) {
                let likary = totalposts[postsindex].Likes;
                let dislikeary = totalposts[postsindex].Dislikes;
                let commentary = totalposts[postsindex].Comments;
                var filetype = totalposts[postsindex].FileType;
                var filesrc = totalposts[postsindex].FileSrc;
                // user posts
                var post = document.createElement("div");
                currentuserpost.appendChild(post);
                post.setAttribute("class", "post col-12");

                var doc = document.createElement("div");
                post.appendChild(doc);
                doc.setAttribute("class", "userdetailsdiv col-12");

                var userprofilediv = document.createElement("div");
                doc.appendChild(userprofilediv);
                userprofilediv.setAttribute("class", "userprofilediv col-2");

                var userprofile = document.createElement("img");
                userprofilediv.appendChild(userprofile);
                userprofile.setAttribute("class", "profilepicture");
                userprofile.setAttribute("src" , "./../assessts/icons/user.png")
                if (userprofilesrc !== "") {
                  userprofile.setAttribute("src", userprofilesrc)
                }

                var usernameanddetailsdiv = document.createElement("div");
                doc.appendChild(usernameanddetailsdiv);
                usernameanddetailsdiv.setAttribute("class", " col-6");
                usernameanddetailsdiv.style.marginLeft = "10px"

                var username = document.createElement("p");
                usernameanddetailsdiv.appendChild(username);
                username.setAttribute("class", "username");
                username.innerHTML = Name;

                var postdate = document.createElement("p");
                usernameanddetailsdiv.appendChild(postdate);
                postdate.setAttribute("class", "postdate");
                postdate.innerHTML = totalposts[postsindex].PostDate;

                var editanddeltebtndiv = document.createElement("div");
                doc.appendChild(editanddeltebtndiv);
                editanddeltebtndiv.setAttribute("class", "editanddeletbtn col-4");

                var editbtn = document.createElement("i");
                editanddeltebtndiv.appendChild(editbtn);
                editbtn.setAttribute("class", "fa-solid fa-pencil postsbtn");
                editbtn.setAttribute("id", "editbtn");

                var deletbtn = document.createElement("i");
                editanddeltebtndiv.appendChild(deletbtn);
                deletbtn.setAttribute("class", "fa-solid fa-trash postsbtn");
                deletbtn.setAttribute("id", "deletebtn");
                deletbtn.style.marginLeft = "8px";

                //Post Delete Function
                deletbtn.addEventListener("click", () => {
                  swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this Post !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                    .then((willDelete) => {
                      if (willDelete) {
                        swal("Poof! Your imaginary file has been deleted!", {
                          icon: "success",
                        });
                        firebase.firestore().collection("posts").doc(totalposts[postsindex].id).delete();
                        //Message                        
                      } else {
                        swal("Your imaginary file is safe!");
                      }
                    });
                })

                if (totalposts[postsindex].Post !== "") {
                  var posttext = document.createElement("p");
                  post.appendChild(posttext);
                  posttext.setAttribute("class", "posttext col-12");
                  posttext.innerHTML = totalposts[postsindex].Post;
                } else if (totalposts[postsindex].filesrc !== "") {
                  if (
                    filetype === "image/png" ||
                    filetype === "image/jpeg" ||
                    filetype === "image/jpg" ||
                    filetype === "image/webp"
                  ) {
                    var postimage = document.createElement("img");
                    post.appendChild(postimage);
                    postimage.setAttribute("class", "posttext col-12");
                    postimage.setAttribute("src", filesrc);
                  } else {
                    let postvideo = document.createElement("video");
                    post.appendChild(postvideo);
                    postvideo.setAttribute("controls", "true");
                    postvideo.setAttribute("class", "postVideo");
                    let source = document.createElement("source");
                    postvideo.appendChild(source);
                    source.setAttribute("src", totalposts[postsindex].FileSrc);
                    source.style.width = "100%";

                  }
                }

                var impressionsdiv = document.createElement("div");
                post.appendChild(impressionsdiv);
                impressionsdiv.setAttribute("class", "col-12 impressionsdiv");

                //like
                var likebutton = document.createElement("button");
                impressionsdiv.appendChild(likebutton);
                likebutton.setAttribute("class", "likebutton");

                var likeicons = document.createElement("i");
                likebutton.appendChild(likeicons);
                likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

                var liketitle = document.createElement("p");
                likebutton.appendChild(liketitle);
                liketitle.setAttribute("class", "impressionstitle");
                liketitle.innerHTML = `Like (${likary.length})`;
                for (let likeIndex = 0; likeIndex < likary.length; likeIndex++) {
                  if (likary[likeIndex] === user.uid) {
                    likeicons.style.color = "blue";
                    liketitle.style.color = "blue";
                  }
                }

                //disklike
                var disklikediv = document.createElement("div");
                impressionsdiv.appendChild(disklikediv);
                disklikediv.setAttribute("class", "disklikediv");

                var dislikeicon = document.createElement("i");
                disklikediv.appendChild(dislikeicon);
                dislikeicon.setAttribute(
                  "class",
                  "fa-regular fa-thumbs-down"
                );

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
                impressionsdiv.appendChild(commentdiv);
                commentdiv.setAttribute("class", "commentdiv");

                var commenticon = document.createElement("i");
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
                    commenttext.innerHTML = commentary[commentindex].comment;
                  }
                }


                
                //currentusercomment
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
                currentusercommentinput.setAttribute("id", `commentdata${postsindex}`)

                var currentusercommentsendbutton =
                  document.createElement("button");
                currentusercommentdiv.appendChild(currentusercommentsendbutton);
                currentusercommentsendbutton.setAttribute(
                  "class",
                  "currentusercommentsendbutton"
                );

                var currentusercommentsendbuttonimg = document.createElement("i");
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
                    likeIndex < likary.length;
                    likeIndex++
                  ) {
                    if (likary[likeIndex] === user.uid) {
                      like = true;
                      likary.splice(likeIndex, 1);
                    }
                  }
                  if (!like) {
                    likary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Likes: likary,
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
                    .doc(totalposts[postsindex].id)
                    .update({
                      Dislikes: dislikeary,
                    });
                });
                //comment
                currentusercommentsendbutton.addEventListener("click", () => {
                  let targetcommentdata = document.getElementById(`commentdata${postsindex}`)
                  if (targetcommentdata.value === "") {
                    alert("Please write something.....!")
                  } else {
                    let Comment = {
                      comment: targetcommentdata.value,
                      uid: user.uid
                    }
                    commentary.push(Comment)
                    //update comment in firebase
                    firebase.firestore().collection("posts/").doc(totalposts[postsindex].id).update({
                      Comments: commentary
                    })
                  }
                })
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
