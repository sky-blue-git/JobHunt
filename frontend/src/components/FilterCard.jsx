import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: [
      { label: "Delhi", value: "Delhi" },
      { label: "Bengaluru", value: "Bengaluru" },
      { label: "Hyderabad", value: "Hyderabad" },
      { label: "Pune", value: "Pune" },
      { label: "Mumbai", value: "Mumbai" },
    ],
  },
  {
    fitlerType: "Industry",
    array: [
      { label: "Frontend Developer", value: "Frontend" },
      { label: "Backend Developer", value: "Backend" },
      { label: "FullStack Developer", value: "FullStack" },
    ],
  },
  {
    fitlerType: "Salary",
    array: [
      { label: "0 to 5 LPA", value: "0-5" },
      { label: "5 to 10 LPA", value: "5-10" },
      { label: "10 to 20 LPA", value: "10-20" },
      { label: "20 to 50 LPA", value: "20-50" },
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-card border rounded-lg p-4 shadow-sm">
      <h1 className="font-bold text-lg mb-4 text-card-foreground">
        Filter Jobs
      </h1>
      <hr className="mb-4 border-border" />
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-4"
      >
        {fitlerData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h2 className="font-semibold text-base text-card-foreground">
              {data.fitlerType}
            </h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.value} id={itemId} />
                    <Label
                      htmlFor={itemId}
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      {item.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
