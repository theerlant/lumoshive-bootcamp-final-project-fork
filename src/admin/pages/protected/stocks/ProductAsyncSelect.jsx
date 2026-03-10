import React, { useState, useEffect } from "react";
import Select from "react-select";
import { productService } from "../../../../shared/services/productService";

export default function ProductAsyncSelect({ value, onChange, error }) {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadOptions = async (currentPage, searchQuery, isNewSearch = false) => {
    setLoading(true);
    try {
      const res = await productService.public.getAll({
        page: currentPage,
        limit: 10,
        search: searchQuery || undefined,
      });

      const newProducts = res?.data?.data || res?.data || [];
      const pagination = res?.pagination || res?.meta || {};
      const totalPages =
        pagination.total_pages ||
        Math.ceil((pagination.total_items || pagination.total || 0) / 10) ||
        1;

      const formattedOptions = newProducts.map((p) => ({
        value: p.id,
        label: p.name,
        original: p, // keep the original object
      }));

      setOptions((prev) =>
        isNewSearch ? formattedOptions : [...prev, ...formattedOptions],
      );
      setHasMore(currentPage < totalPages);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions(1, "", true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === "") return;
      setPage(1);
      loadOptions(1, search, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleScrollToBottom = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadOptions(nextPage, search, false);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "2px",
      borderRadius: "0.5rem",
      backgroundColor: "#f9fafb", // bg-gray-50
      borderColor: error ? "#ef4444" : state.isFocused ? "#DB4444" : "#e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 1px #DB4444" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#DB4444" : "#d1d5db",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#DB4444"
        : state.isFocused
          ? "#fef2f2"
          : "white",
      color: state.isSelected
        ? "white"
        : state.isFocused
          ? "#DB4444"
          : "inherit",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#DB4444",
        color: "white",
      },
    }),
  };

  const selectedOption = value ? { value: value.id, label: value.name } : null;

  return (
    <Select
      value={selectedOption}
      options={options}
      onInputChange={(inputValue, { action }) => {
        if (action === "input-change") setSearch(inputValue);
      }}
      onChange={(selectedOption) => {
        onChange(selectedOption ? selectedOption.original : null);
      }}
      onMenuScrollToBottom={handleScrollToBottom}
      isLoading={loading}
      styles={customStyles}
      placeholder="Select Product"
      isClearable
      filterOption={null}
    />
  );
}
