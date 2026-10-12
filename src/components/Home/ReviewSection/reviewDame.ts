import avatar from "../../../assets/cardIcon/avtor.png"
import avtor2 from "../../../assets/cardIcon/avtor2.png"
import avtor3 from "../../../assets/cardIcon/avtor3.png"
import { Review } from "./review.type";
export const reviews: Review[] = [
    {
        name: "Mike Johnson",
        company: "Green Valley Dairy Farm",
        quote: "FarmLink saved me hours of reading through CVs. The AI summaries are spot-on and the fit scores helped me find the perfect milking technician.",
        rating: 5,
        avatar: avatar, 
    },
    {
        name: "Sarah Thompson",
        company: "Urban Harvest Co.",
        quote: "I was skeptical at first, but FarmLink’s AI matched us with candidates who truly understood our hydroponic setup. Game changer.",
        rating: 4,
        avatar: avtor2,
    },
    {
        name: "Carlos Mendes",
        company: "Sunrise Poultry",
        quote: "Hiring used to take several weeks and countless hours. Now it’s just a few clicks, and the AI fit score is remarkably accurate every time.",
        rating: 5,
        avatar: avtor3,
    },
];
