import React from "react";

import { HomeButton, BackButton } from "./NavButtons";
const Nav = () => {

    return (
      <div className="nav__holder">
        <BackButton />
        <HomeButton />
      </div>
    );
};

export default Nav;
