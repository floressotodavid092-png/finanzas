import { supabase } from "@/lib/supabase";
import { useState } from "react";

const useTransaction = () => {
    const[expenses,setExpense]= useState([])

     const fetchExpense=async()=>
        const{data,error}= await supabase
        .from('expenses')
        .select(*)
        .order('id',{ascending:true})

        if(error){
            console.log/("Failed to fetch expense: ",error.message);
            return
        }
        setExpense(data||[])
    }