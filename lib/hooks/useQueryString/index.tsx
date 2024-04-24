import { useRouter } from 'next/router';
import queryString, { ParsedQuery } from 'query-string';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import { createContext, useContext, useEffect, useState } from 'react';

type QueryProps = {
  [index: string]: string;
};

const QueryStringContext = createContext<any>({});

export function useQueryString() {
  const context = useContext(QueryStringContext);

  return context;
}

export function QueryStringProvider({ children }: { children: JSX.Element }) {
  const [parsed, setParsed] = useState<string>();

  const [query, setQuery] = useState<Record<string, any>>();

  const clearQueryString = () => {
    router.replace(router.pathname); 
  };


  const router = useRouter();

  useEffect(() => {

    if (query) {

      setParsed(queryString.stringify(query));

      let temp = Object.assign({}, query);

      for (let key in temp) {
        if (temp[key] === '') delete temp[key];
      }

      router.push({
        pathname: router.pathname,
        query: { ...temp },
      });
      
    }


  }, [query]);

  return (
    <QueryStringContext.Provider value={{ parsed, query, setQuery, router, clearQueryString }}>
      {children}
    </QueryStringContext.Provider>
  );
}
