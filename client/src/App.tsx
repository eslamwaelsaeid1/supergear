import BannerCategories from "./ui/bannerCategories1/BannerCategories";
import "react-multi-carousel/lib/styles.css";

import Categories from "./ui/categories4/Categories";
import ProductList from "./ui/product5/ProductList";
import HomeBanner from "./ui/homeBanner2/HomeBanner";
import Highlights from "./ui/highlights3/Highlights";
import DiscountedBanner from "./ui/DiscountedBanner6/DiscountedBanner";
import Blog from "./ui/Blog7/Blog";

// import Container from "./ui/Container";

function App() {
  return (
    <>
      <main>
        <BannerCategories />
        <HomeBanner/>
        <Highlights/>
        <Categories/>
        <ProductList/>
        <DiscountedBanner/>
        <Blog/>
      </main>
    </>
  );
}

export default App;
