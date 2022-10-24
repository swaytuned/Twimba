"use strict"

import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


  
// button event listener
document.addEventListener("click", (event) => {
    // event.preventDefault()

    if (event.target.dataset.like){
        handleLikeClick(event.target.dataset.like)
    }
    else if (event.target.dataset.retweet){
        handleRetweetClick(event.target.dataset.retweet)
    }
    else if (event.target.dataset.reply){
        handleReplyClick(event.target.dataset.reply)
    }
    else if (event.target.id === "tweet-btn") {
        handleTweetBtnClick()
    }    
})

// Like button code
const handleLikeClick = (tweetId) => {
        let targetTweetObj = tweetsData.filter( (tweet) => {
            return tweet.uuid === tweetId
        })[0]

        if (targetTweetObj.isLiked){
            targetTweetObj.likes--    
        }
        else {
            targetTweetObj.likes++    
        }
        targetTweetObj.isLiked = !targetTweetObj.isLiked
        render()
}

// retweet button code
const handleRetweetClick = (tweetId) => {
    let targetTweetObj = tweetsData.filter( (tweet) => {
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

// Toggle the replies
const handleReplyClick = (replyId) => {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

// Tweet button
const handleTweetBtnClick = () => {
    const tweetInput = document.getElementById("tweet-input")
    
    if (tweetInput.value){
        tweetsData.unshift ({
            handle: `@Scrimba`,
            profilePic: `./images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    
        render()    
        // clear text area
        tweetInput.value = ""
    }
}

// Pull the feed
const getFeedHtml = () => {
    let feedHtml = ""
    
    tweetsData.forEach( (twtArray) => {

        // Like button color
        let likeIconClass = ""

        if (twtArray.isLiked){
            likeIconClass = "liked"
        }

        // Retween button color
        let retweetIconClass = ""

        if (twtArray.isRetweeted){
            retweetIconClass = "retweeted"
        }

        // Replies
        let repliesHtml = ""

        if (twtArray.replies.length > 0) {
            twtArray.replies.forEach( (reply) => {
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
            `
            })    
        }

        // The Feed
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${twtArray.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${twtArray.handle}</p>
                    <p class="tweet-text">${twtArray.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${twtArray.uuid}"></i>
                            ${twtArray.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${twtArray.uuid}"></i>
                            ${twtArray.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${twtArray.uuid}"></i>
                        ${twtArray.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${twtArray.uuid}">
            ${repliesHtml}
            </div>

        </div>
        `
    })
    return feedHtml    
}

// Render page
const render = () => {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()