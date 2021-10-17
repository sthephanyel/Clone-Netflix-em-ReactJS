import './App.css';
import Tmdb from './Tmdb';
import React, {useEffect, useState} from 'react';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/featuredMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList]= useState([]);
  const [featuredData, setFeaturedData]= useState(null);

  const [blackHeader, setBlackHeader]= useState(false);

  useEffect(()=>{
    const loadAll = async ()=>{
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  },[]);



  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }
      else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll',scrollListener);

    return() =>{
      window.removeEventListener('scroll',scrollListener);
    }
  },[])

  return (
    <div className="page">

      <Header black={blackHeader}></Header>
      {featuredData && 
        <FeaturedMovie item={featuredData}></FeaturedMovie>
      
      }
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key}
          
          title={item.title} 
          items={item.items}
          ></MovieRow>
        ))}
      </section>

      <footer>
          Feito com <span role='img' arial-label='coracao'>❤️</span> Por Sthephanyel<br/>
          Com o Auxilio da live <br/>
          <a style={{color: 'white'}} href='https://www.youtube.com/watch?v=tBweoUiMsDg&t=3771s'><span role='img' arial-label='fogo'>🔥 </span>Clone do NETFLIX em REACTJS para Iniciantes</a><br/>
          Direitos de imagens da Netflix <br/>
          Dados pegos do site Themoviedb.org <br/>
          
      </footer>


          //loding...
          {
            movieList.length <=0 && 
            <div className='loading'>
              <img src='https://c.tenor.com/5o2p0tH5LFQAAAAi/hug.gif' alt='carregando...'></img>
            </div>
          }
      
    </div>
  );
}

export default App;
