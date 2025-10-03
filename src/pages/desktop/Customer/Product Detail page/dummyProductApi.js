// dummyProductApi.js
export const getProductById = async (id) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dummy product data
    const product = {
        id: id,
        name: "Elegant Summer Dress",
        description: "This beautiful summer dress is perfect for any occasion. Made from lightweight fabric, it features a flattering silhouette and vibrant floral print. Available in sizes XS-XL.",
        price: 79.99,
        originalPrice: 99.99,
        images: [
            "/woman-in-brown-summer-dress-full-body.jpg",
            "/woman-in-white-tank-top-portrait.jpg",
            "/brown-haired-woman-portrait.png",
            "/woman-side-profile-portrait.jpg"
        ],
        rating: 4.5,
        reviewCount: 120,
        reviews: [
            {
                name: "Sophia Clark",
                date: "June 15, 2024",
                rating: 5,
                text: "I absolutely love this dress! The fabric is so soft and comfortable, and the fit is perfect. I received so many compliments when I wore it to a summer party.",
                avatar: "/woman-avatar-1.png"
            },
            {
                name: "Olivia Bennett",
                date: "May 22, 2024",
                rating: 4,
                text: "The dress is beautiful and fits well. The colors are vibrant, and the material is of good quality. I would definitely recommend it.",
                avatar: "/woman-avatar-2.png"
            }
        ],
        averageRating: 4.5
    };

    return product;
};
