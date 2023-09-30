import React from "react";

import Heading from "../../components/Heading";

interface Props {
  children: React.ReactNode;
}

const AppHeading = ({ children }: Props) => (
  <Heading fontSize="2xl" noOfLines={1}>
    {children}
  </Heading>
);

export default AppHeading;
