import React, { useState } from "react";

interface ToggleProps {
  onToggle?: (state: boolean) => void;
  defaultState?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, defaultState = true }) => {
  const [isOn, setIsOn] = useState<boolean>(defaultState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggle}
        className={`w-10 cursor-pointer md:w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
          isOn ? "bg-secondary-CobaltBlue" : "bg-gray-300"
        }`}
        aria-pressed={isOn}
        role="switch"
      >
        <div
          className={`w-4 h-4 bg-white rounded-full  transform transition-transform duration-300 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.02),0px_2px_10px_0px_rgba(0,0,0,0.06),0px_0px_1px_0px_rgba(0,0,0,0.3)] ${
            isOn ? "md:translate-x-6 translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
