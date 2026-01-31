import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/NavBar';
import { useCaseStore } from '@/store/caseStore';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const CaseCreatePage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const currentCaseId = useCaseStore((s) => s.currentCaseId);
  const setCaseId = useCaseStore((s) => s.setCaseId);

  const [caseData, setCaseData] = useState({
    policeStation: '',
    officerName: '',
    officerId: '',
    crimeNumber: '',
    crimeYear: new Date().getFullYear().toString(),
    dateOfFIR: '',
    dateOfSeizure: '',
    actAndLaw: '',
    sectionsOfLaw: '',
  });

  const [propertyData, setPropertyData] = useState({
    category: '',
    belongingTo: '',
    nature: '',
    quantity: '',
    location: '',
    description: '',
    evidencePhoto: null,
  });

  const handleCaseInputChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handlePropertyInputChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPropertyData({ ...propertyData, evidencePhoto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // ---------------- CASE CREATION ----------------
  const handleCreateCase = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        policeStationName: caseData.policeStation,
        investigatingOfficerName: caseData.officerName,
        investigatingOfficerId: caseData.officerId,
        crimeNumber: caseData.crimeNumber,
        crimeYear: Number(caseData.crimeYear),
        dateOfFIR: caseData.dateOfFIR,
        dateOfSeizure: caseData.dateOfSeizure,
        actAndLaw: caseData.actAndLaw,
        sections: caseData.sectionsOfLaw,
      };

      const res = await api.post('/cases', payload);

      setCaseId(res.data.case._id);
      toast.success('Case created successfully');
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create case');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- PROPERTY ADD ----------------
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        caseId: currentCaseId,
        category: propertyData.category,
        belongingTo: propertyData.belongingTo,
        nature: propertyData.nature,
        quantity: propertyData.quantity,
        location: propertyData.location,
        description: propertyData.description,
        photoUrl: propertyData.evidencePhoto,
      };

      await api.post('/properties', payload);

      toast.success('Property added successfully');

      setPropertyData({
        category: '',
        belongingTo: '',
        nature: '',
        quantity: '',
        location: '',
        description: '',
        evidencePhoto: null,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    navigate('/cases');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Create New Case
          </h2>
          <p className="text-slate-600">
            Step {step} of 2: {step === 1 ? 'Case Details' : 'Add Property'}
          </p>
        </div>

        {step === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
              <CardDescription>
                Enter the basic information about the case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCase} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Police Station Name *</Label>
                    <Input
                      name="policeStation"
                      value={caseData.policeStation}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Investigating Officer Name *</Label>
                    <Input
                      name="officerName"
                      value={caseData.officerName}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Investigating Officer ID *</Label>
                    <Input
                      name="officerId"
                      value={caseData.officerId}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Crime Number *</Label>
                    <Input
                      name="crimeNumber"
                      value={caseData.crimeNumber}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Crime Year *</Label>
                    <Input
                      type="number"
                      name="crimeYear"
                      value={caseData.crimeYear}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date of FIR *</Label>
                    <Input
                      type="date"
                      name="dateOfFIR"
                      value={caseData.dateOfFIR}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Seizure *</Label>
                    <Input
                      type="date"
                      name="dateOfSeizure"
                      value={caseData.dateOfSeizure}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Act & Law *</Label>
                    <Input
                      name="actAndLaw"
                      value={caseData.actAndLaw}
                      onChange={handleCaseInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sections of Law *</Label>
                  <Input
                    name="sectionsOfLaw"
                    value={caseData.sectionsOfLaw}
                    onChange={handleCaseInputChange}
                    required
                  />
                </div>

                <Button className="w-full" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Case'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Add Property</CardTitle>
              <CardDescription>
                Add evidence/property items to this case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProperty} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={propertyData.category}
                      onValueChange={(v) =>
                        setPropertyData({ ...propertyData, category: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weapon">Weapon</SelectItem>
                        <SelectItem value="Drug">Drug</SelectItem>
                        <SelectItem value="Vehicle">Vehicle</SelectItem>
                        <SelectItem value="Document">Document</SelectItem>
                        <SelectItem value="Jewelry">Jewelry</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Belonging To *</Label>
                    <Select
                      value={propertyData.belongingTo}
                      onValueChange={(v) =>
                        setPropertyData({ ...propertyData, belongingTo: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Accused">Accused</SelectItem>
                        <SelectItem value="Complainant">Complainant</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nature *</Label>
                    <Input
                      name="nature"
                      value={propertyData.nature}
                      onChange={handlePropertyInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      name="quantity"
                      value={propertyData.quantity}
                      onChange={handlePropertyInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                      name="location"
                      value={propertyData.location}
                      onChange={handlePropertyInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Evidence Photo</Label>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    name="description"
                    value={propertyData.description}
                    onChange={handlePropertyInputChange}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" disabled={loading}>
                    <Plus className="w-4 h-4 mr-2" />
                    {loading ? 'Adding...' : 'Add Property'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFinish}
                    className="flex-1"
                  >
                    Finish & View Cases
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default CaseCreatePage;
