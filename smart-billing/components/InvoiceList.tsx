import { Invoice } from '@/app/page';

interface InvoiceListProps {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (invoice: Invoice) => void;
}

export default function InvoiceList({ invoices, onSelect, onDelete, onUpdateStatus }: InvoiceListProps) {
  const handleStatusChange = (invoice: Invoice, newStatus: Invoice['status']) => {
    onUpdateStatus({ ...invoice, status: newStatus });
  };

  const sortedInvoices = [...invoices].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Invoices</h2>

      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new invoice.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {invoice.invoiceNumber}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{invoice.clientName}</p>
                  <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>Date: {new Date(invoice.date).toLocaleDateString()}</span>
                    <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-lg font-bold text-indigo-600 mt-2">
                    ${invoice.total.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onSelect(invoice)}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Edit
                  </button>

                  <select
                    value={invoice.status}
                    onChange={(e) => handleStatusChange(invoice, e.target.value as Invoice['status'])}
                    className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this invoice?')) {
                        onDelete(invoice.id);
                      }
                    }}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {invoice.items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                  <div className="space-y-1">
                    {invoice.items.map((item) => (
                      <div key={item.id} className="text-sm text-gray-600 flex justify-between">
                        <span>{item.description} ({item.quantity} × ${item.rate.toFixed(2)})</span>
                        <span className="font-medium">${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
