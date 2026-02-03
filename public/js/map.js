const mapDiv = document.getElementById("map");

// string → array
const coords = mapDiv.dataset.coordinates
  .split(",")
  .map(Number);

const map = L.map("map").setView(
  [coords[1], coords[0]], 
  13
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.marker([coords[1], coords[0]], { icon: redIcon })
  .addTo(map)
  .bindPopup('<p>Exact Location will be provided after booking</p>',{
      offset: [0, -25]   
  });



