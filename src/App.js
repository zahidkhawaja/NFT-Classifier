import { useState } from "react";
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [imageFile, setImageFile] = useState()
  const [previewImage, setPreviewImage] = useState()
  const [resultReady, setResultReady] = useState(false);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const changeHandler = e => {
    setImageFile(e.target.files[0]);
  }

  const handleSubmission = () => {

    setLoading(true);

    const formData = new FormData();

    formData.append("image", imageFile);

    fetch(
      "https://nft-classifier.herokuapp.com/classify",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success: ", result);
        setLoading(false);
        setResultReady(true);
        setResult(result)
        setPreviewImage(URL.createObjectURL(imageFile))
      })
      .catch((error) => {
        console.error("Error: ", error.error);
      });
  };
  
  return (
    <div className="App">
      <header className="App-header">
       <h1>NFT Classifier</h1>
      </header>
      <div className = "upload-section">
      <input type = "file" name = "file" accept="image/*" onChange = {changeHandler} required />
      <div className = "upload-button">
        <button onClick = {handleSubmission}>Upload</button>
      </div>
      </div>
      {loading ? <CircularProgress /> : null}
      <div className = "result-section">
        {resultReady ? <div className = "results-block"> <img src = {previewImage} className = "preview" alt = "NFT"></img> <p>{result.success}</p></div> : null} 
      </div>
    </div>
  );
}

export default App;
