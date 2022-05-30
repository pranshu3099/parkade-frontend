import { useEffect, useState } from "react";
import { firebase } from "../contexts/Provider";

const useFetch = (document) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = firebase.firestore().collection(document);
    const unsub = ref.onSnapshot((QuerySnapshot) => {
      let items = [];
      QuerySnapshot.forEach((doc) => {
        if (doc.exists) {
          items.push(doc.data());
        } else {
          setError("Could not fetch data");
        }
      });
      setData([...data, ...items]);
    });

    return unsub;
  }, []);
  return { data, error };
};

export default useFetch;
