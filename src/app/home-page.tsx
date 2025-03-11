"use client";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [current, setCurrent] = useState<string>();
  useEffect(() => {
    const fetchingdata = async () => {
      const response = await fetch("/api/hello", {
        method: "GET",
      });

      const data = await response.text();
      setCurrent(data);
    };
    fetchingdata();
  }, []);
  return <div>{current}</div>;
};

export default HomePage;
