import React, { useState } from "react";
import "./Invoice.css";

const Invoice = () => {
  const [items, setItems] = useState(() => [
    { id: crypto.randomUUID(), desc: "", cost: 0, qty: 1 },
  ]);
  const [billTo, setBillTo] = useState({ name: "", address: "", contact: "" });
  const [billedFrom, setBilledFrom] = useState({
    name: "AutoRelax",
    address: "Main Road, City",
    contact: "+92 300 1234567",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: "Bank Transfer",
    details: "HBL: 1234-5678-9012",
  });

  const [invoiceMeta, setInvoiceMeta] = useState(() => ({
    number: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
  }));

  const [savedInvoices, setSavedInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem("my_invoices");
      return saved ? JSON.parse(saved) : [];
    }  catch { 
  return []; 
}
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addItem = () =>
    setItems([
      ...items,
      { id: crypto.randomUUID(), desc: "", cost: 0, qty: 1 },
    ]);

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () =>
    items.reduce((acc, item) => acc + item.cost * item.qty, 0);
  const taxRate = 0.05; 
  const calculateTax = () => calculateSubtotal() * taxRate;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const saveInvoice = () => {
    const newInvoice = {
      id: crypto.randomUUID(),
      meta: invoiceMeta,
      billTo,
      billedFrom,
      paymentInfo,
      items,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    };
    const updatedList = [newInvoice, ...savedInvoices];
    setSavedInvoices(updatedList);
    localStorage.setItem("my_invoices", JSON.stringify(updatedList));
    alert("Invoice saved successfully!");
  };

  const deleteSavedRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      const updated = savedInvoices.filter((inv) => inv.id !== id);
      setSavedInvoices(updated);
      localStorage.setItem("my_invoices", JSON.stringify(updated));
    }
  };

  const openViewModal = (inv) => {
    setSelectedInvoice(inv);
    setShowModal(true);
  };

  return (
    <div className="invoice-wrapper">
      <div className="invoice-actions no-print">
        <button onClick={saveInvoice} className="save-btn-main">
          Save Record
        </button>
        <button onClick={() => window.print()} className="print-btn">
          Print / PDF
        </button>
      </div>

      <div className="invoice-container shadow-sm">
        <div className="invoice-header">
          <h1 className="invoice-title">INVOICE</h1>
        </div>

        <div className="invoice-top-details">
          <div className="details-grid">
            <div className="bill-section">
              <label>BILLED FROM</label>
              <input
                type="text"
                value={billedFrom.name}
                onChange={(e) =>
                  setBilledFrom({ ...billedFrom, name: e.target.value })
                }
              />
              <input
                type="text"
                value={billedFrom.address}
                onChange={(e) =>
                  setBilledFrom({ ...billedFrom, address: e.target.value })
                }
              />
              <input
                type="text"
                value={billedFrom.contact}
                onChange={(e) =>
                  setBilledFrom({ ...billedFrom, contact: e.target.value })
                }
              />
            </div>
            <div className="bill-section">
              <label>BILL TO</label>
              <input
                type="text"
                placeholder="Client Name"
                value={billTo.name}
                onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                value={billTo.address}
                onChange={(e) =>
                  setBillTo({ ...billTo, address: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Contact"
                value={billTo.contact}
                onChange={(e) =>
                  setBillTo({ ...billTo, contact: e.target.value })
                }
              />
            </div>
          </div>

          <div className="invoice-meta">
            <div className="meta-row">
              <label>INVOICE #</label>
              <input type="text" value={invoiceMeta.number} readOnly />
            </div>
            <div className="meta-row">
              <label>INVOICE DATE</label>
              <input
                type="date"
                value={invoiceMeta.invoiceDate}
                onChange={(e) =>
                  setInvoiceMeta({
                    ...invoiceMeta,
                    invoiceDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="meta-row">
              <label>DUE DATE</label>
              <input
                type="date"
                value={invoiceMeta.dueDate}
                onChange={(e) =>
                  setInvoiceMeta({ ...invoiceMeta, dueDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th className="text-left">DESCRIPTION</th>
              <th className="text-center">COST</th>
              <th className="text-center">QTY</th>
              <th className="text-right">TOTAL</th>
              <th className="no-print"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.desc}
                    onChange={(e) =>
                      handleItemChange(item.id, "desc", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="text-center no-spinner"
                    value={item.cost || ""}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "cost",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="text-center no-spinner"
                    value={item.qty || ""}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "qty",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </td>
                <td className="text-right">
                  RS {(item.cost * item.qty).toLocaleString()}
                </td>
                <td className="no-print">
                  <button
                    className="del-row-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-row-btn no-print" onClick={addItem}>
          + Add Item
        </button>

        <div className="invoice-footer-grid">
          <div className="footer-left">
            <div className="bill-section">
              <label>PAYMENT METHODS</label>
              <input
                type="text"
                value={paymentInfo.method}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, method: e.target.value })
                }
              />
              <input
                type="text"
                value={paymentInfo.details}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, details: e.target.value })
                }
              />
            </div>
            <div className="special-notes">
              <label>SPECIAL NOTES</label>
              <textarea placeholder="Instructions..."></textarea>
            </div>
          </div>
          <div className="footer-right">
            <div className="summary-row">
              <span>SUB TOTAL</span>
              <span>RS {calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>TAX (5%)</span>
              <span>RS {calculateTax().toLocaleString()}</span>
            </div>
            <div className="summary-row amount-due">
              <span>AMOUNT DUE</span>
              <span>RS {calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="thank-you">THANK YOU</div>
      </div>

      <div className="history-section no-print">
        <h3>Invoice History</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedInvoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.meta.number}</td>
                <td>{inv.billTo.name || "N/A"}</td>
                <td>{inv.meta.invoiceDate}</td>
                <td>RS {inv.total.toLocaleString()}</td>
                <td className="history-btns">
                  <button
                    onClick={() => openViewModal(inv)}
                    className="view-btn"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteSavedRecord(inv.id)}
                    className="delete-btn-record"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedInvoice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Invoice Details - {selectedInvoice.meta.number}</h2>
            <div className="modal-body">
              <p>
                <strong>Client:</strong> {selectedInvoice.billTo.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedInvoice.meta.invoiceDate}
              </p>
              <p>
                <strong>Total Amount:</strong> RS{" "}
                {selectedInvoice.total.toLocaleString()}
              </p>
              <hr />
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>Desc</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.desc}</td>
                      <td>{item.qty}</td>
                      <td>RS {(item.cost * item.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
