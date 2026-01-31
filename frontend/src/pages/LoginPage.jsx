import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();
    const login = useAuthStore((state)=>state.login);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post('/auth/login',{
                username,
                password
            })
            login(res.data.token);
            toast.success('Login Successfull');
            navigate('/')
        } catch (error) {
            toast.error('Invalid username or password');
        } finally{
            setLoading(false)
        }
    }
  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">E-Malkhana</h1>
          <p className="text-slate-600">Police Evidence Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Officer Login</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage