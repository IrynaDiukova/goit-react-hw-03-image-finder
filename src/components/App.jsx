import { Component } from 'react';
import pixabayAPI from '../services/api-service';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';
// import { Layout } from './Layout';
// import { GlobalStyle } from './GlobalStyle';
// import Searchbar from './Searchbar';
// import ImageGallery from './ImageGallery';
// import Button from './Button';
// import Modal from './Modal';
import Loader from './Loader';

export class App extends Component {
  state ={
    status: 'start',
    search: '',
    page: 1,
    images: [],
    activelImg: '',
    totalPages: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    const {search: prevSearch, page: prevPage } = prevState;

    if (!search) return;

    if (page !== prevPage || search !== prevSearch) {
      this.getImages();
    }
  }

  async getImages() {
    const { search, page, images } = this.state;

    this.setStatus('loading');

    try {
      const { hits, totalHits } = await pixabayAPI.searchImages(search, page);

      if (!hits.length) {
        toast.info('Sorry, but there are no results for your search.');
        return;
      }

      this.setState({
        images: [...images, ...hits],
      });

      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState('resolved');
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  setNewSearch = search => {
    this.setState({
      search,
      page: 1,
      images: [],
      totalPages: 1,
      status: 'start',
    });
  };

  setActiveImageUrl = url => this.setState({ activelImg: url });

  setNextPage = () => this.setState(({ page }) => ({ page: page + 1}));

  setStatus = status => this.setState({ status });

  render(){
    const { status, images, activeImage, page, totalPages } = this.state;

    const isVisibleButton = page < totalPages && status === 'resolved';

    return (
      <Layout>
        <Searchbar onSearch={this.setNewSearch}/>
      </Layout>
       
    );
  }
};
