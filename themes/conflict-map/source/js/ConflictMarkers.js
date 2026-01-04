function getColoredMarkerIcon(color) {
  const markerHtml = `
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${color}"/>
    </svg>`;

  return L.divIcon({
    html: markerHtml,
    className: 'custom-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
}

class ConflictMarkers {
  constructor(map) {
    this.map = map;
    this.markers = L.markerClusterGroup();
    this.map.addLayer(this.markers);
  }

  getMarkerIcon(severity, type) {
    let color;
    if (type === 'battle') {
      color = 'blue';
    } else {
      switch (severity) {
        case 'high':
          color = 'red';
          break;
        case 'medium':
          color = 'orange';
          break;
        default:
          color = 'green';
      }
    }
    return getColoredMarkerIcon(color);
  }

  addMarker(conflict) {
    const icon = this.getMarkerIcon(conflict.severity, conflict.type);
    const marker = L.marker([conflict.lat, conflict.lon], { icon: icon });
    marker.bindPopup(`<b><a href="${conflict.path}">${conflict.title}</a></b><br>${conflict.summary || ''}`);
    this.markers.addLayer(marker);
  }
}
