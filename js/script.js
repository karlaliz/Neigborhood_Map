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
    web: "http://www.nps.gov"
    }
]

var map=0;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3601868, lng: -71.0768508},
        zoom: 13
    });

    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];


        var marker = new google.maps.Marker({
            position: {lat: e.lat, lng:e.lng},
            map: map,
            title: e.name,
            web: e.web
        });

        attachContent(marker);

    }
    
};

function attachContent(marker) {
    var contentString = '<div id="content">'+
    '<h1 id="firstHeading" class="firstHeading">'+ marker.title + '</h1>'+
    '<p><a href="'+marker.web+'">'+
     marker.title + '</a>'
    '</p>'+
    '</div>';

    marker.addListener('click', function() {

        // ajax
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +marker.title+ '&format=json&callback=wikiCallback';
        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",

            success: function (response) {
                var articleList = response[1];
                console.log('<p>' + response[2] + '</p>')
                var infowindow = new google.maps.InfoWindow({
                    content: '' + response[2]
                });
                infowindow.open(map, marker);
            }
        })    


    });    
}

function ListPlaces (bostonPlace) {
    var self = this;
    self.name= ko.observable(bostonPlace);
}
function PlacesViewModel() {
    var self = this;

    var array = [];
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];
        array.push(new ListPlaces(e.name));

    }
    self.places= ko.observableArray(array);
}

ko.applyBindings(new PlacesViewModel());