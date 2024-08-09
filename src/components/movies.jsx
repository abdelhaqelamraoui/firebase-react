import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../assets/css/movies.css";
import { auth, db, storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

export const Movies = () => {
   const [moviesList, setMoviesList] = useState([]);
   const [newMovieTitle, setNewMovieTitle] = useState("");
   const [newReleaseDate, setNewReleaseDate] = useState(0);
   const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
   const [fileUpload, setFileUpload] = useState(null);

   const moviesCollectionRef = collection(db, "movies");

   const getMoviesList = async () => {
      try {
         const data = await getDocs(moviesCollectionRef);
         const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
         setMoviesList(filteredData);
      } catch (error) {
         console.error(error);
      }
   };

   const onSubmitMovie = async () => {
      const newDoc = {
         title: newMovieTitle,
         releaseDate: newReleaseDate,
         receivedOscor: isNewMovieOscar,
         userId: auth?.currentUser?.uid,
      };
      console.log(newDoc);
      try {
         await addDoc(moviesCollectionRef, newDoc);
         getMoviesList();
      } catch (err) {
         console.error(err);
      }
   };

   const deleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMoviesList();
   };

   const editMovie = async (id) => {
      // const movieDoc = doc(db, "movies", id);
      // setNewMovieTitle(movieDoc.title);
      // setNewReleaseDate(movieDoc.releaseDate);
      // setIsNewMovieOscar(movieDoc.receivedOscor);
      // const newDoc = {
      //    title: newMovieTitle,
      //    releaseDate: newReleaseDate,
      //    receivedOscor: isNewMovieOscar,
      //    userId: auth?.currentUser?.uid,
      // };
      // await updateDoc(movieDoc, { title: newDoc });
   };

   const uploadFile = async () => {
      if (!fileUpload) return;
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      try {
         await uploadBytes(filesFolderRef, fileUpload);
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      getMoviesList();
   }, []);

   return (
      <>
         <div className="movie-form">
            <input
               className="input-field"
               placeholder="Movie title..."
               onChange={(e) => setNewMovieTitle(e.target.value)}
            />
            <input
               className="input-field"
               placeholder="Release Date..."
               type="number"
               onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            />
            <div className="checkbox-container">
               <input
                  className="checkbox"
                  type="checkbox"
                  checked={isNewMovieOscar}
                  onChange={(e) => setIsNewMovieOscar(e.target.checked)}
               />
               <label className="checkbox-label"> Received an Oscar</label>
            </div>
            <fieldset>
               <input
                  className="input-field"
                  type="file"
                  onChange={(e) => setFileUpload(e.target.files[0])}
               />
               <button className="submit-button" onClick={uploadFile}>
                  Upload
               </button>
            </fieldset>
            <button className="submit-button" onClick={onSubmitMovie}>
               Submit Movie
            </button>
         </div>

         <div></div>

         <div className="movies-table-container">
            <table className="movies-table">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Title</th>
                     <th>Release Date</th>
                     <th>Oscar Status</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {moviesList.map((movie, i) => (
                     <tr key={i}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.releaseDate}</td>
                        <td>{movie.receivedOscor ? "Oscar" : "Non Oscar"}</td>
                        <td>
                           <button
                              className="edit-button"
                              onClick={() => editMovie(movie.id)}
                           >
                              Edit
                           </button>
                           <button
                              className="delete-button"
                              onClick={() => deleteMovie(movie.id)}
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};
