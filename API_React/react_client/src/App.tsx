import "./App.css";

function App() {
  fetch("https://localhost:7171/api/Product")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <>
      <div>
        <h1 className="text-success">This is not working</h1>
      </div>
    </>
  );
}

export default App;
