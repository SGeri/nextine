import { Alert } from "@mantine/core";
import { AlertCircle } from "react-feather";

export default function PlaceholderAlert() {
  return (
    <Alert
      icon={<AlertCircle size={16} />}
      title="Figyelmeztetés"
      color="red"
      variant="outline"
    >
      Az oldalon megjelenő elemek kizárólag díszítő helyet töltenek be,
      funkcionalitással (egyelőre) nem rendelkeznek!
    </Alert>
  );
}
