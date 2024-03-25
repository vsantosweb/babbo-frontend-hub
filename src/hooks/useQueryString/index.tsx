import { useRouter } from 'next/router';
import queryString, { ParsedQuery } from 'query-string';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import { createContext, useContext, useEffect, useState } from 'react';

type QueryProps = {
  [index: string]: string;
};

const QueryStringContext = createContext<any>({});

export function useQueryString() {
  const { toString, parsed, parseQueryString, query, setQuery, router } =
    useContext(QueryStringContext);

  return { toString, parsed, parseQueryString, query, setQuery, router };
}

export function QueryStringProvider({ children }: { children: JSX.Element }) {
  const [parsed, setParsed] = useState<string>();

  const [query, setQuery] = useState<Record<string, any>>();

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
    <QueryStringContext.Provider value={{ parsed, query, setQuery, router }}>
      {children}
    </QueryStringContext.Provider>
  );
}
