import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/NavBar";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

const CaseDetailPage = () => {
  const { id } = useParams();

  const [caseData, setCaseData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [custodyLogs, setCustodyLogs] = useState([]);
  const [showCustody, setShowCustody] = useState(false);

  const [showDisposal, setShowDisposal] = useState(false);
  const [disposalData, setDisposalData] = useState({
    disposalType: "",
    courtOrderReference: "",
    remarks: "",
  });

  const [showTransfer, setShowTransfer] = useState(false);
  const [transferData, setTransferData] = useState({
    from: "",
    to: "",
    purpose: "",
    remarks: "",
  });

  // ---------------- FETCH CASE ----------------
  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await api.get(`/cases/${id}`);
        setCaseData(res.data.case);
        setProperties(res.data.properties);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load case details");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  // ---------------- FETCH CUSTODY ----------------
  const openCustodyModal = async (property) => {
    try {
      const res = await api.get(`/custody/${property._id}`);
      setCustodyLogs(res.data);
      setSelectedProperty(property);
      setShowCustody(true);
    } catch (error) {
      toast.error("Failed to load custody logs");
    }
  };

  // ---------------- TRANSFER PROPERTY ----------------
  const handleTransfer = async () => {
    try {
      await api.post("/custody", {
        propertyId: selectedProperty._id,
        from: transferData.from,
        to: transferData.to,
        purpose: transferData.purpose,
        remarks: transferData.remarks,
      });
      toast.success("Property transferred successfully");
      setShowTransfer(false);

      // reset form
      setTransferData({
        from: "",
        to: "",
        purpose: "",
        remarks: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to transfer property");
    }
  };

  // ---------------- DISPOSE PROPERTY ----------------
  const handleDispose = async () => {
    try {
      await api.post("/disposal", {
        propertyId: selectedProperty._id,
        ...disposalData,
      });

      toast.success("Property disposed successfully");
      setShowDisposal(false);

      // refresh case
      const res = await api.get(`/cases/${id}`);
      setCaseData(res.data.case);
      setProperties(res.data.properties);
    } catch (error) {
      toast.error("Failed to dispose property");
    }
  };

  if (loading) return <p className="p-15">Loading case...</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* CASE INFO */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              Crime {caseData.crimeNumber} / {caseData.crimeYear}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Police Station:</strong> {caseData.policeStationName}
            </div>
            <div>
              <strong>Officer:</strong> {caseData.investigatingOfficerName}
            </div>
            <div>
              <strong>FIR Date:</strong>{" "}
              {new Date(caseData.dateOfFIR).toLocaleDateString()}
            </div>
            <div>
              <strong>Status:</strong> <Badge>{caseData.status}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* PROPERTIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <Card key={p._id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  {p.category}
                  <Badge>{p.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>{p.description}</p>
                <p>
                  <strong>Location:</strong> {p.location}
                </p>
                <div className="flex justify-between">
                {p.qrCode && (
                  <img src={p.qrCode} alt="QR Code" className="w-32" />
                )}
                {p.photoUrl && (
                    <img src={p.photoUrl} alt="Property Photo" className="w-32 border border-gray-500 rounded-md" />
                )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openCustodyModal(p)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Custody
                  </Button>
                  {p.status==="IN CUSTODY" && <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedProperty(p);
                      setShowTransfer(true);
                    }}
                  >
                    Transfer / Move
                  </Button>}
                  

                  {p.status === "IN CUSTODY" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedProperty(p);
                        setShowDisposal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Dispose
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CUSTODY MODAL */}
      <Dialog open={showCustody} onOpenChange={setShowCustody}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chain of Custody</DialogTitle>
          </DialogHeader>
          <ul className="space-y-2 text-sm">
            {custodyLogs.map((log) => (
              <li key={log._id}>
                {log.from} → {log.to} ({log.purpose})
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      {/* TRANSFER MODAL  */}
      <Dialog open={showTransfer} onOpenChange={setShowTransfer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer / Move Property</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label>From (Location / Officer)</Label>
              <Input
                placeholder="e.g. Malkhana"
                value={transferData.from}
                onChange={(e) =>
                  setTransferData({ ...transferData, from: e.target.value })
                }
              />
            </div>

            <div>
              <Label>To (Location / Officer)</Label>
              <Input
                placeholder="e.g. Court / FSL / Officer Name"
                value={transferData.to}
                onChange={(e) =>
                  setTransferData({ ...transferData, to: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Purpose</Label>
              <Select
                value={transferData.purpose}
                onValueChange={(value) =>
                  setTransferData({ ...transferData, purpose: value })
                }
              >
                <SelectTrigger className="w-full border rounded px-3 py-2">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Purpose</SelectLabel>
                    <SelectItem value="Court Production">
                      Court Production
                    </SelectItem>
                    <SelectItem value="Forensic Analysis">
                      Forensic Analysis(FSL)
                    </SelectItem>
                    <SelectItem value="Temporary Storage">
                      Temporary Storage
                    </SelectItem>
                    <SelectItem value="Officer Transfer">
                      Officer Transfer
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Remarks</Label>
              <Textarea
                placeholder="Optional remarks"
                value={transferData.remarks}
                onChange={(e) =>
                  setTransferData({ ...transferData, remarks: e.target.value })
                }
              />
            </div>

            <Button onClick={handleTransfer} className="w-full">
              Confirm Transfer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DISPOSAL MODAL */}
      <Dialog open={showDisposal} onOpenChange={setShowDisposal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispose Property</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Select
                value={disposalData.disposalType}
                onValueChange={(value) =>
                  setDisposalData({
                  ...disposalData,
                  disposalType:value,
                })
                }
              >
               <SelectTrigger className="w-full border rounded px-3 py-2">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Purpose</SelectLabel>
                    <SelectItem value="Returned">
                      Returned
                    </SelectItem>
                    <SelectItem value="Destroyed">
                      Destroyed
                    </SelectItem>
                    <SelectItem value="Auctioned">
                      Auctioned
                    </SelectItem>
                    <SelectItem value="Court Custody">
                      Court Custody
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            {/* <Input
              placeholder="Disposal Type"
              onChange={(e) =>
                setDisposalData({
                  ...disposalData,
                  disposalType: e.target.value,
                })
              }
            /> */}
            <Input
              placeholder="Court Order Reference"
              onChange={(e) =>
                setDisposalData({
                  ...disposalData,
                  courtOrderReference: e.target.value,
                })
              }
            />
            <Textarea
              placeholder="Remarks"
              onChange={(e) =>
                setDisposalData({ ...disposalData, remarks: e.target.value })
              }
            />
            <Button onClick={handleDispose}>Confirm Disposal</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDetailPage;
