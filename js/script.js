var elements = [
    {
    name: "New England Aquarium",
    lat: 42.359125, 
    lng:-71.049609,
    web: "http://www.neaq.org"
    },
    {
    name: "The Institute of Contemporary Art/Boston",
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
    name: "Boston Public Garden",
    lat: 42.354041,  
    lng:-71.070278,
    web: ""
    },
       {
    name: "Bunker Hill Monument",
    lat: 42.376358, 
    lng:-71.062965,
    web: "http://www.nps.gov"
    }
]

var map=0;
var marker =0;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3601868, lng: -71.0768508},
        zoom: 13
    });
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];
        marker = new google.maps.Marker({
            position: {lat: e.lat, lng:e.lng},
            map: map,
            title: e.name
        });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


        // marker.addListener('click', toggleBounce);


        // function toggleBounce() {
        //     if (marker.getAnimation() !== null) {
        //         marker.setAnimation(null);
        //     } else {
        //         marker.setAnimation(google.maps.Animation.BOUNCE);
        // }
    };
};

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