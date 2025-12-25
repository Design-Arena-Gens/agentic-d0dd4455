import { Invoice } from '@/app/page';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Invoice Preview</h2>

      <div className="border-2 border-gray-200 rounded-lg p-8 bg-white" style={{ minHeight: '800px' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">INVOICE</h1>
            <p className="text-gray-600">#{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date: {new Date(invoice.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">FROM:</h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Your Company</p>
              <p>123 Business Street</p>
              <p>City, State 12345</p>
              <p>contact@company.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">BILL TO:</h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{invoice.clientName}</p>
              <p className="whitespace-pre-line">{invoice.clientAddress}</p>
              <p>{invoice.clientEmail}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 text-sm font-semibold text-gray-700">DESCRIPTION</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-700">QTY</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-700">RATE</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-700">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 text-sm text-gray-800">{item.description}</td>
                  <td className="py-3 text-sm text-gray-800 text-right">{item.quantity}</td>
                  <td className="py-3 text-sm text-gray-800 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-3 text-sm text-gray-800 text-right font-medium">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium text-gray-800">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium text-gray-800">${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 text-lg border-t-2 border-gray-300">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-indigo-600">${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">NOTES:</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-xs text-gray-500 text-center">
            Thank you for your business!
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={() => window.print()}
        className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print / Download PDF
      </button>
    </div>
  );
}
