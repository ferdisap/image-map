import { imageMapCreator } from "image-map-creator";
import { Coord } from "./class.coord";
import { Area, AreaCircle, AreaEmpty } from "./class.area";

// export function drawCircleByCoord(this:imageMapCreator, coords:Array<number>) {
//   const coordinate = new Coord(coords[0], coords[1]);
//   this.tempArea = new AreaCircle([coordinate]) as AreaEmpty;
//   this.tempArea.radius = coords[2];
//   this.createArea(this.tempArea);
//   this.tempArea = new AreaEmpty();
// }
// drawPolyByCoord(coords) {
//   this.tempArea = new AreaPoly([]);
//   for (let i = 0; i < coords.length; i += 2) {
//     const coordinate = new Coord(coords[i], coords[i + 1]);
//     this.tempArea.addCoord(coordinate);
//   }
//   this.tempArea.closed = true;
//   this.createArea(this.tempArea);
//   this.tempArea = new AreaEmpty();
// }

function getImageHotspots(file: File, onSuccess:Function) {
  if (file) {
    const formData = new FormData();
    formData.append('file', file); // 'image' is the field name on the server
  
    fetch('http://localhost:1004/api/get_hotspotss/jpeg', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(rst => onSuccess(rst))
      .catch(error => console.error('Error:', error));
  }
}

function setImageHotspots(file: File, hotspots:[]) {
  if (file) {
    const formData = new FormData();
    formData.append('file', file); // 'image' is the field name on the server
    formData.append('hotspots', JSON.stringify(hotspots));
  
    fetch('http://localhost:1004/api/set_hotspots/jpeg', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(rst => console.error('Success:', rst.messages.join(", ")))
      .catch(error => console.error('Error:', error));
  }
}
//@ts-ignore add getImageHotspots to the global scope
globalThis.getImageHotspots = getImageHotspots;
//@ts-ignore add setImageHotspots to the global scope
globalThis.setImageHotspots = setImageHotspots;