import React, { useState } from 'react';
import { DashboardLayout } from '../components/Layout';
import { Button, Input, Card, Textarea } from '../components/UI';
import { DMCA_TEMPLATE } from '../constants';

const DMCAGenerator = ({ logout }: { logout: () => void }) => {
  const [data, setData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    originalUrl: '',
    infringingUrl: '',
    signature: ''
  });

  const generateText = () => {
    let text = DMCA_TEMPLATE;
    text = text.replace('[Your Name/Company Name]', data.name || '[NAME]');
    text = text.replace('[Address]', data.address || '[ADDRESS]');
    text = text.replace('[Email Address]', data.email || '[EMAIL]');
    text = text.replace('[Phone Number]', data.phone || '[PHONE]');
    text = text.replace('[Date]', new Date().toLocaleDateString());
    text = text.replace('[ORIGINAL_WORK_URL]', data.originalUrl || '[URL]');
    text = text.replace('[INFRINGING_URL]', data.infringingUrl || '[URL]');
    text = text.replace('[SIGNATURE]', data.signature || '[SIGNATURE]');
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateText());
    alert('Copied to clipboard!');
  };

  return (
    <DashboardLayout logout={logout}>
      <h2 className="text-2xl font-bold text-white mb-6">DMCA Notice Generator</h2>
      <div className="grid lg:grid-cols-2 gap-8">
         <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Sender Details</h3>
            <div className="space-y-4">
               <Input label="Full Name / Company" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
               <Input label="Full Address" value={data.address} onChange={e => setData({...data, address: e.target.value})} />
               <div className="grid grid-cols-2 gap-4">
                 <Input label="Email" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                 <Input label="Phone" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
               </div>
               <div className="border-t border-slate-800 pt-4 mt-4">
                 <h4 className="text-sm font-semibold text-slate-400 mb-3">Content Details</h4>
                 <Input label="Original Work URL" className="mb-3" value={data.originalUrl} onChange={e => setData({...data, originalUrl: e.target.value})} />
                 <Input label="Infringing URL" className="mb-3" value={data.infringingUrl} onChange={e => setData({...data, infringingUrl: e.target.value})} />
                 <Input label="Digital Signature (Type Name)" value={data.signature} onChange={e => setData({...data, signature: e.target.value})} />
               </div>
            </div>
         </Card>

         <Card className="flex flex-col h-full min-h-[500px]">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-white">Preview</h3>
               <Button onClick={copyToClipboard} className="text-xs h-8">Copy Text</Button>
            </div>
            <textarea 
               className="flex-1 w-full bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 focus:outline-none resize-none h-[500px] lg:h-auto"
               value={generateText()}
               readOnly
            />
         </Card>
      </div>
    </DashboardLayout>
  );
};

export default DMCAGenerator;