import React from 'react'
import { useState, useEffect } from 'react'
import classes from './styles/button.module.css'
import axios from 'axios'



const Button = (props) => {
    const [isFollowing, setIsFollowing] = useState();
    const [follow, setFollow] = useState("follow");
    const [userFollows, setUserFollows] = useState();
    const [clicked, setClicked] = useState(false);
    let userFollowsTemp = [];
    let followTemp = "follow";
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        setButtonVisuals(); 
        setButtonState();
    }, [clicked])

    const checkIsFollowing = (follows) => {
        let flag=false;
        follows.forEach(user => {
            if (props.id === user.userID){
                setFollow('unfollow')
                flag=true;
            };
        })
        return flag;
    }
    const setButtonVisuals = () =>{
       if (checkIsFollowing(userFollowsTemp)){
           setFollow("unfollow")
           console.log('set button to unfollow')
           
       }
       else{
           setFollow("follow");
           console.log('set button to follow')
       }
       
    }


    const setButtonState = () => {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                }
            };
           axios.get(`https://my-web-lib.herokuapp.com/members/${localStorage.getItem("currentUser")}`, config)
            .then(res => {
                console.log(res.data.data.follow);
                userFollowsTemp = res.data.data.follow;              
                setIsFollowing(checkIsFollowing(userFollowsTemp));
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response)
            })
        }

    const followUnfollowUser = (e) => {
    if(!isFollowing){
        followTemp = "follow";
        axios({
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token"), 
            },
            data:{
                id: props.id,
            },
            url: "https://my-web-lib.herokuapp.com/members/follow"
        }).then((res) => {
            console.log(res)
        })
        .catch(error =>{
            console.log(error.response)
        })
        setClicked(!clicked);

    }
    else{
        followTemp="unfollow";
        axios({
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token"), 
            },
            data:{
                id: props.id,
            },
            url: "https://my-web-lib.herokuapp.com/members/unFollow"
        }).then((res) => {
            console.log(res)
        })
        .catch(error =>{
            console.log(error.response)
        })
        
    }
    setClicked(!clicked);
}


return (
    <div>
            <button className={classes.button} onClick={followUnfollowUser}>{!loading ? follow : ""}</button>
        </div>
    )
}

export default Button
