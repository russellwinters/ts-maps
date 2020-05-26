import React, { useRef, Dispatch, SetStateAction, FormEvent } from "react";
// import { LatLng } from "@googlemaps/google-maps-services-js";
import { AddressType } from "../Models/AddressTypeEnum";
interface ComponentProps {
  setLocation: (address: string, typeOfAddress: AddressType) => void;
  addressType: AddressType;
  locationType: string;
}

const AddressInput: React.FC<ComponentProps> = ({
  setLocation,
  addressType,
  locationType,
}) => {
  const locationInputRef = useRef<HTMLInputElement>(null);

  const clickHandler = (event: FormEvent) => {
    event.preventDefault();
    const locationValue = locationInputRef.current!.value;
    setLocation(locationValue, addressType);
  };

  return (
    <form onSubmit={clickHandler}>
      <label>{locationType} Address: </label>
      <input
        type="address"
        placeholder={`${locationType} Address`}
        ref={locationInputRef}
      />
      <button>Enter {locationType} Address</button>
    </form>
  );
};

export default AddressInput;
