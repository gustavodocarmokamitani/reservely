import { useState } from "react";
import { Store } from "../../models/Store";
import { DecodedToken } from "../../models/DecodedToken";

export const useStateCustom = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  return {
    store,
    setStore,
    selectedTimes,
    setSelectedTimes,
    decodedData,
    setDecodedData,
  };
};
