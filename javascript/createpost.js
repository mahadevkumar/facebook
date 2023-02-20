let postvalue = document.getElementById("postdata");
let currentuser = "";
let fileurl = "";
let fileType = "";
var progressDiv = document.getElementById("progressdiv");
var progressbar = document.getElementById("progressbar");


firebase.auth().onAuthStateChanged((user) => {
  currentuser = user;
});
function uploadimg(e) {
  fileType = e.target.files[0].type;
  var uploadfile = firebase.storage().ref()
    .child(`postFiles/${e.target.files[0].name}`)
    .put(e.target.files[0]);
  uploadfile.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadpercentage = Math.round(progress)
      progressDiv.style.visibility = "visible"
      progressbar.style.width = `${uploadpercentage}%`
      progressbar.innerHTML = `${uploadpercentage}%`
    },
    (error) => {
    },
    () => {
      uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
        fileurl = downloadURL;
        progressDiv.style.visibility = "hidden"
      });
    }
  );}
  var d = new Date;
  var postdate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear() }`
  
function createpost() {
  if (postvalue.value !== "" || fileurl !== "") {
    firebase.firestore().collection("posts").add({
      Post: postvalue.value,
      uid: currentuser.uid,
      FileSrc: fileurl,
      FileType : fileType,
      Likes : [],
      Dislikes : [],
      Comments : [],
      PostDate: postdate
    }).then((res)=>{
      firebase.firestore().collection("posts/").doc(res.id).update({
        id : res.id
      }).then(()=>{
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      document.getElementById("message").style.display = "block"
      setTimeout(() => {
        document.getElementById("message").style.display = "none"
      }, 2000);
    })
  }
}
