import React, { useState } from 'react';

export const TruncateText = ({ text, limit }: { text?: string | undefined, limit: number }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {text && text.length > limit ? (
        <div
          dangerouslySetInnerHTML={{ __html: `${text?.slice(0, limit)}...` }}
        />
      ) : text && <div dangerouslySetInnerHTML={{ __html: text }} />}
      {/* {text?.length > limit && (
        <button onClick={toggleTruncate}>
          {isTruncated ? 'Ler mais' : 'Ler menos'}
        </button>
      )} */}
    </div>
  );
};
