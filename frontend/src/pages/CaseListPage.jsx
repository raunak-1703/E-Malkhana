import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Navbar} from '@/components/NavBar';
import { useCaseStore } from '../store/caseStore';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye } from 'lucide-react';

const CaseListPage = () => {
        const [crimeNumber,setCrimeNumber] = useState('');
        const [crimeYear,setCrimeYear] = useState('')
        const [cases,setCases] = useState([])
        const [loading,setLoading] = useState(false)
        const [searched,setSearched] = useState(false);

        const navigate = useNavigate()
        const setSelectedCase = useCaseStore((state)=>state.setSelectedCase);
        console.log(cases)
        const handleSearch = async (e)=>{
            e.preventDefault();
            setLoading(true);
            setSearched(true);
            try {
                const res = await api.get('/cases',{
                        params:{
                            crimeNumber: crimeNumber || undefined,
                            crimeYear: crimeYear || undefined,
                        }
                })
                setCases(res.data);
            } catch (error) {
                console.error('Search failed',error)
            } finally{
                setLoading(false);
            }
        }

        const handleViewCase = (caseData)=>{
            setSelectedCase(caseData);
            navigate(`/cases/${caseData._id}`);
        }
    
return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Search Cases
          </h2>
          <p className="text-slate-600">
            Find and manage registered cases
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Crime Number</Label>
                  <Input
                    placeholder="Enter crime number"
                    value={crimeNumber}
                    onChange={(e) => setCrimeNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Crime Year</Label>
                  <Input
                    type="number"
                    placeholder="Enter year"
                    value={crimeYear}
                    onChange={(e) => setCrimeYear(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800"
                    disabled={loading}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            {searched && <CardTitle>Case Results ({cases.length})</CardTitle>}
          </CardHeader>
          <CardContent>
            {searched && cases.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No cases found. Try adjusting your search criteria.
              </div>
            ) : ( !searched ? <div className="text-center  text-black font-medium">Enter the Parameters to get the Cases</div>:
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crime No / Year</TableHead>
                      <TableHead>Police Station</TableHead>
                      <TableHead>Officer</TableHead>
                      <TableHead>Date of FIR</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map((c) => (
                      <TableRow key={c._id}>
                        <TableCell className="font-medium">
                          {c.crimeNumber} / {c.crimeYear}
                        </TableCell>
                        <TableCell>{c.policeStationName}</TableCell>
                        <TableCell>{c.investigatingOfficerName}</TableCell>
                        <TableCell>
                          {new Date(c.dateOfFIR).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              c.status === 'PENDING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                            }
                          >
                            {c.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewCase(c)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseListPage