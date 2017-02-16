angular.module('starter.controllers', [])

.controller('LatestCtrl', function($scope) {
  var getPost = "http://api.the-scientist.fr/getPost.php?postID=" + localStorage.getItem("last");
  var getImg = "http://api.the-scientist.fr/getImg.php?postID=" + localStorage.getItem("last");
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
  }).done(function () {
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
      // $("img").attr("zoom-src", "data:image/png;base64," + text); 
      $("img").each(function () {
        $(this).panzoom({
          minScale: 0.8,
          maxScale: 3,
          panOnlyWhenZoomed: true,
          contain: 'automatic'
        });
      });
    });
  $(".like, a.search-like").click(function () {
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
        var likeUrl = "http://api.the-scientist.fr/likes.php?postID=" + postId;
                $.ajax({
                  url: likeUrl,
                  beforeSend: function(request) {
                      request.setRequestHeader("Access-Control-Allow-Origin", '*');
                  },
                  cache: false
                });
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
      $(".search-output").html("<center><ion-spinner></ion-spinner>Loading</center>");
      var value = $(".query").val();
      var searchUrl = "http://api.the-scientist.fr/search.php?s=" + value;
      $.ajax({
        url: searchUrl,
        beforeSend: function(request) {
            request.setRequestHeader("Access-Control-Allow-Origin", '*');
        },
        cache: false
      })
        .done(function( text ) {
          $(".search-output").html(text);   
          $("img").each(function () {
              $(this).panzoom({
                minScale: 0.8,
                maxScale: 3,
                panOnlyWhenZoomed: true,
                contain: 'automatic'
              });
            });
          $(".like, a.search-like").click(function () {
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
                var likeUrl = "http://api.the-scientist.fr/likes.php?postID=" + postId;
                $.ajax({
                  url: likeUrl,
                  beforeSend: function(request) {
                      request.setRequestHeader("Access-Control-Allow-Origin", '*');
                  },
                  cache: false
                });
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
        });
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