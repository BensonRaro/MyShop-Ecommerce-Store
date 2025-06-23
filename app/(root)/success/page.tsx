import Link from "next/link";
import { VscPassFilled } from "react-icons/vsc";

const SuccessPage = () => {
  return (
    <div className="justify-center items-center flex h-[70vh]">
      <div className="shadow-2xl p-6 md:mx-auto">
        <VscPassFilled className="text-primary size-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base font-bold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-500 my-2">
            Thank you for completing your payment. Your transaction was
            successful.
          </p>
          <p className="text-gray-400">Have A Great Day</p>
          <div className="py-10 space-y-4 flex flex-col">
            <Link
              href="/orders"
              className="px-12 rounded-md bg-primary hover:bg-green-500 text-black font-semibold py-3"
            >
              View Your Orders
            </Link>
            <Link
              href="/shop"
              className="px-12 rounded-md bg-primary hover:bg-green-500 text-black font-semibold py-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
