import styled from '@emotion/styled';

export const SearchOverlay = styled.div`
  top: 60px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 100%;
  min-width: 100%;
  background: rgba(51, 51, 51, 0.75);
  z-index: 2;
  body {
    overflow: hidden !important;
  }
`;

export const ResultBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
  top: 48px;
  border-top: solid 1px #ddd;
  padding: 1em;
  /* border: solid 1px; */
  min-height: 300px;
  max-height: 380px;
  overflow-y: auto;
  background-color: #fff;
  position: absolute;
  border-bottom-left-radius: ${({ theme }: { theme: any }) =>
    theme.defaultRadius};
  border-bottom-right-radius: ${({ theme }: { theme: any }) =>
    theme.defaultRadius};

  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    right: 0;
    height: 100%;
    top: 60px;
  }
`;

export const SuggestedList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const SuggestedListItem = styled.li`
  padding: 0.8em;
  /* border: solid 1px; */
  border-radius: ${({ theme }: { theme: any }) => theme.defaultRadius};
  &:hover {
    background: #f0f0f0;
    cursor: pointer;
  }
`;
