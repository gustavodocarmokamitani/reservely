import { useState } from "react";

export const useStateCustom = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    storeName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  return { formData, setFormData, isLoading, setIsLoading };
};
