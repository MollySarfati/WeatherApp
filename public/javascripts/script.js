function initMap() {
  // The location of Uluru
  var france = {lat: 46.227638, lng: 2.213749};
  // The map, centered at france
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 5, center: france});
  var tableau= document.getElementsByClassName('liste') // recuperation de toutes les infos

  for (var i = 0; i < tableau.length; i++) {
    var marker = new google.maps.Marker({
    position: {
      lat: parseFloat(tableau[i].dataset.lat),
      lng: parseFloat(tableau[i].dataset.lon)
    },
    map: map
    });
  }
}
