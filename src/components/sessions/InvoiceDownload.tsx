import { Button } from "@/components/ui/button";

const InvoiceDownload = () => {
  const handleDownload = () => {
    alert("Downloading Invoice...");
  };

  return <Button onClick={handleDownload} className="w-full mt-4">Download Invoice</Button>;
};

export default InvoiceDownload;
