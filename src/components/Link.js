import React from "react";
import { withRouter } from "react-router-dom";

const Link = function({history, path, buttonComponent}) {
  const handleClick = () => {
    history.push(path);
  };

  return (
    <div className="link__wrapper" onClick={handleClick}>
      {buttonComponent}
    </div>
  );
};

export default withRouter(Link);
