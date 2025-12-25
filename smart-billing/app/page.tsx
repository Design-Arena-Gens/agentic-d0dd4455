'use client';

import { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoiceList from '@/components/InvoiceList';
import InvoicePreview from '@/components/InvoicePreview';
import Dashboard from '@/components/Dashboard';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes: string;
}

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [view, setView] = useState<'dashboard' | 'create' | 'list'>('dashboard');

  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
    setView('list');
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
    setSelectedInvoice(updatedInvoice);
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
    if (selectedInvoice?.id === id) {
      setSelectedInvoice(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Smart Billing</h1>
            </div>
            <div className="flex space-x-4 items-center">
              <button
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setView('create');
                  setSelectedInvoice(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'create'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                Create Invoice
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                Invoices
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' && <Dashboard invoices={invoices} />}

        {view === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <InvoiceForm
                onSubmit={addInvoice}
                initialInvoice={selectedInvoice}
                onUpdate={updateInvoice}
              />
            </div>
            <div className="hidden lg:block">
              {selectedInvoice && <InvoicePreview invoice={selectedInvoice} />}
            </div>
          </div>
        )}

        {view === 'list' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <InvoiceList
                invoices={invoices}
                onSelect={(invoice) => {
                  setSelectedInvoice(invoice);
                  setView('create');
                }}
                onDelete={deleteInvoice}
                onUpdateStatus={updateInvoice}
              />
            </div>
            <div className="hidden lg:block">
              {selectedInvoice && <InvoicePreview invoice={selectedInvoice} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
