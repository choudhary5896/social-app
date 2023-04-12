import User from "../models/user.js";
 
// Read Logic
export const getUser = async (req,res)=>{

    try{
        const { id }=req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const getUserFriend = async (req,res)=>{
 
   try{
    consol.log("this runs while getting user true")
    const {id}=req.params;
    const user= await User.findById(id);
    const friends=await Promise.all(
        user.friends.map((id)=>User.findById(id)))
        const formattedFriend=friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>{
                return {_id,firstName,lastName,occupation,location,picturePath};
            }
        )
    res.status(200).json(formattedFriend);
   }catch(err){
    consol.log("this runs while getting user false")
    res.status(404).json({message:err.message})
   }

}
/* Updatin the friends */
export const addRemoveFriend=async (req,res)=>{

    try{
        
        const {id, friendId}=req.params;
        // console.log(req.params);
        const user=await User.findById(id);
        const friend=await User.findById(friendId);
       
        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id)=>id!==friendId);
            friend.friends=friend.friends.filter((id)=>id!==id)
        }
        else{
          user.friends.push(friendId);
          friend.friends.push(id);
        }


        console.log("start from here");
        console.log(user,friend);
        await user.save();
        await friend.save();

       
        const friends=await Promise.all(
        user.friends.map((id)=>User.findById(id)))
        
        const formattedFriend=friends.map(
                ({_id,firstName,lastName,occupation,location,picturePath})=>{
                    return {_id,firstName,lastName,occupation,location,picturePath};
                }
            )
            res.status(200).json(formattedFriend);
    }catch(err){
        console.log("error occured");
        res.status(404).json({messsage:err.message});
    }
}