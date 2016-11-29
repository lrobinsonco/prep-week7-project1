$(document).ready(function() {

  
  $('#submitBtn').on('click', function(){
    $('#searchResults').empty();

    let searchText = $('#searchBox').val();
    let $query = $.getJSON('http://www.omdbapi.com/?s=' + searchText);

    $query.done((data) => {
      if ($query.status !== 200) {
          return;
      }
      console.log(data);
      let results = data.Search;

      // Function to take JSON object and populate the HTML DOM
      breakDownSearchResults(results)

      $query.fail(function(err) {
        console.log(err);
      });
    })
  })

// Iterate over results; create container Div; append to DOM
  const breakDownSearchResults = function(array) {

    // FOR LOOP example of populating the DOM with JSON elements

    // for (var i = 0; i < array.length; i++) {
    //   console.log(array[i]);
    //   let newResult = document.createElement( 'div' )
    //   $(newResult).addClass('result')
    //
    //   $('#searchResults').append("<h6>"+ array[i]["Title"] +"</h6>");
    //   $('#searchResults').append("<h6>"+ array[i]["Year"] +"</h6>");
    //   $('#searchResults').append("<img src='"+ array[i]["Poster"] + " ' />");
    // }

    // Higher Order Function that Creates each result container Div and Appends it to the DOM
    // Then calls populateResultDivs function to populate the individual result divs
    array.forEach( (result) => {
      let newResult = document.createElement( "div" )
      $(newResult).addClass("result")
      $("#searchResults").append( populateResultDivs(result, newResult))
      console.log(result);
    })
  }

// Populate result div with result specific info
  const populateResultDivs = function (obj, containerDiv) { // obj = data.Search[0].Title
    let title = obj.Title;      //Batman Begins
    let poster = obj.Poster;    //....jpg
    let releaseYear = obj.Year; // 2005

    $(containerDiv).append("<h5>" + title + "</h5>");
    $(containerDiv).append("<h6>" + releaseYear + "</h6>");
    $(containerDiv).append("<img class='poster' src='" + poster + "' alt='title' />");
    return containerDiv
  }

});
