import { QrScanner } from "@yudiel/react-qr-scanner";

export default function Scanner(props: ParentModalProps) {
  return (
    <QrScanner
      onResult={(result) => {
        props.handler?.(result.getText());
        props.handleClose?.();
      }}
      onError={() => console.info("Scanner error")}
    />
  );
}
