import styled from "@emotion/styled";

export const CardEvent = styled.div`
  border-radius: ${({ theme }:any) => theme.defaultRadius};
  background: #fff;
  /* border: solid 1px #eee; */
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 2em;
  -khtml-user-select: none !important;
  -o-user-select: none !important;
  -moz-user-select: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  position: relative;
  width: 100%;
  height: 500px;
  &:hover {
    /* box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.07); */
    transition: all 0.5s;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
export const CardEventImageContainer = styled.div`
/* max-height: 280px; */
/* height: 280px; */
overflow: hidden;
`
export const CardEventImage = styled.img`
  /* box-shadow: 0 13px 27px -5px #32325d40,0 8px 16px -8px #0000004d,0 -6px 16px -6px #00000008; */
  border-top-left-radius: ${({ theme }:any) => theme.defaultRadius};
  border-top-right-radius: ${({ theme }:any) => theme.defaultRadius};
  border-bottom-left-radius: ${({ theme }:any) => theme.defaultRadius};
  border-bottom-right-radius: ${({ theme }:any) => theme.defaultRadius};
  width: 100%;
  position: absolute;
  height: 100%;
  object-fit: cover;
  overflow: none;
`;

export const CardEventBody = styled.a`
  display: flex;
  background-color: #fff;
  position: absolute;
  flex-direction: column;
  gap:5px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 1em;
  border-radius: 14px;
  padding: 1em;
  text-decoration: none;
  color: inherit;
`;

export const CategoryTag = styled.div`
  position: absolute;
  background: ${({ theme }: any) => theme.colors.primary};
  margin-top: -11px;
  margin-left: 10px;
  border-radius: ${({ theme }:any) => theme.defaultRadius};
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding-bottom: 3px;
`;
export const CardEventDetails = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`
export const CardEventDateInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;

`
export const CardEventMutedText = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
  color: #818181;
`
export const CardEventTitle = styled.h1`
  font-size: 1.4em;
  display: box;
  line-clamp: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
`;

export const CardEventInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const CardEventPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CardEventPriceText = styled.div`
  font-size: 11px;
  color: #8d8d8d;
`;

export const CardEventPrice = styled.div`
  display: block;
  font-size: 1.3em;
  font-weight: bold;
`;

export const CardEventFooter = styled.div`
  padding: 6px;
  background-color: transparent;
`;

export const OwnerImage = styled.div`
  margin-right: 5px;
    max-width: 25px;
    border-radius: 100%;
    image {
      width: 100%;
      border-radius: 100%;
    }`
    ;
export const OwnerName = styled.div`
color: unset;
    font-size: 12px;
    font-weight: bold;
`;

export const OwnerInfo = styled.div`
  display: flex;
  align-items: center;

`;
