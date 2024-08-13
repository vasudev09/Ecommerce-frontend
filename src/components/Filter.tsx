"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [filters, setFilters] = useState({
    type: "",
    min: "",
    max: "",
    size: "",
    color: "",
    tag: "",
    sort: "",
  });

  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      min: searchParams.get("min") || "",
      max: searchParams.get("max") || "",
      size: searchParams.get("size") || "",
      color: searchParams.get("color") || "",
      tag: searchParams.get("tag") || "",
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  //debounce function
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleMinChange = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === "") {
        params.delete("min");
      } else {
        params.set("min", value);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 750),
    [searchParams, pathname]
  );

  const debouncedHandleMaxChange = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === "") {
        params.delete("max");
      } else {
        params.set("max", value);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 750),
    [searchParams, pathname]
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, min: value }));
    debouncedHandleMinChange(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, max: value }));
    debouncedHandleMaxChange(value);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">Type</option>
          <option value="ME">Men</option>
          <option value="WE">Women</option>
          <option value="KI">Kids</option>
          <option value="GE">General</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={filters.min}
          onChange={handleMinChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={filters.max}
          onChange={handleMaxChange}
        />
        <select
          name="size"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value={filters.size}
          onChange={handleFilterChange}
        >
          <option value="">Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <select
          name="color"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value={filters.color}
          onChange={handleFilterChange}
        >
          <option value="">Color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
        </select>
        <select
          name="tag"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value={filters.tag}
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          <option value="4">New Arrival</option>
          <option value="5">Popular</option>
          <option value="1">Summer Sale</option>
          <option value="2">Winter Sale</option>
          <option value="3">Spring Sale</option>
        </select>
        <select
          name="all"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value="A"
          onChange={(e) => {
            if (e.target.value === "R") replace(pathname);
          }}
        >
          <option value="A">All Filters</option>
          <option value="R">Remove All</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          value={filters.sort}
          onChange={handleFilterChange}
        >
          <option value="">Sort By</option>
          <option value="lth">Price (low to high)</option>
          <option value="htl">Price (high to low)</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
