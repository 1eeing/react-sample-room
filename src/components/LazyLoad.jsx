import Loadable from 'react-loadable';
import ViewLoading from './ViewLoading';

const LazyLoad = loader => (
    Loadable({
        loader,
        loading: ViewLoading
    })
)

export default LazyLoad;