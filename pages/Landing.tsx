import React, { useState, useEffect } from 'react';
import { PublicLayout } from '../components/Layout';
import { Button, Input, Card, StatusBadge } from '../components/UI';
import { Icons } from '../constants';
import { useNavigate } from 'react-router-dom';
import { mockDb } from '../services/mockDb';
import { Case } from '../types';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [stats, setStats] = useState({ resolved: 0, pending: 0, totalProtected: 0 });
  const [recentActivity, setRecentActivity] = useState<Case[]>([]);

  useEffect(() => {
    setStats(mockDb.getPublicStats());
    // Get recent cases but slice to only show a few, anonymized view
    const allCases = mockDb.getCases();
    setRecentActivity(allCases.slice(0, 5));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchId.trim()) {
      navigate(`/status?id=${searchId}`);
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium mb-6 border border-brand-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            Global Content Protection
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Stop Content Theft <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500">Instantly</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Submit a takedown request in minutes. We monitor, analyze, and report infringement across all major social platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button onClick={() => navigate('/submit-claim')} className="h-14 px-8 text-lg shadow-xl shadow-brand-blue/20">
               Submit Takedown Request
             </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section (Graph/Counter) */}
      <section className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
           <Card className="bg-slate-900/80 backdrop-blur border-t-4 border-t-green-500 flex flex-col items-center justify-center py-10">
              <div className="text-5xl font-bold text-white mb-2">{stats.resolved}+</div>
              <div className="text-green-500 font-medium tracking-widest text-sm uppercase">Cases Resolved</div>
           </Card>
           <Card className="bg-slate-900/80 backdrop-blur border-t-4 border-t-brand-blue flex flex-col items-center justify-center py-10">
              <div className="text-5xl font-bold text-white mb-2">{stats.totalProtected}+</div>
              <div className="text-brand-blue font-medium tracking-widest text-sm uppercase">Assets Protected</div>
           </Card>
           <Card className="bg-slate-900/80 backdrop-blur border-t-4 border-t-brand-accent flex flex-col items-center justify-center py-10">
              <div className="text-5xl font-bold text-white mb-2">{stats.pending}</div>
              <div className="text-brand-accent font-medium tracking-widest text-sm uppercase">Active Investigations</div>
           </Card>
        </div>
      </section>

      {/* Live Activity Feed (Anonymized) */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
         <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="text-lg font-semibold text-white">Live Enforcement Feed</h3>
         </div>
         <div className="space-y-3">
            {recentActivity.map((item, i) => (
               <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        {item.platform === 'YouTube' && <span className="text-red-500 font-bold">YT</span>}
                        {item.platform === 'Facebook' && <span className="text-blue-500 font-bold">FB</span>}
                        {item.platform === 'Instagram' && <span className="text-pink-500 font-bold">IG</span>}
                        {item.platform === 'Website/Blog' && <span className="text-slate-300 font-bold">WEB</span>}
                        {item.platform === 'Other' && <span className="text-slate-400 font-bold">...</span>}
                     </div>
                     <div>
                        <p className="text-white font-medium text-sm">Copyright Infringement Reported</p>
                        <p className="text-slate-500 text-xs">Platform: {item.platform}</p>
                     </div>
                  </div>
                  <StatusBadge status={item.status} />
               </div>
            ))}
            <div className="text-center pt-4">
               <p className="text-slate-600 text-xs">Showing anonymized recent activity. Private case details are restricted.</p>
            </div>
         </div>
      </section>

      {/* Quick Search */}
      <section className="max-w-xl mx-auto px-6 pb-20">
        <div className="text-center mb-6">
           <h3 className="text-white font-semibold mb-2">Already filed a complaint?</h3>
        </div>
        <Card className="bg-slate-900/80 backdrop-blur-xl shadow-lg border-slate-700">
           <form onSubmit={handleSearch} className="flex gap-2">
             <div className="relative flex-1">
                 <Input 
                   placeholder="Enter Case ID to Track" 
                   value={searchId}
                   onChange={(e) => setSearchId(e.target.value)}
                   className="pl-10 h-12"
                 />
                 <div className="absolute left-3 top-3.5 text-slate-500">
                   <Icons.MagnifyingGlass />
                 </div>
             </div>
             <Button type="submit" variant="secondary" className="h-12">
               Check
             </Button>
           </form>
        </Card>
      </section>

    </PublicLayout>
  );
};

export default LandingPage;