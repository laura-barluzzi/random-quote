var currentQuote = "";
var currentAuthor = "";

var colorClasses = ["color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8"]

var currentColor = "";

function getCurrentColor() {
  var colorIndex = Math.floor(Math.random() * (colorClasses.length));
  var nextColor = colorClasses[colorIndex];
  if (nextColor === currentColor) {
    return getCurrentColor();
  } else {
    currentColor = nextColor;
    return nextColor;
  }
}


// function 
function getQuote() {    
  $.ajax({
    url: "http://quotes.stormconsultancy.co.uk/random.json",
    success: function (data){  // why no parsing?      
      var myData = data;
      currentQuote = myData.quote;
      console.log(currentQuote);
      currentAuthor = myData.author;
      console.log(currentAuthor);
      var tweetText = currentQuote + ' - ' + currentAuthor;
      
      if (tweetText.length > 140) {
        $("#tweet-quote").addClass("disabled");
        $("#tweet-quote").attr("title", "Too long to tweet :(");
        $("#tweet-quote").attr("href", "#");
        $("#tweet-quote").attr("target", "");
        
        console.log("disabled");
      } else {
        $("#tweet-quote").removeClass("disabled");
        $("#tweet-quote").attr("title", "");
        $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText));
        $("#tweet-quote").attr("target", "_blank");
      }
      
      $("#quote-text").text(currentQuote);
      $("#author-name").text(currentAuthor);
        
      var color = getCurrentColor();
      var elementsToStyle = [$("html, body"), $(".btn-circle")];
      
      for (var i = 0; i < colorClasses.length; i++) {
        for (var j = 0; j < elementsToStyle.length; j++) {
          elementsToStyle[j].removeClass(colorClasses[i]);
        }
      }
      
      for (var i = 0; i < elementsToStyle.length; i++) {
        elementsToStyle[i].addClass(color);
      } 
    },
    
    error: function(){alert("error")}
  });
  
};

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors:['home-page'],
  });
  
  // get automatic first quote
  getQuote();
  
  // call getQuote if clicked #newQuote button
  $("#newQuote").on("click", getQuote);
  
  
  
});