import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const useFetch = (url) => {
  const { getResJsonName } = useAuth();
  const { getResJsonId } = useAuth();
  const { getResJsonToken } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getResJsonToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setData(result.data);
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [url]);

  return { data, error, isPending }
};

export default useFetch;