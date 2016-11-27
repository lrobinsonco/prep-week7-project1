$(document).ready(function() {

  $('#submitBtn').on('click', function(){
    $('#searchResults').empty();

    let searchText = $('#searchBox').val();
    let $query = $.getJSON('http://www.omdbapi.com/?s=' + searchText)

    $query.done((data) => {
      if ($query.status !== 200) {
          return;
      }

      let results = data.Search;
      breakDownSearchResults(results)

      $query.fail(function(err) {
        console.log(err);
      });
    })
  })

// Iterate over results; create container Div; append to DOM
  const breakDownSearchResults = function(array) {
    array.forEach( (result) => {
      let newResult = document.createElement( "div" )
      $(newResult).addClass('result')
      $('#searchResults').append(populateResultDivs(result, newResult))
      console.log(result);
    })
  }

// Populate result div with result specific info
  const populateResultDivs = function (obj, containerDiv) {
    let title = obj.Title;
    let poster = obj.Poster;
    let releaseYear = obj.Year;

    $(containerDiv).append("<h5>" + title + "</h5>");
    $(containerDiv).append("<h6>" + releaseYear + "</h6>");
    $(containerDiv).append("<img class='poster' src='" + poster + "' alt='title' />");
    return containerDiv
  }

});
