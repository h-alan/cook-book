import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

function Restaurants() {

  const [restaurants, setRestaurants] = useState([]);

  const [cuisines, setCuisines] = useState(["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {

    const check = localStorage.getItem('restaurants');

    if (check) {
      setRestaurants(JSON.parse(check).sort(() => .5 - Math.random()));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/food/restaurants/search?apiKey=${process.env.REACT_APP_SPOONACULAR_API}`);
      const data = await api.json();

      localStorage.setItem('restaurants', JSON.stringify(data.restaurants));
      setRestaurants(data.restaurants);
    }
  };

  return (
    <div>
      <Wrapper>
        <RedText>Find a New<span className="red-text"> Restaurant</span></RedText>

        {restaurants.length > 0 ?
          <Splide options={{
            perPage: 4,
            arrows: false,
            pagination: true,
            drag: 'free',
            gap: '3rem'
          }}>
            {restaurants.slice(0, 11).map((rest) => {
              return (
                <SplideSlide key={rest._id}>
                  <Card>
                    <Link to={'/cook-book/restaurant/' + rest._id}>
                      <img src={rest.logo_photos} alt={rest.logo_photos} />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })}
          </Splide>
          :
          <h4>Loading...</h4>
        }
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 15rem;
  min-width: 15rem;
  border-radius: 1rem;
  overflow: visible;
  position: relative;
  transition: 0.4s;

  img{
    border-radius: 1rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover{
    padding-top: 1.5rem;
    transition: 0.4s;
  }
`;

const RedText = styled.h3`
  .red-text{
    color: #f27121;
  }  
`

export default Restaurants