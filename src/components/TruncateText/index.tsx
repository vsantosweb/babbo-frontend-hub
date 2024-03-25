import React, { useState } from 'react';

export const TruncateText = ({ text, limit }: { text: string, limit: number }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {isTruncated ? (
        <p
          dangerouslySetInnerHTML={{ __html: `${text?.slice(0, limit)}....` }}
        />
      ) : (
        <p>{text}</p>
      )}
      {text?.length > limit && (
        <button onClick={toggleTruncate}>
          {isTruncated ? 'Ler mais' : 'Ler menos'}
        </button>
      )}
    </div>
  );
};
