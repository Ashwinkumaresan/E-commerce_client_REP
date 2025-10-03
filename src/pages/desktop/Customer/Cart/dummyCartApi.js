// dummyCartApi.js
export const getCartItems = async () => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: 1,
                        name: "Classic White Sneakers",
                        price: 79.99,
                        quantity: 1,
                        image: "/white-sneakers.png",
                    },
                    {
                        id: 2,
                        name: "Slim Fit Jeans",
                        price: 49.99,
                        quantity: 1,
                        image: "/classic-blue-jeans.jpeg",
                    },
                    {
                        id: 3,
                        name: "Cotton T-Shirt",
                        price: 29.99,
                        quantity: 2,
                        image: "/white-t-shirt.png",
                    },
                ],
            })
        }, 1000)
    })
}

export const checkoutCart = async (cartItems) => {
    // Simulate sending data to backend
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: "Checkout successful!",
                orderId: Math.floor(Math.random() * 100000),
                items: cartItems,
            })
        }, 1000)
    })
}
