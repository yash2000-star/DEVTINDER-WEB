import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect, useState } from "react";

const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser()
  }, [])

const verifyPremiumUser = async () => {
  const res = await axios.get(BASE_URL + "/premium/verify", {
    withCredentials: true,
  });

  if(res.data.isPremium) {
    setIsUserPremium(true);
  }


}

    const handleBuyClick = async (type) => {

        const order = await axios.post(BASE_URL+"/payment/create", {
            membershipType: type,
        }, {withCredentials: true}
     );

       const {amount, keyId, currency, notes, orderId } = order.data;

     const options = {
        key: keyId, 
        amount,
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developers',
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
handler: async function (response) {
  try {
    const verifyRes = await axios.post(BASE_URL + "/payment/verify", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature
    }, { withCredentials: true });

    if (verifyRes.data.success) {
      alert("Payment Successful!");
      setIsUserPremium(true); // Optional immediate feedback
      window.location.href = "/dashboard"; // ✅ redirect manually here
    } else {
      alert("Payment verification failed");
    }
  } catch (error) {
    console.error("Verification error:", error);
    alert("Something went wrong during verification");
  }
}

      };

     var rzp = new window.Razorpay(options);
        rzp.open();

    };

  return (
    isUserPremium ? ( 
      "You are already a premium user"
    ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
         <h1 className="font-bold text-3xl"> Silver Membership</h1>
         <ul>
            <li>Chat with other people</li>
            <li>100 connection Requests per day</li>
            <li>Get Blue Tick</li>
         </ul>
         <button onClick={() => handleBuyClick("silver")} className="btn btn-secondary">3 Month</button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
           <h1 className="font-bold text-3xl">Gold Membership</h1>
         <ul>
            <li>Chat with other people</li>
            <li>200 connection Requests per day</li>
            <li>Get Blue Tick</li>
         </ul>
                  <button onClick={() => handleBuyClick("gold")} className="btn btn-primary">6 Month</button>

        </div>
      </div>
    </div> 
    )
  );
};

export default Premium;