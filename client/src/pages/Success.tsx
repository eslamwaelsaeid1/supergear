import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Container from "../ui/Utility/Container";
import Loading from "../ui/Utility/Loading";

const Success = () => {
  const { currentUser, cartProduct, resetCart } = Store();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    } else if (cartProduct.length > 0) {
      const saveOrder = async () => {
        try {
          setLoading(true);
          const orderRef = doc(db, "orders", currentUser!.email);
          const docSnap = await getDoc(orderRef);
          if (docSnap.exists()) {
            // document exist, update the order items array
            await updateDoc(orderRef, {
              orders: arrayUnion({
                userEmail: currentUser?.email,
                paymentId: sessionId,
                orderItems: cartProduct,
                paymentMethod: "stripe",
                userId: currentUser?.id,
              }),
            });
          } else {
            // document does not exist, create new one
            await setDoc(orderRef, {
              orders: [
                {
                  userEmail: currentUser?.email,
                  paymentId: sessionId,
                  orderItems: cartProduct,
                  paymentMethod: "stripe",
                  userId: currentUser?.id,
                },
              ],
            });
          }
          toast.success("Payment accepted successfully & order saved!");
          resetCart();
        } catch (err) {
          toast.error("error saving order data");
          console.error("Error saving order:", err); // تسجيل الأخطاء في وحدة التحكم
        } finally {
          setLoading(false);
        }
      };

      saveOrder();
    }
  }, [sessionId, navigate, currentUser, cartProduct, resetCart]);

  return (
    <Container>
      {loading && <Loading />}
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {loading
            ? "Your order payment is processing"
            : "Your Payment Accepted by supergear.com"}
        </h2>

        <p>
          {loading ? "Once done" : "Now"} you can view your Orders or continue
          Shopping with us
        </p>

        <div className="flex items-center gap-x-5">
          <Link to={"/orders"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          
          <Link to={"/"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;
