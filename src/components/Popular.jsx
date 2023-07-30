import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";

function Popular() {

  const [popular, setPopular] = useState([])
  const [favorites, setFavorites] = useState([]);

  const handleLocalStorage = () => {
    const check = window.localStorage.getItem('favorites');

    if (check) {
      setFavorites(JSON.parse(check));
    }
    else {
      const initial = JSON.stringify([]);
      window.localStorage.setItem('favorites', initial);
      window.dispatchEvent(new Event("storage"));
    }
  }

  function addId(id) {
    const data = JSON.parse(window.localStorage.getItem('favorites'));
    data.push(id);
    setFavorites(data);
    window.localStorage.setItem('favorites', JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  };

  function removeId(id) {
    const data = JSON.parse(window.localStorage.getItem('favorites'));
    const index = data.indexOf(id);
    data.splice(index, 1);
    setFavorites(data);
    window.localStorage.setItem('favorites', JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    getPopular();
    window.addEventListener('storage', () => {
      setFavorites(JSON.parse(window.localStorage.getItem('favorites')));
    })
    handleLocalStorage();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API}&number=9`);
      const data = await api.json();

      localStorage.setItem('popular', JSON.stringify(data.recipes))
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <RedText><span className="red-text">Popular</span> Picks</RedText>
        <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: true,
          drag: 'free',
          gap: '3rem'
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  {favorites.includes(recipe.id)
                    ? <FaStar onClick={() => removeId(recipe.id)} />
                    : <FaRegStar onClick={() => addId(recipe.id)} />
                  }

                  <Link to={'/cook-book/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 18rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.2s;
  }

  svg{
    font-size: 2rem;
    top: 1rem;
    right: 1rem;
    position: absolute;
    display: none;
  }

  &:hover{
    p{
      padding-bottom: 1rem;
      transition-duration: 0.2s;
    }

    svg{
      display: flex;
      color: white;
      z-index: 99 !important;
    }

    svg:hover{
      color: #ffcf4d;
    }
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));

  &:hover{
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
    transition-duration: 0.2s;
  }
`

const RedText = styled.h3`
  .red-text{
    color: #f27121;
  }  
`

export default Popular