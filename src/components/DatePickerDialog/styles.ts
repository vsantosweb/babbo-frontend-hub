import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DayPicker } from 'react-day-picker';

export const DataPicker = styled(DayPicker)`
  &.rdp {
    --rdp-cell-size: 40px; /* Size of the day cells. */
    --rdp-caption-font-size: 18px; /* Font size for the caption labels. */
    --rdp-accent-color: ${({ theme }: { theme: any }) =>
      theme.colors
        .primary}; /* Accent color for the background of selected days. */
    --rdp-background-color: ${({ theme }: { theme: any }) =>
      theme.colors.primary +
      '26'}; /* Background color for the hovered/focused elements. */
    --rdp-accent-color-dark: #3003e1; /* Accent color for the background of selected days (to use in dark-mode). */
    --rdp-background-color-dark: ${({ theme }: { theme: any }) =>
      theme.colors.primary +
      '26'}; /* Background color for the hovered/focused elements (to use in dark-mode). */
    --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
    --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */
    --rdp-selected-color: #fff; /* Color of selected day text */
    background-color: #fff;

    padding: 1em;
    border-radius: ${({ theme }: { theme: any }) => theme.defaultRadius};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
      rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  }
`;
