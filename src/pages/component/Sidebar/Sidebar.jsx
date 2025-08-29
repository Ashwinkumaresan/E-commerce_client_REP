import { useState } from "react"

export default function Sidebar({ onNavigate, activePage }) {
  const navigationItems = [
    { name: "Dashboard", id: "dashboard" },
    { name: "Products", id: "products" },
    { name: "Orders", id: "orders" },
    { name: "Customers", id: "customers" },
    { name: "Analytics", id: "analytics" },
    { name: "Inventory", id: "inventory" },
    { name: "Reports", id: "reports" },
  ]

  const extrasItems = [
    { name: "Settings", id: "settings" },
    { name: "Help", id: "help" },
    { name: "Logout", id: "logout" },
  ]

  return (
    <div className="bg-light border-end position-fixed h-100" style={{ width: "250px", zIndex: 1000 }}>
      <div className="p-3 d-flex flex-column h-100">
        <h4 className="mb-4 text-dark fw-bold">Admin Panel</h4>
        
        <nav className="nav flex-column flex-grow-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link py-2 px-3 mb-1 rounded border-0 text-start ${
                activePage === item.id ? "bg-dark text-white" : "text-dark bg-transparent"
              }`}
              style={{ 
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = "#f8f9fa"
                }
              }}
              onMouseLeave={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = "transparent"
                }
              }}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Extras section */}
        <div className="mt-auto pt-4 border-top">
          <h6 className="text-muted mb-3">Extras</h6>
          {extrasItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link py-2 px-3 mb-1 rounded border-0 text-start w-100 ${
                activePage === item.id ? "bg-dark text-white" : "text-dark bg-transparent"
              }`}
              style={{ 
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = "#f8f9fa"
                }
              }}
              onMouseLeave={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = "transparent"
                }
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
