import { useEffect, useState } from "react";
import axios from "axios";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {

  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {

    try {

      const ordersRes = await axios.get(
        "http://localhost:8080/api/dashboard/recent-orders"
      );

      const stockRes = await axios.get(
        "http://localhost:8080/api/dashboard/low-stock"
      );

      setRecentOrders(ordersRes.data);
      setLowStock(stockRes.data);

    } catch (error) {

      console.error(error);

    }

  };

  // =========================
  // EXPORT EXCEL
  // =========================

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(
      recentOrders
    );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Orders Report"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(
      fileData,
      "Orders_Report.xlsx"
    );
  };

  // =========================
  // EXPORT PDF
  // =========================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Smart Inventory Management Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 30,

      head: [[
        "Order ID",
        "Product ID",
        "Quantity",
        "Status"
      ]],

      body: recentOrders.map(order => [
        order.id,
        order.productId,
        order.quantity,
        order.status
      ])
    });

    doc.save(
      "Orders_Report.pdf"
    );
  };

  return (

    <div className="page">

      <h1>Reports Center</h1>

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button
          onClick={exportExcel}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Export Excel
        </button>

        <button
          onClick={exportPDF}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Export PDF
        </button>

      </div>

      <div className="reports-grid">

        <div className="report-card">

          <h2>Recent Orders</h2>

          <table>

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productId}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="report-card">

          <h2>Low Stock Alerts</h2>

          {lowStock.length === 0 ? (

            <div className="success-alert">
              All inventory levels are healthy.
            </div>

          ) : (

            lowStock.map((item) => (

              <div
                key={item.id}
                className="warning-alert"
              >

                Product ID : {item.productId}

                <br />

                Remaining Quantity : {item.quantity}

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default Reports;