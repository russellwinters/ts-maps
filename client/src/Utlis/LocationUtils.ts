import { Client } from "@googlemaps/google-maps-services-js";
import { GOOGLE_KEY } from "../envconfig";
import { LatLng } from "../Models/LatLng";
export const FindLatLng = async (address: string) => {
  const client = new Client({});

  const FetchLocation = await client.geocode({
    params: {
      address: address,
      key: GOOGLE_KEY,
    },
  });
  return FetchLocation.data.results[0].geometry.location;
};

export const FindDistance = async (origin: LatLng, destination: LatLng) => {
  const client = new Client({});
  const distanceMatrix = await client.distancematrix({
    params: {
      origins: [`${origin.lat},${origin.lng}`],
      destinations: [`${destination.lat},${destination.lng}`],
      key: GOOGLE_KEY,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return distanceMatrix.data.rows[0];
};
