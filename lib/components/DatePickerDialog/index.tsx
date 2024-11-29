import React, { useRef, useState } from 'react';

import { format } from 'date-fns';
import { Box, Button, HStack, Input } from '@chakra-ui/react';
import * as Styled from './styles';
import moment from 'moment';
import { useEvent, useQueryString } from '@/hooks';

export function DatePickerDialog({
  handleCallBack,
}: {
  handleCallBack?: () => void;
}) {
  const { query, setQuery } = useQueryString();
  const [selectedRange, setSelectedRange] = useState<
    DateRange & { formatted?: string }
  >();
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const { loading } = useEvent();

  const [rangeDate, setRangeDate] = useState<{ [index: string]: string }>();

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleRangeSelect: SelectRangeEventHandler = (range) => {
    setSelectedRange(range);

    if (range)
      setSelectedRange({
        ...range,
        formatted: `${moment(range.from)
          .format('MMM, DD')
          .toUpperCase()} - ${moment(range.to)
          .format('MMM, DD')
          .toUpperCase()}`,
      });

    let setDates = {};

    if (range?.from) {
      setDates = { ...setDates, from_date: format(range.from, 'y-MM-dd') };

      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setDates = { ...setDates, from_date: '' };

      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));

      setDates = { ...setDates, to_date: format(range.to, 'y-MM-dd') };
    } else {
      setToValue('');
      setDates = { ...setDates, to_date: '' };
    }

    setRangeDate(setDates);
  };

  return (
    <Box>
      <Box ref={popperRef}>
        <Input
          width={'100%'}
          type="button"
          aria-label="Pick a date"
          onClick={handleButtonClick}
          value={`${selectedRange?.formatted || 'Selecione uma data'}`}
        />
      </Box>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onDeactivate: closePopper,
            fallbackFocus: buttonRef.current || undefined,
          }}
        >
          <Box
            zIndex={1}
            style={popper.styles.popper}
            className="dialog-sheet"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
          >
            <Styled.DataPicker
              max={15}
              mode="range"
              selected={selectedRange}
              onSelect={handleRangeSelect}
              fromDate={new Date()}
              footer={
                <Box textAlign={'right'}>
                  <Button
                    isLoading={loading}
                    onClick={() =>
                      setQuery({
                        ...query,
                        date_range: `${rangeDate?.from_date},${rangeDate?.to_date}`,
                        name: '',
                      })
                    }
                    variant="outline"
                  >
                    Buscar eventos
                  </Button>
                </Box>
              }
            />
          </Box>
        </FocusTrap>
      )}
    </Box>
  );
}
