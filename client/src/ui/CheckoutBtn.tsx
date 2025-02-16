import { ProductProps } from "../../type";
import { Store } from "../lib/store";
import {loadStripe} from '@stripe/stripe-js';
import { config } from "../config";

const CheckoutBtn = ({ products }: { products: ProductProps[] }) => {
  const { currentUser } = Store();
  const publishableKey = "pk_test_51QsmwW2fllD8Q1FcH0BZFQ3rw8IzcWSQJWeHpgFrIADo26aXonNnRotwThrnhwErCO5MpFu4HZtznmm2522qC5UM006J0VNJQJ"
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout =async()=>{
    const stripe = await stripePromise;
    const response = await fetch(`${config?.baseUrl}/checkout`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: products,
        email: currentUser?.email,
      }),
    })
    
    const checkoutSession = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (result.error) {
        window.alert(result?.error?.message);
      }
  }

  return (
    
    <div className="mt-6">
      {currentUser ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;

// التفاعل بين الواجهة الأمامية والـ Backend:
// الواجهة الأمامية ترسل طلب POST إلى الـ Backend عبر /checkout، مع إرسال بيانات المنتجات والبريد الإلكتروني.
// الـ Backend ينشئ جلسة الدفع:
// الـ Backend يستخدم Stripe API لإنشاء Checkout Session بناءً على البيانات المرسلة من الواجهة الأمامية.
// إرجاع session.id:
// الـ Backend يعيد session.id إلى الواجهة الأمامية.
// الـ Frontend يستخدم session.id لإعادة توجيه المستخدم إلى صفحة الدفع:
// باستخدام stripe.redirectToCheckout({ sessionId: checkoutSession.id })، يتم إعادة توجيه المستخدم إلى صفحة الدفع الخاصة بـ Stripe.
