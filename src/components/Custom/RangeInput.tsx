import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  column-count: 2;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50px;
  margin-inline-end: 5px;
  margin-top: 5px;
`;

interface RangeInputProps {
  title: string;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: Function;
}

const RangeInput = ({
  title,
  min,
  max,
  minValue,
  maxValue,
  onChange,
}: RangeInputProps) => {
  const [minV, setMinV] = useState(minValue);
  const [maxV, setMaxV] = useState(maxValue);
  const onMinValueChange = (e: any) => {
    var value = e.target.value;
    console.log("onMinValueChange", value);
    if (value === "") {
      setMinV(minValue);
      alert(title + " should be between " + min + " to " + max);
    } else if (maxV < value) {
      setMinV(minValue);
      alert("Min " + title + " should be between " + min + " to " + maxValue);
    } else {
      setMinV(value);
      onChange(value, maxV);
    }
  };

  const onMaxValueChange = (e: any) => {
    var value = e.target.value;
    console.log("onMaxValueChange", value);
    if (value === "") {
      setMinV(minValue);
      alert(title + " should be between " + min + " to " + max);
    } else if (minV > value) {
      setMaxV(maxValue);
      alert("Max " + title + " should be between " + minValue + " to " + max);
    } else {
      setMaxV(value);
      onChange(minV, value);
    }
  };

  return (
    <Container>
      <Input
        min={min}
        max={max}
        type="number"
        placeholder="Min"
        value={minValue}
        onChange={onMinValueChange}
      />
      <Input
        min={min}
        max={max}
        type="number"
        placeholder="Max"
        value={maxValue}
        onChange={onMaxValueChange}
      />
    </Container>
  );
};

export default RangeInput;
