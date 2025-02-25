import { useState } from "react";

export const useStateCustom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { email, setEmail, password, setPassword, isLoading, setIsLoading };
};
