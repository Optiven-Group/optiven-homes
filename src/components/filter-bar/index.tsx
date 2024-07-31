"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const propertyTypes = [
  "Apartment",
  "Maisonette",
  "Bungalow",
  "Cottage",
  "Villa",
  "Duplex",
];
const bedrooms = [1, 2, 3, 4, 5];

interface FilterBarProps {
  initialFilters: {
    propertyTypes?: string[];
    bedrooms?: number[];
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function FilterBar({ initialFilters = {} }: FilterBarProps) {
  const router = useRouter();
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState<boolean>(false);
  const [showBedroomsDropdown, setShowBedroomsDropdown] =
    useState<boolean>(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState<boolean>(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    initialFilters.propertyTypes || []
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>(
    initialFilters.bedrooms || []
  );
  const [minPrice, setMinPrice] = useState<string>(
    initialFilters.minPrice || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    initialFilters.maxPrice || ""
  );

  const toggleSelection = (
    list: any[],
    setList: Function,
    value: string | number
  ) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  const formatSelections = (
    selections: (string | number)[],
    defaultText: string
  ) => {
    return selections.length > 0 ? selections.join(", ") : defaultText;
  };

  const handleSearch = () => {
    const query: { [key: string]: string | number | undefined } = {};

    if (selectedPropertyTypes.length > 0) {
      query.propertyTypes = selectedPropertyTypes.join(",");
    }
    if (selectedBedrooms.length > 0) {
      query.bedrooms = selectedBedrooms.join(",");
    }
    if (minPrice) {
      query.minPrice = minPrice;
    }
    if (maxPrice) {
      query.maxPrice = maxPrice;
    }

    router.push({
      pathname: "/plans",
      query,
    });
  };

  const formatWithCommas = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/,/g, "");
    setMinPrice(formattedValue);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/,/g, "");
    setMaxPrice(formattedValue);
  };

  return (
    <div className={styles.filterBarWrapper}>
      <div className={styles.filterBar}>
        <div className={styles.filterItem}>
          <div
            className={styles.label}
            onClick={() =>
              setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
            }
          >
            <span>Property Type</span>
            <span className={styles.chevron}>
              {showPropertyTypeDropdown ? "▲" : "▼"}
            </span>
          </div>
          <div className={styles.selection}>
            {formatSelections(selectedPropertyTypes, "Any")}
          </div>
          {showPropertyTypeDropdown && (
            <div className={styles.dropdownContent}>
              {propertyTypes.map((type) => (
                <label key={type} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedPropertyTypes.includes(type)}
                    onChange={() =>
                      toggleSelection(
                        selectedPropertyTypes,
                        setSelectedPropertyTypes,
                        type
                      )
                    }
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.filterItem}>
          <div
            className={styles.label}
            onClick={() => setShowBedroomsDropdown(!showBedroomsDropdown)}
          >
            <span>Bedrooms</span>
            <span className={styles.chevron}>
              {showBedroomsDropdown ? "▲" : "▼"}
            </span>
          </div>
          <div className={styles.selection}>
            {formatSelections(selectedBedrooms, "Any")}
          </div>
          {showBedroomsDropdown && (
            <div className={styles.dropdownContent}>
              {bedrooms.map((bedroom) => (
                <label key={bedroom} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    value={bedroom}
                    checked={selectedBedrooms.includes(bedroom)}
                    onChange={() =>
                      toggleSelection(
                        selectedBedrooms,
                        setSelectedBedrooms,
                        bedroom
                      )
                    }
                  />
                  {bedroom} Bedroom{bedroom > 1 ? "s" : ""}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.filterItem}>
          <div
            className={styles.label}
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          >
            <span>Price Range</span>
            <span className={styles.chevron}>
              {showPriceDropdown ? "▲" : "▼"}
            </span>
          </div>
          <div className={styles.selection}>
            {formatWithCommas(minPrice) || "Any"} -{" "}
            {formatWithCommas(maxPrice) || "Any"}
          </div>
          {showPriceDropdown && (
            <div className={styles.dropdownContent}>
              <div className={styles.priceRange}>
                <label className={styles.label}>
                  From (KES)
                  <input
                    type="text"
                    placeholder="0"
                    value={formatWithCommas(minPrice)}
                    onChange={handleMinPriceChange}
                  />
                </label>
                <label className={styles.label}>
                  To (KES)
                  <input
                    type="text"
                    placeholder="10,000,000"
                    value={formatWithCommas(maxPrice)}
                    onChange={handleMaxPriceChange}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        <div className={styles.separator}></div>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
