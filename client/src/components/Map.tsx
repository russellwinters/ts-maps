import React, { useState, useEffect } from "react";
import { FindLatLng, FindDistance } from "../Utlis/FindLocation";
import { LatLng } from "../Models/LatLng";
import { MatrixResult } from "../Models/DistanceMatrixResults";

export default function Map() {
  const [origin, setOrigin] = useState<LatLng>({});
  const [destination, setDestination] = useState<LatLng>({});
  const [distance, setDistance] = useState<MatrixResult>({});
  const [duration, setDuration] = useState<MatrixResult>({});

  useEffect(() => {
    if (!origin.lat && !destination.lat) {
      (async () => {
        const address = await FindLatLng("1 Surrey Lane, East Setauket");

        setOrigin(address);
      })();
      (async () => {
        const address = await FindLatLng("1638 West 12th Avenue, Vancouver ");
        setDestination(address);
      })();
    }
  }, []);

  if (origin.lat && destination.lat && !distance.text && !duration.text) {
    (async () => {
      let DistanceMatrixData = await FindDistance(origin, destination);
      console.log(DistanceMatrixData.elements[0]);
      const { distance, duration } = DistanceMatrixData.elements[0];
      setDistance(distance);
      setDuration(duration);
    })();
  }

  if (distance.text && duration.text) {
    return (
      <div>
        <p>Total Distance: {distance.text}</p>
        <p>Driving Time: {duration.text}</p>
      </div>
    );
  } else {
    return <div>Map</div>;
  }
}
