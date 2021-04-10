import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      console.log("fetching");
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
        )
        .then((response) => {
          setPhotos([...photos, ...response.data]);
          setCurrentPage((prev) => prev + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }

    // console.log("scrollHeight", e.target.documentElement.scrollHeight);
    // console.log("scrollTop", e.target.documentElement.scrollTop);
    // console.log("innerHeight", window.innerHeight);
  };

  return (
    <div>
      {photos.map((photo) => {
        return (
          <div key={photo.id} className="photo">
            <div className="title">
              {photo.id} {photo.title}
              <img src={photo.thumbnailUrl} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
