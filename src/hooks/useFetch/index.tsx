import { useEffect, useState } from "react";

export default function useFetch(promise) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (promise.status === 'fulfilled') {
                return promise.value;
              } else if (promise.status === 'rejected') {
                throw promise.reason;
              } else if (promise.status === 'pending') {
                throw promise;
              } else {
                promise.status = 'pending';
                promise.then(
                  result => {
                    promise.status = 'fulfilled';
                    promise.value = result;
                  },
                  reason => {
                    promise.status = 'rejected';
                    promise.reason = reason;
                  },      
                );
                throw promise;
              }
        }
        fetchData();
    }, []); // the empty array ensures that the effect only runs once
    return { data, error, loading };
}