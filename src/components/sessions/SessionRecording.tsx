import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceDownload from "./InvoiceDownload";


const SessionRecording = ({ recordingLink, amount }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Session Recording & Billing</CardTitle>
      </CardHeader>
      <CardContent>
        <p>🎥 <b>Recording Link:</b> <a href={recordingLink} className="text-blue-500">View Recording</a></p>
        <p>💰 <b>Billing Amount:</b> {amount}</p>
        <InvoiceDownload />
      </CardContent>
    </Card>
  );
};

export default SessionRecording;
