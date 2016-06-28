// Model 
var elements = [
    {
    name: "New England Aquarium",
    lat: 42.359125, 
    lng:-71.049609,
    web: "http://www.neaq.org"
    },
    {
    name: "Institute of Contemporary Art, Boston",
    lat: 42.352938,  
    lng:-71.043213,
    web: "https://www.icaboston.org"
    },
       {
    name: "USS Constitution Museum",
    lat: 42.373859, 
    lng:-71.055288,
    web: "http://www.ussconstitutionmuseum.org"
    },
    {
    name: "Museum of Science",
    lat: 42.367711,  
    lng:-71.071622,
    web: "https://www.mos.org"
    },
       {
    name: "Massachusetts Institute of Technology",
    lat: 42.359718, 
    lng:-71.093952,
    web: "http://www.mit.edu"
    },
    {
    name: "Public Garden (Boston)",
    lat: 42.354041,  
    lng:-71.070278,
    web: "http://www.cityofboston.gov/parks/emerald/Public_Garden.asp"
    },
       {
    name: "Bunker Hill Monument",
    lat: 42.376358, 
    lng:-71.062965,
    web: "https://www.nps.gov/bost/learn/historyculture/bhm.htm"
    }
];

// Initialize maps
var infowindow, map, marker;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3551993, lng: -71.068718},
        zoom: 14
    });
    infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];


        marker = new google.maps.Marker({
            position: {lat: e.lat, lng:e.lng},
            map: map,
            title: e.name,
            web: e.web        
        
        });


        attachContent(marker);
        // Storage the marker in the list of elements
        e.marker = marker; 

    }
    // When the map is loaded call the funcion of observables
    ko.applyBindings(new PlacesViewModel());
    
}


function makeContentString(marker, wikiContent) {

    var contentString = 
        '<div id="content">' +
        '<h1 id="firstHeading" class="firstHeading">'+ marker.title + '</h1>'+
        '<p>' + wikiContent + '</p>' +
        '<p><a href="'+marker.web+'" target="_blank">'+ marker.title + '</a>' +
        '</p>'+
        '</div>';
    return contentString;
}

function attachContent(marker) {

    marker.addListener('click', toggleBounce);
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    place.marker.setAnimation(null);
                }, 1000);
            }
        }

    marker.addListener('click', function() {

        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +marker.title+ '&format=json&callback=wikiCallback';
        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",

            success: function (response) {
                var articleList = response[1];
                var contentString = makeContentString(marker, response[2]);
                infowindow.setContent(contentString);
                if (articleList.length ==0){
                        var content = '<div id="content">' +
                        '<h1 id="firstHeading" class="firstHeading">'+ marker.title + '</h1>'+
                        '<p>' + "Failed to find Wikipedia information" + '</p>' +
                        '<p><a href="'+marker.web+'" target="_blank">'+ marker.title + '</a>' +
                        '</p>'+
                        '</div>';
                        infowindow.setContent(content);
                }
                infowindow.open(map, marker);
                
            }
        });    
    });    
}

function ListPlaces (bostonPlace) {
    var self = this;
    self.name = ko.observable(bostonPlace);
}

function PlacesViewModel() {
    var self = this;

    function searchFilter (searchstr) {
        // Make the filter
        searchstr = searchstr.toLowerCase();
        var array = [];
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i];
            if (e.name.toLowerCase().includes(searchstr)) {
                array.push(e); 
                e.marker.setVisible(true);
            }
            else {
                e.marker.setVisible(false);
            }
        }
        self.places(array);
    }
    self.placeClick = function(place) {
        google.maps.event.trigger(place.marker, 'click');
    } 


    self.places = ko.observableArray([]);
    self.saved_value = ko.observable("");
    self.saved_value.subscribe( searchFilter );
    searchFilter("");

}

function googleError() {
    alert("Google Has Encountered An Error");
}