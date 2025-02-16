import { MdOutlineStarOutline } from "react-icons/md";
import { ProductProps } from "../../../type";
import AddToCartBtn from "../AddToCartBtn";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FormatedPrice from "../Utility/FormatedPrice";
import ProductCartSideNave from "./ProductCartSideNave";
import { useNavigate } from "react-router-dom";

interface props {
  item: ProductProps;
  // setSearchText?: any;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;  // هنا نجعلها دالة
}
const ProductCard = ({ item ,setSearchText}: props) => {
  const Percentage =
    ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice) * 100;

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate()
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const handleProduct = () => {
    navigation(`/Product/${item?._id}`);
    setSearchText?.("");
  };

  return (
    <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2 group">
        <span
          onClick={open}
          className="bg-black text-skyText absolute left-0 right-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
        >
          save {Percentage.toFixed(0)}%
        </span>
        <img
        onClick={handleProduct}
          src={item?.images[0]}
          className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
          alt="product image "
        />
        {/* product card side nav */}
        <ProductCartSideNave product={item}/>
      </div>

      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-xs uppercase font-semibold text-lightText">
          {item?.overView}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2">{item?.name}</h2>
        <div className="text-base text-lightText flex items-center">
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
        </div>
        <AddToCartBtn product={item}/>
      </div>
      {/* /////////////////////////////////////////////////////////////////// */}
      {/* <Transition appear show={isOpen}> */}
        <Dialog
          open={isOpen}
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              > */}
                <DialogPanel
                  className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl duration-300 ease-out "
                >
                  <DialogTitle
                    className="text-base/7 font-medium text-white"
                  >
                    Hurry up!
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Your are going to save
                    <span>
                        <FormatedPrice amount={item?.regularPrice - item?.discountedPrice}/>
                    </span>
                    from this product.
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              {/* </TransitionChild> */}
            </div>
          </div>
        </Dialog>
      {/* </Transition> */}
    </div>
  );
};

export default ProductCard;
