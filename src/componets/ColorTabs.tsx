import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tabs = ["Tab 1", "Tab 2"];
const tabPanels = [
  "Contenido del Panel 1",
  "Contenido del Panel 2",
];

const ColorTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Variants para animaciones de entrada/salida
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%', // Animación desde la izquierda o derecha
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%', // Animación hacia la izquierda o derecha
      opacity: 1,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleTabChange = (index) => {
    setDirection(index > activeTab ? 1 : -1); // Determina la dirección de la animación
    setActiveTab(index);
  };

  return (
    <div style={{ width: "400px", margin: "0 auto", textAlign: "center" }}>
      {/* TabList */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: index === activeTab ? "#007bff" : "#ddd",
              color: index === activeTab ? "white" : "black",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TabPanel con animaciones */}
      <div
        style={{
          position: "relative",
          height: "150px",
          marginTop: "20px",
          overflow: "hidden",
        }}
      >
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={activeTab} // Cambia la clave para activar AnimatePresence
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              // x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 40 },
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >

            {activeTab === 0 && (
              tabPanels[activeTab]

            )}


            {activeTab === 1 && (
              tabPanels[activeTab]

            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ColorTabs;
