import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./components/Search";
import { styled } from "styled-components";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GrClose } from "react-icons/gr"
import { FaRegStar, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { keyframes } from 'styled-components'

function App() {

  const [favorites, setFavorites] = useState([]);
  const [barActive, setBarActive] = useState(false);

  const toggleBarActive = () => setBarActive(!barActive);

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

  function addRecipe(recipe) {
    const data = JSON.parse(window.localStorage.getItem('favorites'));
    data.push(recipe);
    setFavorites(data);
    window.localStorage.setItem('favorites', JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  };

  function removeRecipe(recipe) {
    const data = JSON.parse(window.localStorage.getItem('favorites'));
    const index = data.findIndex(elem => elem.id === recipe.id);
    data.splice(index, 1);
    setFavorites(data);
    window.localStorage.setItem('favorites', JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      console.log("Change to local storage! APP");
      setFavorites(JSON.parse(window.localStorage.getItem('favorites')));
    })
    handleLocalStorage();
  }, []);

  return (
    <BrowserRouter>
      <MainApp>
        <FavBarOverlay className={barActive ? 'barActive' : ''} onClick={toggleBarActive} />
        <FavBar className={barActive ? 'barActive' : ''}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ margin: '1% 5%', color: 'white' }}>Favorites</h1>
            <GrClose style={{ right: '4rem', position: 'absolute', fontSize: '1.5rem', cursor: 'pointer' }} onClick={toggleBarActive} />
          </div>

          <Splide options={{
            perPage: 6,
            arrows: true,
            pagination: true,
            drag: 'free',
            height: '18rem'
          }}
          >
            {favorites.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <FavCard>
                    {favorites.some(elem => elem.id === recipe.id)
                      ? <FaStar onClick={() => removeRecipe(recipe)} />
                      : <FaRegStar onClick={() => addRecipe(recipe)} />
                    }

                    <Link to={'/cook-book/recipe/' + recipe.id}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                    </Link>
                  </FavCard>
                </SplideSlide>
              );
            })}
          </Splide>
        </FavBar >
        <div style={{ margin: "0% 15%" }}>
          <Display>
            <Nav>
              <GiForkKnifeSpoon />
              <Logo to={'/cook-book/'}> CookBook </Logo>
            </Nav>
            <Top>
              <Favorites onClick={toggleBarActive}>
                <FaRegStar />
                Favorites
              </Favorites>
            </Top>
          </Display>
          <Search />
          <Category />
          <Pages />
        </div>
        <Footer>
          <h2>Questions? Contact us at <u>cookbooksite2@gmail.com</u></h2>
          <h3>Made using <a href="https://spoonacular.com/food-api">Spoonacular API</a></h3>
        </Footer>
      </MainApp>
    </BrowserRouter >
  );
}

const MainApp = styled.div`
  .barActive{
    display: block;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f27121;

  h2{
    padding-top: 3rem;
    color: white;
  }

  h3{
    padding-top: 1rem;
    color: white;
  }

  a{
    text-decoration: none;
    color: #a6f78d;
  }
`

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const FavBar = styled.div`
  height: -100px;
  width: 100%;
  z-index: 9999 !important;
  position: fixed;
  background: #f27121;
  display: none;

  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
`

const FavBarOverlay = styled.div`
  width: 100%;
  height: 100%;
  height: 100vh;
  width: 100vw;
  margin: 0;
  z-index: 999;
  position: fixed;
  display: none;
  background-color: rgba(0,0,0,0.3);

  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
`

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
    zIndex: -999;
  }
`

const Top = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg{
    font-size: 2rem;
  }
`

const Display = styled.div`
  width: 100%;
  display: flex;
`

const Favorites = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  font-size: 1rem;
  gap: 0.5rem;
  cursor: pointer;

  &:hover{
    background-color: #f27121;
    border: 2px solid #f27121;
    color: white;
  }

  svg{
    font-size: 1.6rem;
  }
`

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

const FavCard = styled.div`
  margin: 1% 10%;
  height: 15rem;
  width: 15rem;
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

export default App;
