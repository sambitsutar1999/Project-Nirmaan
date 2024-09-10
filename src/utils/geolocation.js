// src/utils/geolocation.js

export const getLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback(null, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          callback(error, null);
        }
      );
    } else {
      callback(new Error("Geolocation is not supported by this browser."), null);
    }
  };
  