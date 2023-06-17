import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "./AuthContext";
import { styles } from "../style";
import { urlNewsletter } from '../endpoints';

const NewsletterSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {getResJsonToken} = useAuth();

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await axios.get(urlNewsletter,{
        headers: {
          Authorization:`Bearer ${getResJsonToken()}`
          

        }});
      setIsSubscribed(response.data.isSubscribed);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const subscribe = async () => {
    try {
      const response = await axios.post(urlNewsletter, {},{
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${getResJsonToken()}`
          

        }});
        setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing to the newsletter:', error);
    }
  };

  const unsubscribe = async () => {
    try {
      const response = await axios.post(urlNewsletter,{}, {
        headers: {
          Authorization:`Bearer ${getResJsonToken()}`
          

        }});
        setIsSubscribed(false);
    } catch (error) {
      console.error('Error subscribing to the newsletter:', error);
    }
  };

  return (
    <div className="add_recipe overflow-y-scroll px-4 flex flex-col pb-10  items-center w-full h-full justify-center xs:justify-start text-center">
      <div className={`${styles.heading2} xs:my-0 my-4 text-white `}>
        Zapisz sie do Newslettera !
      </div>
      {isSubscribed ? (
        <div>
         <p className="mt-4 text-white">Jesteś subsktybentem! </p>
            <button onClick={unsubscribe}

            className={`${styles.paragraph} text-dimWhite hover:text-white p-5 xs:mb-0 mb-20 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-md `}>
                Odsubskrybuj!  
            </button>
     
      </div>
      ) : (
        <div>
          
          
          <button onClick={subscribe}

            className={`${styles.paragraph} text-dimWhite hover:text-white p-5 xs:mb-0 mb-20 mt-3 sm:min-w-[25%] min-w-[100%] border-[1px] focus:border-white hover:border-white border-dimWhite w-[100%] hover:bg-black bg-black rounded-md `}>
            Zapisz sie! 
            
        </button>

            <p className="mt-4 text-white">Jeszcze nie subskrybujesz naszego newslettera! </p>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscription;