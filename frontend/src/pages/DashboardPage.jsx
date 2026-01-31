import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, AlertCircle, CheckCircle, Plus, Search } from 'lucide-react';
import { useEffect } from 'react';
import api from '../services/api';


const DashboardPage = () => {
    const [stats,setStats] = useState({
        totalCases: 0,
        pendingCases:0,
        disposedCases:0,
    });
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        loadStats();
    },[])
    
    const loadStats = async ()=>{
        try {
            const res = await api.get('/dashboard');
            setStats(res.data);
        } catch (error) {
            console.error('Failed to load stats', error)
        } finally{
            setLoading(false);
        }
    }
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard</h2>
          <p className="text-slate-600">
            Overview of evidence and case statistics
          </p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading dashboard data...</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Cases
                  </CardTitle>
                  <FileText className="w-5 h-5 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {stats.totalCases}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    All registered cases
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Pending Cases
                  </CardTitle>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">
                    {stats.pendingCases}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Awaiting action
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Disposed Cases
                  </CardTitle>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {stats.disposedCases}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Completed cases
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => navigate('/cases/new')}
                className="h-24 bg-slate-900 hover:bg-slate-800 text-lg"
              >
                <Plus className="w-6 h-6 mr-2" />
                Create New Case
              </Button>

              <Button
                onClick={() => navigate('/cases')}
                variant="outline"
                className="h-24 border-slate-300 text-lg hover:bg-slate-100"
              >
                <Search className="w-6 h-6 mr-2" />
                Search Cases
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardPage