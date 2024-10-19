import blackWatch from "../Data/images/blackWatch.jpg";
import blue from "../Data/images/blue.jpg";
import extrait from "../Data/images/extrait.jpg";
import merissa from "../Data/images/merissa.jpg";
import sauvage from "../Data/images/sauvage.jpg";
import tomSodage from "../Data/images/tom-sodage.jpg";
import airpods from "../Data/images/airpods.jpg";

const products = [
    {
        id: 1,
        name: "Luxury Watch",
        price: "$499",
        description:
            "A timeless luxury watch with a sleek design and premium craftsmanship.",
        tags: ["New", "Luxury"],
        image: blackWatch,
    },
    {
        id: 2,
        name: "Smartphone",
        price: "$899",
        description:
            "A powerful smartphone with a stunning display and long battery life.",
        tags: ["Featured", "Bestseller"],
        image: blue,
    },
    {
        id: 3,
        name: "Fitness Tracker",
        price: "$150",
        description:
            "Track your fitness and health goals with this advanced fitness tracker.",
        tags: ["Hot", "New"],
        image: extrait,
    },
    {
        id: 4,
        name: "Wireless Keyboard",
        price: "$79",
        description:
            "A sleek wireless keyboard with ergonomic design and long battery life.",
        tags: ["Bestseller", "Ergonomic"],
        image: merissa,
    },
    {
        id: 5,
        name: "VR Headset",
        price: "$299",
        description:
            "Immerse yourself in virtual worlds with this next-gen VR headset.",
        tags: ["New", "Popular"],
        image: sauvage,
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: "$120",
        description:
            "A portable Bluetooth speaker with impressive sound quality and battery life.",
        tags: ["Hot", "Portable"],
        image: tomSodage,
    },
    {
        id: 7,
        name: "Wireless Earbuds",
        price: "$199",
        description:
            "Experience high-quality sound and noise cancellation with these wireless earbuds.",
        tags: ["Popular", "Hot"],
        image: airpods,
    },
];

export default products;
