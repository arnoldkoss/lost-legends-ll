import { useEffect, useRef, useState } from "react";

// Custom hook for toggling state when clicking outside a specified element
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  // Effect to handle click outside events
  useEffect(() => {
    // Function to handle click outside events
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    // Adding event listener to the document for mouseup events
    document.addEventListener("mouseup", handleClickOutside);
    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  // Returning the expanded state, function to set expanded state, and the ref
  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
