import Pages from "./pages/Pages";
import Category from "./components/Category";
import NavBar from "./components/NavBar";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./components/Search";
import { styled } from "styled-components";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai"

function App() {
  return (
    <div>
      <BrowserRouter >
        <Display>
          <Nav>
            <GiForkKnifeSpoon />
            <Logo to={'/cook-book/'}> CookBook </Logo>
          </Nav>
          <Top>
            <Link to={'/cook-book/'} style={{ textDecoration: 'none' }}>
              <Favorites>
                <AiOutlineStar />
                Favorites
              </Favorites>
            </Link>
          </Top>
        </Display>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter >
    </div >
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
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

  &:hover{
    background-color: #f27121;
    border: 2px solid #f27121;
    color: white;
  }
`

export default App;
