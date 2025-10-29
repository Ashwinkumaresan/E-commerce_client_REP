import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CartLoading from "../../../component/Loading/CartLoading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartEmpty from "../../../component/Cart Empty/CartEmpty";
import NoOrders from "../../../component/No orders/NoOrders";

export default function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState({});

    const getToken = () => {
        const tokenOfDealerAdmin = localStorage.getItem("accessTokenDealer");
        const tokenOfCustomer = localStorage.getItem("accessTokenCustomer");
        if (!tokenOfDealerAdmin && !tokenOfCustomer) {
            navigate("/customer-signin");
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("accessTokenCustomer");
            const res = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/order/list/",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const orderData = res.data;
            console.log(res.data)

            const ordersWithDetails = await Promise.all(
                orderData.map(async (order) => {
                    try {
                        const productRes = await axios.get(
                            `https://api.lancer.drmcetit.com/api/Snapdeal/product/${order.product}/`
                        );
                        return {
                            ...order,
                            productDetails: productRes.data,
                        };
                    } catch (err) {
                        console.error(`Error fetching product ${order.product}:`, err);
                        return { ...order, productDetails: null };
                    }
                })
            );

            setOrders(ordersWithDetails);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelRequest = async (orderId) => {
        try {
            setCancelling((prev) => ({ ...prev, [orderId]: true }));
            const token = localStorage.getItem("accessTokenCustomer");
            console.log(orderId)
            console.log(token)
            const res = await axios.delete(
                `https://api.lancer.drmcetit.com/api/Snapdeal/order/delete/${orderId}/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Cancel response:", res.data);
            fetchOrders();
        } catch (err) {
            console.error("Cancel request failed:", err);
            alert("Cancel request failed!");
        } finally {
            setCancelling((prev) => ({ ...prev, [orderId]: false }));
        }
    };

    if (loading) return <CartLoading />;
    if (orders.length === 0) return <NoOrders />;

    return (
        <div className="min-vh-100">
            <div className="container py-5">
                <h4 className="mb-3 fw-bold">My Orders</h4>
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        {orders.map((order, index) => {
                            const product = order.productDetails;
                            return (
                                <div key={order.id}>
                                    <div className="row align-items-center py-4">
                                        <div className="col-lg-6 col-md-12 mb-3 mb-lg-0">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="bg-light rounded-3 me-3 flex-shrink-0"
                                                    style={{ width: "100px", height: "100px" }}
                                                >
                                                    <img
                                                        src={
                                                            product?.image
                                                                ? `https://api.lancer.drmcetit.com${product.image}`
                                                                : "/placeholder.svg"
                                                        }
                                                        alt={product?.title || "Product"}
                                                        className="img-fluid rounded-3"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h5
                                                        className="mb-1 fw-semibold"
                                                        style={{ cursor: "pointer", color: "#000" }}
                                                        onClick={() => navigate(`/product-detail/${encodeURIComponent(product.title)}`, {
                                                            state: { id: order.product }
                                                        })}
                                                    >
                                                        {product?.title || "Product Name"}
                                                    </h5>
                                                    <p className="text-muted mb-2">
                                                        Quantity: {order.quantity}
                                                    </p>
                                                    <p className="text-muted mb-1">
                                                        Final Price: Rs. {order.finalPrice}
                                                    </p>
                                                    <p className="text-muted mb-1">
                                                        Ordered on: {order.orderPlacedDate}
                                                    </p>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm mt-2"
                                                        onClick={() => handleCancelRequest(order.id)}
                                                        disabled={cancelling[order.id]}
                                                    >
                                                        {cancelling[order.id]
                                                            ? "Requesting..."
                                                            : "Request Cancellation"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < orders.length - 1 && <hr className="my-0" />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
