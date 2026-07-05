import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API_URL from "../config/api";

function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(
  `${API_URL}/orders/${id}/invoice`
);
      setOrder(response.data.order);
      setCustomer(response.data.customer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading Invoice...</h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page">
        <h2>Invoice Not Found</h2>

        <button
          className="save-btn"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const subtotal = Number(order.total);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("TexFlow CRM", 70, 20);

    doc.setFontSize(16);
    doc.text("Invoice", 90, 30);

    doc.setFontSize(12);

    doc.text(`Invoice No : ${order._id}`, 15, 45);
    doc.text(
      `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
      15,
      53
    );

    doc.text("Customer Details", 15, 68);

    doc.text(`Name : ${customer?.name || ""}`, 15, 76);
    doc.text(`Phone : ${customer?.phone || ""}`, 15, 84);
    doc.text(`City : ${customer?.city || ""}`, 15, 92);
    doc.text(`GST : ${customer?.gst || ""}`, 15, 100);

    autoTable(doc, {
      startY: 110,
      head: [["Product", "Qty", "Unit Price", "Total"]],
      body: [
        [
          order.product,
          order.quantity,
          `₹${order.unitPrice}`,
          `₹${order.total}`,
        ],
      ],
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.text(
      `Subtotal : ₹${subtotal.toFixed(2)}`,
      15,
      finalY
    );

    doc.text(
      `GST (18%) : ₹${gst.toFixed(2)}`,
      15,
      finalY + 8
    );

    doc.setFontSize(14);

    doc.text(
      `Grand Total : ₹${grandTotal.toFixed(2)}`,
      15,
      finalY + 20
    );

    doc.setFontSize(11);

    doc.text(
      "Thank you for choosing TexFlow CRM!",
      15,
      finalY + 35
    );

    doc.save(`Invoice-${order._id}.pdf`);
  };

  return (
    <div className="page">
      <div className="recent-orders">
        <h1>TexFlow CRM</h1>

        <h3>Invoice</h3>

        <hr />

        <p>
          <strong>Invoice No:</strong> {order._id}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <hr />

        <h3>Customer Details</h3>

        <p>
          <strong>Name:</strong> {customer?.name}
        </p>

        <p>
          <strong>Phone:</strong> {customer?.phone}
        </p>

        <p>
          <strong>City:</strong> {customer?.city}
        </p>

        <p>
          <strong>GST:</strong> {customer?.gst}
        </p>

        <hr />

        <table className="customer-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>₹{order.unitPrice}</td>
              <td>₹{order.total}</td>
            </tr>
          </tbody>
        </table>

        <br />

        <div className="summary-item">
          <span>Subtotal</span>
          <strong>₹{subtotal.toFixed(2)}</strong>
        </div>

        <div className="summary-item">
          <span>GST (18%)</span>
          <strong>₹{gst.toFixed(2)}</strong>
        </div>

        <div className="summary-item">
          <span>Grand Total</span>
          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <button
            className="save-btn"
            onClick={downloadPDF}
          >
            Download PDF
          </button>

          <button
            className="save-btn"
            onClick={() => window.print()}
          >
            Print Invoice
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/orders")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;