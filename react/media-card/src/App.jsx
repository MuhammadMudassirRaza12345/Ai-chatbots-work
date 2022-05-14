import logo from './logo.svg';
import './App.css';

const MediaCard = ({ title, body, imgurl,isDark }) => (
  <div
   className={`mediacard ${(isDark === true) ? "darkMode" :"lightmode"}`}

  style={{ border: "1px solid black", margin: "5px", padding: "10px" }}>

    <p> {(isDark === true) ? "dark Mode" :"light mode"} </p>
    <h2> {title}    </h2>
    <p>
      {body}
    </p>
    <img width="300px" src={imgurl} alt="" />
    <br />
    <button>Like</button>
    <button>Comments </button>
    <button>Share</button>


  </div>
)







function App() {
  return (
    <div  >
      <MediaCard  isDark={true} title={"Media Card 1"} body="some text card" imgurl="https://images.unsplash.com/photo-1564045288780-5c11658fefa3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" />
      <MediaCard isDark={false} title={"Media Card 2"} body="some text card" imgurl=" https://media.istockphoto.com/photos/trees-forming-a-heart-picture-id537373196?k=20&m=537373196&s=612x612&w=0&h=Y6zpQNFrhLp9lusVP5xbJ8s6H9i0hOZlQwhhPxHlGXU=" />
      <MediaCard isDark={true} title={"Media Card 3"} body="some text card" imgurl="https://images.unsplash.com/photo-1564045288780-5c11658fefa3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" />
      <MediaCard isDark={false} title={"Media Card 4"} body="some text card" imgurl=" https://media.istockphoto.com/photos/trees-forming-a-heart-picture-id537373196?k=20&m=537373196&s=612x612&w=0&h=Y6zpQNFrhLp9lusVP5xbJ8s6H9i0hOZlQwhhPxHlGXU=" />

    </div>
  );


}

export default App;
