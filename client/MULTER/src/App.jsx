// import { useEffect, useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState();
//   const [image, setImage] = useState();

//   const handleUpload = (e) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     axios.post('http://localhost:3001/upload', formData)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   }

//   useEffect(() => {
//     axios.get('http://localhost:3001/getImage')
//       .then((res) => setImage(res.data[25].image)) // Assuming you want the first image in the response
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>
//       <br />
//       <img src={`http://localhost:3001/Images/` + image} alt="" />
//     </div>
//   );
// }

// export default App;




import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null); // Initialize with null

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3001/upload', formData)
      .then((res) => {
        console.log(res);
        // After successfully uploading, set the uploaded image URL
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:3001/getImage')
      .then((res) => {
        // Assuming the response contains the URL of the last uploaded image
        const lastUploadedImage = res.data[res.data.length - 1].image;
        setImage(lastUploadedImage);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {image && <img src={`http://localhost:3001/Images/` + image} alt="" />}
    </div>
  );
}

export default App;

