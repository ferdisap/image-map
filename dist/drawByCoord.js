"use strict";
function getImageHotspots(file, onSuccess) {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:1004/api/get_hotspots/jpeg", {
      method: "POST",
      body: formData
    }).then((response) => response.json()).then((rst) => onSuccess(rst)).catch((error) => console.error("Error:", error));
  }
}
function setImageHotspots(file, hotspots) {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("hotspots", JSON.stringify(hotspots));
    fetch("http://localhost:1004/api/set_hotspots/jpeg", {
      method: "POST",
      body: formData
    }).then((response) => response.json()).then((rst) => console.error("Success:", rst.messages.join(", "))).catch((error) => console.error("Error:", error));
  }
}
globalThis.getImageHotspots = getImageHotspots;
globalThis.setImageHotspots = setImageHotspots;
