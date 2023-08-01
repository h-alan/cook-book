import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { FaRegStar, FaStar } from "react-icons/fa";

function Cuisine() {

  let params = useParams();
  const [cuisine, setCuisine] = useState([]);
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

  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API}&cuisine=${name}&number=9`)
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      setFavorites(JSON.parse(window.localStorage.getItem('favorites')));
    })
    handleLocalStorage();
  }, [])

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            {favorites.some(elem => elem.id === item.id)
              ? <FaStar onClick={() => removeRecipe(item)} />
              : <FaRegStar onClick={() => addRecipe(item)} />
            }

            <Link to={'/cook-book/recipe/' + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`

const Card = styled.div`
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;

  img{
    width: 100%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }

  svg{
    font-size: 3rem;
    position: absolute;
    display: block;
    padding-top: 1rem;
  }

  svg:hover{
    color: #ffcf4d;
  }

  &:hover{
    background: #f27121;

    h4{
      color: white;
    }
  }
`

export default Cuisine