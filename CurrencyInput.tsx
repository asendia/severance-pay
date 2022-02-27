import React from 'react';
import NumberFormat from 'react-number-format';

export interface NumberFormatCustomProps<T> {
  inputRef: (instance: NumberFormat<T> | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CurrencyInput = React.forwardRef(function NumberFormatCustom<T>(props: NumberFormatCustomProps<T>, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix='Rp '
    />
  );
});

export default CurrencyInput;
