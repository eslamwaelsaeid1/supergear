import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config";
import { getData } from "../lib";
import { ProductProps } from "../../type";
import Loading from "../ui/Utility/Loading";
import Container from "../ui/Utility/Container";
import _ from "lodash";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import FormatedPrice from "../ui/Utility/FormatedPrice";
import AddToCartBtn from "../ui/AddToCartBtn";
import { productPayment } from "../assets copy";
import { IoClose } from "react-icons/io5";
import ProductCard from "../ui/product5/ProductCard";
import CategoryFilters from "../ui/CategoryFilters";
import PriceTag from "../ui/PriceTag";

const Product = () => {
  const [productData, setProductData] = useState<ProductProps | null>(null);
  const [allproductData, setAllProductData] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams();
  const endpoint = id
    ? `${config?.baseUrl}/products/${id}`
    : `${config?.baseUrl}/products/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(endpoint);
        if (id) {
          setProductData(data);
          setAllProductData([]);
        } else {
          setAllProductData(data);
          setProductData(null);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, endpoint]);

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images[0]);
      setColor(productData?.colors[0]);
    }
  }, [productData]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!!id && productData && _.isEmpty(allproductData) ? ( //!!id && productData && allproductData.length === 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-start">
                <div>
                  {productData?.images?.map((item, index) => (
                    <img
                      src={item}
                      alt="img"
                      key={index}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        imgUrl === item &&
                        "border border-gray-500 rounded-sm opacity-100"
                      }`}
                      onClick={() => setImgUrl(item)}
                    />
                  ))}
                </div>

                <div>
                  <img src={imgUrl} alt="mainImage" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">{productData?.name}</h2>{" "}
                {/* name */}
                <div>
                  <PriceTag
                    regularPrice={productData.regularPrice}
                    discountedPrice={productData.discountedPrice}
                  />{" "}
                </div>{" "}
                {/* PriceTag */}
                <div className="flex items-center gap-1">
                  <div className="text-base text-lightText flex items-center">
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                  <p className="text-base font-semibold">{`(${productData?.reviews} reviews)`}</p>
                </div>
                {/* stars & number-of-reviews */}
                <p className="flex items-center">
                  <FaRegEye className="mr-1" />
                  <span className="font-semibold mr-1">
                    {productData?.reviews}
                  </span>
                  peoples are viewing this right now
                </p>{" "}
                {/* reviews */}
                <p>
                  You are saving{" "}
                  <span className="text-base font-semibold text-green-500">
                    <FormatedPrice
                      amount={
                        productData?.regularPrice - productData?.discountedPrice
                      }
                    />
                  </span>{" "}
                  upon purchase
                </p>{" "}
                {/* saving price */}
                <div>
                  {color && (
                    <p>
                      Color:{" "}
                      <span
                        className="font-semibold capitalize"
                        style={{ color: color }}
                      >
                        {color}
                      </span>
                    </p>
                  )}
                  <div className="flex items-center gap-x-3">
                    {productData?.colors.map((item) => (
                      <div
                        key={item}
                        className={`${
                          item === color
                            ? "border border-black p-1 rounded-full"
                            : "border-transparent"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full cursor-pointer"
                          style={{ backgroundColor: item }}
                          onClick={() => setColor(item)}
                        />
                      </div>
                    ))}
                  </div>
                  {color && (
                    <button
                      onClick={() => setColor("")}
                      className="font-semibold mt-1 flex items-center gap-1 hover:text-red-600 duration-200"
                    >
                      <IoClose /> Clear
                    </button>
                  )}
                </div>{" "}
                {/* color */}
                <p>
                  Brand:{" "}
                  <span className="font-medium">{productData?.brand}</span>
                </p>{" "}
                {/* brand */}
                <p>
                  Category:{" "}
                  <span className="font-medium">{productData?.category}</span>
                </p>{" "}
                {/* category */}
                <AddToCartBtn
                  product={productData}
                  title="Buy now"
                  className="bg-black/80 py-3 text-base text-gray-200 hover:scale-100 hover:text-white duration-200"
                />{" "}
                {/* Buy now */}
                <div className="bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
                  <img
                    src={productPayment}
                    alt="payment"
                    className="w-auto object-cover"
                  />
                  <p className="font-semibold">
                    Guaranteed safe & secure checkout
                  </p>
                </div>{" "}
                {/* image */}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-10">
              <CategoryFilters id={id}/>
              <div>
                <p className="text-4xl font-semibold mb-5 text-center">
                  Products Collection
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {allproductData?.map((item: ProductProps) => (
                    <ProductCard item={item} key={item?._id} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};
export default Product;
