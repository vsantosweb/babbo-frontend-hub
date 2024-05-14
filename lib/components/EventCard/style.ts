import styled from '@emotion/styled';

export const CardEvent = styled.div`
  border-radius: ${({ theme }: any) => theme.defaultRadius};
  background: #fff;
  /* border: solid 1px #eee; */
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1em;
  @media(max-width: 768px){
    margin-bottom: 2em;
  }
  -khtml-user-select: none !important;
  -o-user-select: none !important;
  -moz-user-select: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

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
  max-height: 430px;
  height: 330px;
  width: 100%;
  overflow: hidden;
  position: relative;
`;
export const CardEventImage = styled.img`
  border-top-left-radius: ${({ theme }: any) => theme.defaultRadius};
  border-top-right-radius: ${({ theme }: any) => theme.defaultRadius};
  border-bottom-left-radius: ${({ theme }: any) => theme.defaultRadius};
  border-bottom-right-radius: ${({ theme }: any) => theme.defaultRadius};
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: none;
  -khtml-user-select: none !important;
  -o-user-select: none !important;
  -moz-user-select: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export const CardEventBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.3em 0.3em;
  text-decoration: none;
  position: relative;
  color: inherit;
  -khtml-user-select: none !important;
  -o-user-select: none !important;
  -moz-user-select: none !important;
  -webkit-user-select: none;
  user-select: none !important;
`;

export const CategoryTag = styled.div`
  position: absolute;
  background: ${({ theme }: any) => theme.colors.primary};
  margin-top: -11px;
  margin-left: 10px;
  border-radius: ${({ theme }: any) => theme.defaultRadius};
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding-bottom: 3px;
`;
export const CardEventDetails = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 6px;
`;
export const CardEventDateInfo = styled.span`
  display: flex;
  align-items: center;
`;
export const CardEventMutedText = styled.span`
  display: flex;
  gap: 6px;
  font-size: 0.9rem;
  align-items: center;
  font-weight: 600;
  color: #818181;
`;
export const CardEventTitle = styled.h2`
  /* font-size: 1rem;
  font-weight: 500;
  display: inline-block;
  overflow: hidden;
  position: relative;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap; */
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
  }
`;
export const OwnerName = styled.div`
  color: unset;
  font-size: 12px;
  font-weight: bold;
`;

export const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
`;
