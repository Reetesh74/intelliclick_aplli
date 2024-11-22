import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllPlans } from "../../utils/api";

const CuurseDeatil = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getAllPlans("fixed");
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {plans.map((plan, index) => (
          <div className="carousel-item" key={index}>
            <h3>{plan.name}</h3>
            <p>
              Amount: {plan.currency}
              {plan.amount.toLocaleString()}
            </p>
            <p>Interval: {plan.period}</p>
            <button>Purchase</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CuurseDeatil;
