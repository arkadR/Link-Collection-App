import React, { ReactElement } from "react";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

interface NumberInputProps {
  value: number;
  onChange: (newVal: number) => void;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}

export default function NumberInput(props: NumberInputProps): ReactElement {
  return (
    <TextField
      value={props.value}
      defaultValue={props.value}
      onChange={(event) => props.onChange(Number(event.target.value))}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
    />
  );
}
