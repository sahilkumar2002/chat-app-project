import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./UseAuthStore";

export const useChatStore= create((set,get)=>({
    
   messages:[],
   users:[],
   selectedUser:null,
   isUserLoading:false,
   isMessagesLoading:false,
   
   
   getUsers:async()=>{
    set({isUserLoading:true});

    try{
        const res= await axiosInstance.get("/message/users");
        set({users:res.data});
    }
    catch(error){
     toast.error(error.message.data.message);
    }finally{
        set({isUserLoading:false});
    }
   },

   getMessages:async(userId)=>{
    set({isMessagesLoading:true});

    try{
      const res=await axiosInstance.get(`/message/${userId}`);
      set({messages:res.data});

    }
    catch(error){
     toast.error(error.message.data);
    }
    finally{
        set({isMessagesLoading:false});
    }
   },
   
 sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  
  subscribeTomessages:()=>{
  const {selectedUser} =get();
  if(!selectedUser) return;

  const socket =useAuthStore.getState().socket;
  
  socket.on("newMessage",(newMessage)=>{
    const ismeesageSendFromSelectedUser =newMessage.senderId ===selectedUser._id
    if(!ismeesageSendFromSelectedUser) return;
    set({
      messages: [...get().messages, newMessage],
    });
  });
  },


  unsubscribeTomessage:()=>{
  const socket =useAuthStore.getState().socket;
  socket.off("newMessage");
  },


   setSelectedUser:(selectedUser)=>set({selectedUser}),

}));