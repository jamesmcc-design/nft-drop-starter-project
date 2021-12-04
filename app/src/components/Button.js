import React from "react";

const Button = ( title, onClick) => {
  return(
      <button
        className="cta-button connect-wallet-button"
        onClick={onClick}
      >
        {title}
      </button>
  )
}

export default Button 