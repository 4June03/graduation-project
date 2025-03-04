import "./App.css";
import SliderBanner from "./client/banner/SliderBanner";
import Header from "./client/header/Header";

function App() {
  return (
    <div className="flex flex-col">
      <header>
        <Header />
      </header>
      <main>
        <SliderBanner />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
