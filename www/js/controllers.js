angular.module('starter.controllers', [])

.controller('LatestCtrl', function($scope) {
  localStorage.setItem("query", " ");
  $scope.doRefresh = function() {
    location.reload();
     };
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
          minScale: 1,
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
    if (typeof(Storage) !== "undefined") {
      var query = localStorage.getItem("query");
      console.log(query);
      window.setInterval(function(){
        var query = localStorage.getItem("query");
        if (query != " ") {
          $(".query").val(query);
          localStorage.setItem("query", " ");
        }
      }, 250);
        // Code for localStorage/sessionStorage.
        // Store

    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage");
    }
    $(".search-btn").click(function () {
      localStorage.setItem("query", " ");
      $(".search-output").html("<center>Chargement...</center>");
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
                minScale: 1,
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
.controller('CategorieCtrl', function($scope) {
  localStorage.setItem("query", " ");
  $(".item").click(function () {
    var query = $(this).text();
    if (typeof(Storage) !== "undefined") {
      console.log(query);
      localStorage.setItem("query", query);
      window.location.href = '#tab/search';
    } else {
        // Sorry! No Web Storage support..
        console.log("No web storage");
    }
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
