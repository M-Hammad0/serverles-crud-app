import LinkList from "./components/LinkList";
import "./App.css";
import CreateLink from "./components/CreateLink";

function App() {
  return (
    <>
    <div className="h1"><h1>Serverless CRUD App with FaundaDB and Netlify Functions</h1></div>
    
      <div className="row root ">
        <div className="col-lg-6 col-md-6">
          <LinkList />
        </div>
        <div className="col-lg-6 col-md-6">
          <CreateLink />
        </div>
      </div>
    </>
  );
}

export default App;
