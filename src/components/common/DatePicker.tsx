import { Flex } from "@chakra-ui/react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Text } from "../";

interface Props extends ReactDatePickerProps {
  label: string;
}

const AppDatePicker = ({ label, ...rest }: Props) => (
  <Flex mb={3} justify="space-between" w="100%" align="center">
    <Text mr={1}>{label}:</Text>
    <DatePicker
      {...rest}
      minDate={new Date()}
      placeholderText="Select Start Date"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  </Flex>
);

export default AppDatePicker;
