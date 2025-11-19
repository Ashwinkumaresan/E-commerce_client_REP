import React, { useState } from "react";
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function SettingsAddresses() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Ashwin K",
            phone: "9876543210",
            address: "12, Gandhi Nagar, Pollachi",
            pincode: "642001",
            city: "Coimbatore",
            state: "Tamil Nadu",
            type: "Home",
        },
    ]);

    const emptyForm = {
        name: "",
        phone: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        type: "Home",
    };

    const [form, setForm] = useState(emptyForm);
    const [showPopup, setShowPopup] = useState(false);
    const [editId, setEditId] = useState(null);

    const openAddPopup = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowPopup(true);
    };

    const openEditPopup = (addr) => {
        setForm(addr);
        setEditId(addr.id);
        setShowPopup(true);
    };

    const saveAddress = () => {
        if (editId) {
            setAddresses(addresses.map((a) => (a.id === editId ? form : a)));
        } else {
            setAddresses([...addresses, { ...form, id: Date.now() }]);
        }
        setShowPopup(false);
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter((a) => a.id !== id));
    };

    return (
        <div className="container py-4" style={{ maxWidth: "850px" }}>
            {/* Title */}
            <h3 className="fw-bold mb-2">
                <FaMapMarkerAlt className="me-2" />
                Your Addresses
            </h3>

            <p className="text-muted mb-4">
                Manage all your saved delivery locations. Add multiple addresses for faster checkout.
            </p>

            {/* Add New Button */}
            <button className="btn btn-dark mb-4 d-flex align-items-center gap-2" onClick={openAddPopup}>
                <FaPlus /> Add New Address
            </button>

            {/* Address List */}
            <div className="row g-3">
                {addresses.map((a) => (
                    <div className="col-12" key={a.id}>
                        <div className="card p-3 shadow-sm border-0">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="fw-bold">{a.name}</h6>

                                    <p className="mb-1">{a.address}</p>
                                    <p className="mb-1">
                                        {a.city}, {a.state} - {a.pincode}
                                    </p>
                                    <p className="text-muted mb-1 small">Phone: {a.phone}</p>
                                    <span className="badge bg-dark">{a.type}</span>
                                </div>

                                {/* Right Side Icons */}
                                <div className="d-flex flex-column align-items-end gap-2">
                                    <FaEdit
                                        className="text-dark fs-5"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => openEditPopup(a)}
                                    />
                                    <FaTrash
                                        className="text-danger fs-5"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDelete(a.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* -------------------- POPUP MODAL -------------------- */}
            {showPopup && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9999 }}
                >
                    <div className="bg-white p-4 rounded shadow" style={{ width: "95%", maxWidth: "500px" }}>
                        <h5 className="fw-bold mb-3">{editId ? "Edit Address" : "Add Address"}</h5>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            <div className="col-12">
                                <textarea
                                    className="form-control"
                                    placeholder="Full Address"
                                    rows="2"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Pincode"
                                    value={form.pincode}
                                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                                />
                            </div>

                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                />
                            </div>

                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="State"
                                    value={form.state}
                                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                                />
                            </div>

                            <div className="col-12">
                                <select
                                    className="form-select"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                >
                                    <option>Home</option>
                                    <option>Office</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="col-12 d-flex justify-content-end gap-2 mt-2">
                                <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-dark" onClick={saveAddress}>
                                    {editId ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
