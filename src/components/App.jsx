import { useState, useEffect } from 'react';
import { Box } from 'components/Styles/Element.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import ButtonLoadMore from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Api/apiService';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(null);
  //const [showModal, setShowModal] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue === query) {
      return;
    }
    setItems([]);
    setQuery(inputValue);
    setPage(1);
    setTotal(null);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const update = async () => {
      setIsLoading(true);
      try {
        await fetchImages(query, page).then(res => {
          if (!res.data.hits.length) {
            return console.log(
              'There is no images with this request. Please, try again'
            );
          }
          setItems(prevState => [...prevState, ...res.data.hits]);
          setTotal(res.data.totalHits);
          setIsLoading(false);
        });
      } catch (error) {
        console.log('Error');
      } finally {
        setIsLoading(false);
      }
    };
    update();
  }, [query, page]);

  const handleQueryChange = e => {
    const { value } = e.currentTarget;
    setInputValue(value);
  };

  const showModalImage = largeImageURL => {
    const item = items.find(item => item.largeImageURL === largeImageURL);
    setLargeImageURL(item.largeImageURL);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };
  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  //const { items, total, showModal, inputValue } = this.state;
  return (
    <Box px={3}>
      <SearchBar
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={handleQueryChange}
      />
      {items.length > 0 && (
        <ImageGallery images={items} openModal={showModalImage} />
      )}
      {items.length < total && !isLoading && (
        <ButtonLoadMore text="Load More" onClick={onClickLoadMore} />
      )}
      {isLoading && <Loader />}
      {largeImageURL && (
        <Modal
          largeImageUrl={largeImageURL}
          // tags={showModal.tags}
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};