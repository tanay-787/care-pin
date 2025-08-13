"use client";
import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

interface StaffSelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

const StaffSelect: React.FC<StaffSelectProps> = ({ options, onChange, defaultValue }) => (
  <Select
    options={options}
    showSearch
    placeholder="Select staff"
    onChange={onChange}
    defaultValue={defaultValue}
    aria-label="Select staff member"
    filterOption={(input, option) =>
      (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
    }
    style={{ width: "100%" }}
  />
);

export default StaffSelect;