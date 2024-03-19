import { Thead, Th } from "@chakra-ui/react";

interface Props {
  headings: string[];
}

const AppThead = ({ headings }: Props) => (
  <Thead>
    {headings.map((heading, index) => (
      <Th textAlign="center" key={index}>
        {heading}
      </Th>
    ))}
  </Thead>
);

export default AppThead;
