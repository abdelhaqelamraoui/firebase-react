import { useState } from "react";
import { Movies } from "./components/movies";
import { Auth } from "./components/auth";

function App() {
   const [count, setCount] = useState(0);

   return (
      <div>
         <Auth />
         <hr />
         <Movies />
      </div>
   );
}

export default App;
