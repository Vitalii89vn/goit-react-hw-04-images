import { useState, useEffect } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery} from "components/ImageGallery/ImageGallery";
import Notiflix from 'notiflix';
import { FetchPixabay } from "utils/FetchPixabay";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";

export const App =()=> {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState({});
  const [error, setError] = useState(null);
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (searchQuery === '') return;

    setLoading(true);

    FetchPixabay(searchQuery, page, error)
      .then(images => {
        if (images.total !== 0) {
          setImages(images);
          setCard(prevState => [...prevState, ...images.hits]);
             }
              else {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              };
            })
            .catch(()=> setError(error))
            .finally(()=>setLoading(false)) 
  },[error, page, searchQuery])

 function handleFormSubmit(searchQuery) {
   setSearchQuery(searchQuery);
   setCard([]);
   setImages({});
   setPage(1);
  };

  const onClickLoadMore = () => {setPage(prevPage=> prevPage + 1)};

    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        { images.total !== 0 && <ImageGallery card={card} /> }
        { loading && <Loader /> }
        { !loading && images.total !== 0 && (images.total / page / 12 >= 1) && <Button onClick={() => onClickLoadMore()} /> }
        { images.total === 0 && error.message }
      </div>
    )
  
}
 