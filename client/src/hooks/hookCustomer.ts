import { useEffect, useState } from "react";
import { User } from "../components/types";
import { getAllCustomers } from "../api/customer";

 export const useCustomer = () => {
   const [customers, setCustomers] = useState<User[]>([]);

   const fetchCustomers = async () => {
     try {
       const data = await getAllCustomers();
       setCustomers(data);
     } catch (error) {
       console.error('Error fetching customers:', error);
     }
   };

   useEffect(() => {
     fetchCustomers();
   }, []);

  return {
     customers,
     fetchCustomers,
  };
}