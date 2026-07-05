import Layout from './Layout'
import Home from './pages/Home'
import Brand from './pages/Brand'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Gallery from './pages/Gallery'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import productsData from './data/products.json'
import newsData from './data/news.json'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'brand', element: <Brand /> },
      { path: 'products', element: <Products /> },
      {
        path: 'products/:slug',
        element: <ProductDetail />,
        // 프리렌더할 상품 상세 경로 목록
        getStaticPaths: () => productsData.products.map(p => `products/${p.slug}`),
      },
      { path: 'gallery', element: <Gallery /> },
      { path: 'news', element: <News /> },
      {
        path: 'news/:slug',
        element: <NewsDetail />,
        getStaticPaths: () => newsData.articles.map(a => `news/${a.slug}`),
      },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
    ],
  },
]
