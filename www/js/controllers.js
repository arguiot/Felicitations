angular.module('starter.controllers', [])

.controller('LatestCtrl', function($scope) {
  var getPost = "http://localhost:8888/api/getPost.php?postID=" + localStorage.getItem("last");
  var getImg = "http://localhost:8888/api/getImg.php?postID=" + localStorage.getItem("last");
  console.log(getPost);
  $.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("Access-Control-Allow-Origin", '*');
    },
    dataType: "json",
    url: getPost,
    success: function(data) {
        //Your code
        var items = [];
      $("#undefined").attr("id", data.id);
      $(".title").html(data.title);
      $(".desc").html(data.fullDesc);
      $(".like-ct").html(data.likes + " Likes");
    }
  });
  $.ajax({
    url: getImg,
    beforeSend: function(request) {
        request.setRequestHeader("Access-Control-Allow-Origin", '*');
    },
    cache: false
  })
    .done(function( text ) {
      $("img").attr("src", "data:image/png;base64," + text);    
    });
  $(".like").click(function () {
    $(this).unbind("click");
    var current = $(this).find(".like-ct").text();
    var nb = current.split(" ");
    nb = parseInt(nb[0]);
    nb++;
    $(this).find(".like-ct").text(nb + " Likes");
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("last");
        // Code for localStorage/sessionStorage.
        var postId = $(this).find(".id").attr("id");
        // Store
        localStorage.setItem("last", postId);
        // Retrieve
        var last = localStorage.getItem("last");
        console.log(last);
    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage");
    }
  });
})

.controller('SearchCtrl', function($scope) {
    $(".search-btn").click(function () {
      var value = $(".query").val();
      $("p.search-").text(value);
    });
})

.controller('AddPostCtrl', function($scope) {
    $(".form").submit(function(e) {
      var fd = new FormData( this ); // this is the form.
      e.preventDefault(); // avoid to execute the actual submit of the form.
      var url = $(".form").attr("action"); // the script where you handle the form input.
      $.ajax({
             type: "POST",
             url: url,
             data: fd, // serializes the form's elements.
             processData: false,
             contentType: false,
             data: fd, // the FormData
      });
  });

});
