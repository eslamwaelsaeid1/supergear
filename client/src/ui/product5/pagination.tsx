"use client";
import { useEffect, useState } from "react";
import { ProductProps } from "../../../type";
import ReactPaginate from "react-paginate";
import { config } from "../../config";
import { getData } from "../../lib";
import ProductCard from "./ProductCard";

interface ItemsProps {
  currentItems: ProductProps[];
}

const Items = ({ currentItems }: ItemsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {currentItems &&
        currentItems?.map((item: ProductProps) => (
          <ProductCard key={item?._id} item={item} />
        ))}
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
const Pagination = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0); // رقم اول عنصر هيتعرض فالصفحه (هييجيبو من الاراي)
  const [itemStart, setItemStart] = useState(1); // من عندنااحتجناها فالتصميم - تاج P
  const endOffset = itemOffset + itemsPerPage; // رقم اخر عنصر هيتعرض فالصفحه (هييجيبو من الاراي)
  const currentItems = products.slice(itemOffset, endOffset); // هنخزن جواه رينج العناصر الي هتتعرض
  const pageCount = Math.ceil(products.length / itemsPerPage); // 25 / 9

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart = newOffset + 1;
    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold py-10"
          activeClassName="bg-black text-white"
        />
        <p>
          Products from {itemStart} to {Math.min(endOffset, products?.length)}{" "}
          of {products?.length}
          {/* تعيد الأصغر  نستخدمها للتأكد من أننا لا نحاول الوصول إلى أكثر من عدد العناصر المتاحة في المصفوفة*/}
        </p>
      </div>
    </>
  );
};

export default Pagination;
