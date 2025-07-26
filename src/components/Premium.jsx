import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect, useState } from "react";
// Import an icon for the premium user view
import { HiCheckCircle } from "react-icons/hi";

const Premium = () => {
  // Your state and logic are perfect and remain here
  const [isUserPremium, setIsUserPremium] = useState(false);
  
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
        const res = await axios.get(BASE_URL + "/premium/verify", {
            withCredentials: true,
        });
        if (res.data.isPremium) {
            setIsUserPremium(true);
        }
    } catch (error) {
        console.error("Verification failed", error);
    }
  };

  const handleBuyClick = async (type) => {
    try {
        const order = await axios.post(
            `${BASE_URL}/payment/create`,
            { membershipType: type },
            { withCredentials: true }
        );

        const { amount, keyId, currency, notes, orderId } = order.data;

        const options = {
            key: keyId,
            amount,
            currency,
            name: "DevTinder",
            description: "Connect to other developers",
            order_id: orderId,
            prefill: {
                name: `${notes.firstName} ${notes.lastName}`,
                email: notes.emailId,
                contact: "9999999999",
            },
            theme: { color: "#F37254" },
            handler: verifyPremiumUser,
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Payment initiation failed", error);
    }
  };

  // NEW: A much nicer view for existing premium users
  if (isUserPremium) {
    return (
        <div className="flex justify-center items-center">
            <div className="max-w-md w-full bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 text-center text-slate-800">
                <HiCheckCircle className="mx-auto text-5xl text-green-500" />
                <h1 className="text-3xl font-bold mt-4 text-slate-900">You're a Premium Member!</h1>
                <p className="mt-2 text-slate-600">You have full access to all features. Thank you for your support!</p>
            </div>
        </div>
    );
  }

  // NEW: Themed pricing cards
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Silver Card */}
        <div className="w-full max-w-sm bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-slate-900">Silver Membership</h1>
            <ul className="text-slate-600 text-center my-8 space-y-2 flex-grow">
                <li>✓ Chat with other people</li>
                <li>✓ 100 connection Requests per day</li>
                <li>✓ Get Blue Tick</li>
            </ul>
            <button onClick={() => handleBuyClick("silver")} className="btn-premium-pink">
                3 Month
            </button>
        </div>

        <p className="font-bold text-2xl text-slate-500 my-4 lg:my-0">OR</p>
        
        {/* Gold Card */}
        <div className="w-full max-w-sm bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-slate-900">Gold Membership</h1>
            <ul className="text-slate-600 text-center my-8 space-y-2 flex-grow">
                <li>✓ Chat with other people</li>
                <li>✓ 200 connection Requests per day</li>
                <li>✓ Get Blue Tick</li>
            </ul>
            <button onClick={() => handleBuyClick("gold")} className="btn-premium-blue">
                6 Month
            </button>
        </div>
    </div>
  );
};

export default Premium;