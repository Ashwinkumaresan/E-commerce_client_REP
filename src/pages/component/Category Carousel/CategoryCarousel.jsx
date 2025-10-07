import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function CategoryCarousel() {
    const navigate = useNavigate()
    const scrollContainerRef = useRef(null);
    const [categories, setCategories] = useState([]);

    const fetchCategory = async () => {
        try {
            const res = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/category/"
            );
            console.log(res.data);
            setCategories(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollPosition =
                scrollContainerRef.current.scrollLeft +
                (direction === "left" ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="container py-4 position-relative mt-5">
            <button
                onClick={() => scroll("left")}
                className="btn position-absolute top-50 start-0 translate-middle-y"
                style={{ zIndex: 10 }}
                aria-label="Scroll left"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <div
                ref={scrollContainerRef}
                className="d-flex overflow-auto flex-nowrap gap-3 scroll-smooth ms-5 ps-5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="text-center flex-shrink-0 "
                        style={{ minWidth: "120px", cursor: "pointer" }}
                    >
                        <div
                            className="mb-2 rounded-pill p-2 d-flex align-items-center justify-content-center"
                            style={{ height: "150px", transition: "transform 0.2s" }}
                        >
                            <img
                                src={`https://api.lancer.drmcetit.com${category.image}` || "/placeholder.svg"}
                                alt={category.category}
                                style={{ width: "150px", height: "150px", objectFit: "contain" }}
                            />
                        </div>
                        <button onClick={() =>
                            navigate(`/product-detail/category/${category.category}`, {
                                state: { id: category.id },
                            })
                        }
                            className="btn">
                            <span className="d-block small">{category.category}</span>
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll("right")}
                className="btn position-absolute top-50 end-0 translate-middle-y"
                style={{ zIndex: 10 }}
                aria-label="Scroll right"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            <style>{`
        .d-flex::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
