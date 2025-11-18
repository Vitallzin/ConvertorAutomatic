import React from "react";
import "../FeatureCards/FeatureCards.css";

export default function FeatureItem({ icon, title1, title2, title3, description }) {
  return (
    <div className="feature-item">
      <div className="feature-icon">{icon}</div>

      {title1 && <h3 className="feature-title1">{title1}</h3>}
      {title2 && <h3 className="feature-title2">{title2}</h3>}
      {title3 && <h3 className="feature-title3">{title3}</h3>}

      {description && <p className="feature-description">{description}</p>}
    </div>
  );
}

