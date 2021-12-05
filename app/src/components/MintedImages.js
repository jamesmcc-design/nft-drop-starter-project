import React from "react";

const MintedImages = ( {mints} ) => (
  <div className="gif-container">
    <p className="sub-text">Minted Items ✨</p>
    <div className="gif-grid">
      {mints.map((mint) => (
        <div className="gif-item" key={mint}>
          <img src={mint} alt={`Minted NFT ${mint}`} />
        </div>
      ))}
    </div>
  </div>
)

export default MintedImages 
