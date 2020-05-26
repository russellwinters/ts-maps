import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FindLatLng, FindDistance } from "../Utlis/LocationUtils";
import { LatLng } from "../Models/LatLng";
import { MatrixResult } from "../Models/DistanceMatrixResults";
import AddressInput from "./AddressInput";
import { AddressType } from "../Models/AddressTypeEnum";
import TextForm from "./TextForm";

export default function Map() {
  const [originAddress, setOriginAddress] = useState<string | null>(null);
  const [origin, setOrigin] = useState<LatLng>({});
  const [destinationAddress, setDestinationAddress] = useState<string | null>(
    null
  );
  const [destination, setDestination] = useState<LatLng>({});
  const [distance, setDistance] = useState<MatrixResult>({});
  const [duration, setDuration] = useState<MatrixResult>({});

  //!Effect that takes Street Addresses (once submitted) and outputs lat/lng for each.
  useEffect(() => {
    if (originAddress !== null && destinationAddress !== null) {
      if (!origin.lat && !destination.lat) {
        (async () => {
          const address = await FindLatLng(originAddress);
          setOrigin(address);
        })();
        (async () => {
          const address = await FindLatLng(destinationAddress);
          setDestination(address);
        })();
      }
    }
  }, [originAddress, destinationAddress]);

  //!Effect that takes origin & Destination lat/lng values and fetches distances/duration
  useEffect(() => {
    if (origin.lat && destination.lat) {
      (async () => {
        let DistanceMatrixData = await FindDistance(origin, destination);
        console.log(DistanceMatrixData.elements[0]);
        const { distance, duration } = DistanceMatrixData.elements[0];
        setDistance(distance);
        setDuration(duration);
      })();
    }
  }, [origin, destination]);

  //!Must be in component because it relies on useState values for this component
  const setAddress = (address: string, typeOfAddress: AddressType) => {
    if (typeOfAddress === AddressType.Origin) {
      setOriginAddress(address);
    } else if (typeOfAddress === AddressType.Destination) {
      setDestinationAddress(address);
    } else {
      throw new Error("Not a Valid Argument for 'Type of Address'");
    }
  };

  //!Conditional Rendering
  if (distance.text && duration.text) {
    return (
      <div>
        <p>Total Distance: {distance.text}</p>
        <p>Driving Time: {duration.text}</p>
        <TextForm distance={distance} duration={duration} />
      </div>
    );
  } else {
    return (
      <div>
        <AddressInput
          setLocation={setAddress}
          locationType={"Origin"}
          addressType={AddressType.Origin}
        />
        <AddressInput
          setLocation={setAddress}
          locationType={"Destination"}
          addressType={AddressType.Destination}
        />
      </div>
    );
  }
}
