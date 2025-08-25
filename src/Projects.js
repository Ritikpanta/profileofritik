// src/Projects.js
import { poems } from "./data/poems.js";
const projects = [

  //graphics
  {
    id: "Phool",
    title: "Phool",
    description: "Phool is one of those design which is close to me. When I write something I dream about a ideal character like phool - which is imaginary ofc. I've written a full 8 chapter short film which hopefully one i day I'll be able to give visual justice", 
    cover: "/project/ful - 2.png",
    tags: ["Design", "Videography"],
    category: "graphics"     
  },
  {
    id: "Thakan",
    title: "Tired – Thakan",
    description: "As Someone who came to Australia at a young age, redoing something that you don't actually enjoy was something sort of tiring. I felt I needed a rest, a long rest. I wrote Bishram (Rest) during early days of Australia & Thakan is a prequel to that.",
    cover: "/project/tired.png",
    tags: ["Design", "Videography"],
    category: "graphics"     
  },
  {
   id: "Kathakar",
   title: "Kathakar",
   description: "A vibrant movie poster for a poetrical film, i titled it kathakar - the subject on the poster is me and the map is of Nepal.",
   cover: "/project/kathakar.png",
   tags: ["Design"],
   category: "graphics"      
 },
   {
   id: "Two",
   title: "Two",
   description: "Two was a short film i made all by myself, having two side of me in the screen. This was the thumbnail for the shortfilm, you could scroll down and see it in the videography section",
   cover: "/project/TWO.png",
   tags: ["Design", "Videography"],
   category: "graphics"    
 },
 {
   id: "Coffee",
   title: "Coffee Product Showcase",
   description: "Nepal Coffee, a marketing poster for the coffee that the RR COMPANY makes. This is the poster from my early days of learning and I was happy with the result I made.",
   cover: "/project/Coffee.png",
   tags: ["Design"],
   category: "graphics"      
 },

  // {
  //   id: "boy-hill",
  //   title: "Boy Above the Hill",
  //   description: "One of my friend clicked this picture around the hill areas of Nepal, this inspired me to make a really nice story but just ended up making a book poster.",
  //   cover: "/project/boyabovethehill.png",
  //   tags: ["Design"],
  //   category: "graphics"      
  // },
  {
    id: "blood-bath",
    title: "Blood Bath",
    description: "A mysterious movie poster, I holded a knife and shot some of the pictures and did the rest magic in the photoshop.",
    cover: "/project/bloodbath.png",
    tags: ["Design"],
    category: "graphics"      
  },

  {
    id: "Dukha",
    title: "PAIN",
    description: "Paradox of Phool. The Same eyes which lights up on phool cover, they speak some pain just because of the theme change. I wanted to highlight there would be a pain in happiness as well.",
    cover: "/project/pain.png",
    tags: ["Design"],
    category: "graphics"      
  },
  
   {
    id: "RED",
    title: "RED",
    description: "Another piece of my movie-poster collection. I made this poster with a red theme and tone of a detective.",
    cover: "/project/red.png",
    tags: ["Design"],
    category: "graphics"      
  },
 
  {
    id: "Boy with a guitar",
    title: "Boy with a guitar",
    description: "Boy with a guitar is a movie poster I made for a practice, I clicked myself playing ukelele and titled it a boy with a guitar, irony.",
    cover: "/project/boywithaguitar.png",
    tags: ["Design"],
    category: "graphics"      
  },
  {
    id: "MANCHILD",
    title: "MANCHILD",
    description: "One of my early designs, from my movie-poster collection. The Big Manchild is a movie themed around a pshychopath who is there to solve a mystery. idk something like that.",
    cover: "/project/thebigmanchild.png",
    tags: ["Design"],
    category: "graphics"      
  },

  {
   id: "Brouchure",
   title: "Talent Mela",
   description: "I hosted an event TALENT MELA for my startup - chautari where we annouced a prize of 20,000 Nepali with the motto of promoting passion. Seeing Nepali people so talented yet couldn't possibly follow their passion we did this event to showcase talent and it was hosted in our discord server.",
   cover: "/project/Brouchure.png",
   tags: ["Design"],
   category: "graphics"      
 },
  {
    id: "Chess Carnival",
    title: "Chess Carnival Poster",
    description: "Chess Carnival was an online chess event I organized with my team at Chautari. To promote the sport in Nepal, we hosted it with free entry and a 25k prize pool — the first event of its kind in the country.",
    cover: "/project/CHESS CARNIVAL.png",
    tags: ["Design"],
    category: "graphics"     
  },
   {
    id: "Certificate",
    title: "Certificate of Appreciation",
    description: "For the Event I've hosted this is the appreciation of Certificate I got and Ironically I made lol.",
    cover: "/project/Ritik-panta.png",
    tags: ["Design"],
    category: "graphics"      
  },
  
  {
   id: "Black",
   title: "Murderer of the Blackpath",
   description: "Another Piece of my Movie-poster collection. Murderer of the blackpath, I clicked some of my pictures with eyes open trying to look scary and ended up making this lol.",
   cover: "/project/black.png",
   tags: ["Design"],
   category: "graphics"      
 },
  {
   id: "Dream Team",
   title: "Dream Team",
   description: "I made this team annoucement Poster of My Friends futsal team. The Dream Team",
   cover: "/project/Dreamteam.png",
   tags: ["Design"],
   category: "graphics"      
 },
  {
   id: "Host of the show",
   title: "Host of the Show",
   description: "The person on the poster is me & I hosted this event as well. Made this poster and also hosted a successful event.",
   cover: "/project/HOST - RITIK.png",
   tags: ["Design"],
   category: "graphics"      
 },
  {
   id: "Utensils",
   title: "Utensils on Sale",
   description: "Product showcase which are on sale, these were from my early days of photoshop. I experimented lot to highlight the product that were on sales just for the marketing purpose.",
   cover: "/project/UTENSILS SALE.png",
   tags: ["Design"],
   category: "graphics"      
 },
  
 
  
  //videography
  {
    id: "yolo-tiktok",
    title: "YOLO Australia Launch",
    description: "TikTok promo cut, hosted locally for clean playback.",
    cover: "../Tiktokvid/YoloThumb.png",
    videoSrc: "/Tiktokvid/yolo.mp4",  
    ratio: "9/16",                   
    tags: ["Videography"],
    category: "videography"
  },
  {
  id: "tired-thakan",
  title: "Tired – Thakan",
  description: "After coming to Australia and redoing something I didn't love.I felt I needed a rest, a long rest. I wrote Bishram (Rest) during early days of Australia & Thakan is a prequel to that.",
  cover: "https://img.youtube.com/vi/k8PAisotcoY/maxresdefault.jpg",
  tags: ["Videography"],
  category: "videography",
  embed: "https://www.youtube.com/embed/k8PAisotcoY?rel=0"
},
{
  id: "Phool",
  title: "Phool",
  description: "Phool is a love story I've been writing for a while. I've written a full 8 chapters for this and this video just a glimpse of the story. Since, I don't have a team its pretty hard to pull whole story as of now.",
  cover: "https://img.youtube.com/vi/9ff56VwL3YU/mqdefault.jpg",
  tags: ["Videography"],
  category: "videography",
  embed: "https://www.youtube.com/embed/9ff56VwL3YU?rel=0"
},
{
  id: "Two",
  title: "Two",
  description: "A two prepective you have in yourself yet you somehow choose one side of that. I had two faces of me in the screen, edited and colorgraded with davinci resolve",
  cover: "https://img.youtube.com/vi/zVwb1i1Xliw/maxresdefault.jpg",
  tags: ["Videography"],
  category: "videography",
  embed: "https://www.youtube.com/embed/zVwb1i1Xliw"
},
{
  id: "BISHRAM",
  title: "BISHRAM",
  description: "A short film exploring the feeling of exhaustion.",
  cover: "https://img.youtube.com/vi/2q4DsfPoXgA/maxresdefault.jpg",
  tags: ["Videography"],
  category: "videography",
  embed: "https://www.youtube.com/embed/2q4DsfPoXgA"
},
{
  id: "EVENT HIGHLIGHT",
  title: "EVENT HIGHLIGHT",
  description: "A short film exploring the feeling of exhaustion.",
  cover: "https://img.youtube.com/vi/65SXbi9ZotE/maxresdefault.jpg",
  tags: ["Videography"],
  category: "videography",
  embed: "https://www.youtube.com/embed/65SXbi9ZotE"
},
{
    id: "Nadhan",
    title: "YOLO Australia Launch",
    description: "I was trying to make one intro video for one of my projects and When I added nadhaan parinde song to it. It just gave a different meaning to it, a beautiful meaning.",
    cover: "../Tiktokvid/Naadhan.png",
    videoSrc: "/Tiktokvid/Naadhan.mp4",   
    ratio: "16/9",                   
    tags: ["Videography"],
    category: "videography"
  },

  {
    id: "yolo-tiktok",
    title: "YOLO Australia Launch",
    description: "TikTok promo cut, hosted locally for clean playback.",
    cover: "../Tiktokvid/YoloThumb-2.png",
    videoSrc: "/Tiktokvid/yolo2.mp4",   
    ratio: "9/16",                   
    tags: ["Videography"],
    category: "videography"
  },

  //photography
  {
    id: "ROADS",
    title: "Road to another land",
    description: "I had my tripod on a distance, saw a light coming from a gate. I sat infront the gate and acted mysterious and boom we have a way to another land.",
    cover: "../photography/another-2.png",
    tags: ["Photography"],
    category: "photography"   
  },
 {
    id: "Girl on the shore",
    title: "Girl on the shore",
    description: "The frame, the sun glare, it was giving a dreamy feel. I love to go around shores of beaches and one day I saw this girl sitting and I took the picture. Obviously I am sharing this with her permission. ",
    cover: "../photography/image23.png",
    tags: ["Photography"],
    category: "photography" 
  },
 {
    id: "oh my companion",
    title: "Oh my companion",
    description: "I was watching the dog and his owner play around from afar, i could resist myself from asking to take a picture. As someone who had a dog as a friend when I was 10y/o, this felt close.",
    cover: "../photography/dog.png",
    tags: ["Photography"],
    category: "photography" 
  },
 {
    id: "I want to be old",
    title: "Dear old days",
    description: "Seeing an old couple walking around the park, with their hands wrapping around the shoulder. I can only wish dear old days be like this.",
    cover: "../photography/dearolddays.jpg",
    tags: ["Photography"],
    category: "photography"   
  },
 {
    id: "flower",
    title: "Dear Arthur",
    description: "It was beautiful, speaking some words to me",
    cover: "../photography/flower.JPG",
    tags: ["Photography"],
    category: "photography"   
  },
  
 {
    id: "Me and my memories",
    title: "Young memories",
    description: "I am sure the boy gonna remember these moments, I wish my dad was there when I was too young. He had to be outside of the country due to financial conditions. I just cherish these mements.",
    cover: "../photography/young.jpg",
    tags: ["Photography"],
    category: "photography"   
  },

  //programming


  //poetry
  ...poems

];
export default projects;