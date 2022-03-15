import React from "react";

const Alerta = ({children}) => {
  return (
    <div>
        <div className="text-center my-.7 bg-red-600 text-white font-bold  uppercase rounded-lg">
          {children}
        </div>
    </div>
  );
};

export default Alerta;
