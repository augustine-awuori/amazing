import { BadgesList } from "../common";
import useStatus, { Status } from "../../hooks/useStatus";

interface Props {
  onStatusSelect: (status: Status) => void;
  selectedStatus: Status | null;
}

const StatusBadgesList = ({ onStatusSelect, selectedStatus }: Props) => {
  const { status, isLoading } = useStatus();

  return (
    <BadgesList
      list={status}
      loading={isLoading}
      onItemSelect={(status) => onStatusSelect(status as Status)}
      selectedItem={selectedStatus}
    />
  );
};

export default StatusBadgesList;
