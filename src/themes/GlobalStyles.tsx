import { css } from "@emotion/react";
import styled from "@emotion/styled";

const GlobalStyles = css`
@import '~line-awesome/dist/line-awesome/css/line-awesome.css';

  body,
  html, #root {
    height: 100%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
  }

  *:focus {
    outline: none !important;
  }
  .slideNav {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background: none;
    border: solid 1px;
    outline: none;
    font-size: 24px;
    box-shadow: none;
    margin-bottom: 0;  
    margin-right: 0.4em;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    &:focus {
      outline: none;
    }
    &.swiper-button-disabled{
      opacity: .4;
    }
  }
  .InovuaReactDataGrid > div:nth-child(3) {
    display: none !important;
  }
  .InovuaReactDataGrid{
    border:none
  }
  .InovuaReactDataGrid__row{}
  .InovuaReactDataGrid--theme-pink-light .InovuaReactDataGrid__column-header--show-border-left, .InovuaReactDataGrid--theme-pink-light .InovuaReactDataGrid__column-header__resize-wrapper--show-border-left,
   .InovuaReactDataGrid--theme-pink-light .InovuaReactDataGrid__header-group__title--show-border-left	{
    border-left: none !important;
  }
  .InovuaReactDataGrid__column-header__resize-wrapper
	{ border: none !important}
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .slideNav {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background: none;
    border: solid 1px;
    outline: none;
    font-size: 24px;
    box-shadow: none;
    margin-bottom: 0;  
    margin-right: 0.4em;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    &:focus {
      outline: none;
    }
    &.swiper-button-disabled{
      opacity: .4;
    }
  }
  /* .swiper-container{
    padding: 0px 1em;
  } */
`;
export const ViewPort = styled.main`
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: auto;
  align-items: center;
`;

export default GlobalStyles;
