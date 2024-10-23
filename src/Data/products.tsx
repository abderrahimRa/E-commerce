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
      "A timeless luxury watch with a sleek design and premium craftsmanship. Features a stainless steel case, sapphire crystal, and automatic movement.",
    tags: ["New", "Luxury"],
    image: blackWatch,
  },
  {
    id: 2,
    name: "Blue Perfume",
    price: "$899",
    description:
      "A powerful perfume with a stunning fragrance and long-lasting effect. Equipped with a high-resolution scent and the latest aroma technology.",
    tags: ["Featured", "Bestseller"],
    image: blue,
  },
  {
    id: 3,
    name: "Extrait Perfume",
    price: "$150",
    description:
      "Track your fitness and health goals with this advanced fitness tracker. Monitors heart rate, sleep patterns, and various exercise activities.",
    tags: ["Hot", "New"],
    image: extrait,
  },
  {
    id: 4,
    name: "Merissa Perfume",
    price: "$79",
    description:
      "A sleek wireless keyboard with ergonomic design and long battery life. Compatible with multiple devices and operating systems.",
    tags: ["Bestseller", "Ergonomic"],
    image: merissa,
  },
  {
    id: 5,
    name: "Sauvage Perfume",
    price: "$299",
    description:
      "Immerse yourself in virtual worlds with this next-gen VR headset. Features high-resolution displays and advanced motion tracking.",
    tags: ["New", "Popular"],
    image: sauvage,
  },
  {
    id: 6,
    name: "Tom Sodage Perfume",
    price: "$120",
    description:
      "A portable Bluetooth speaker with impressive sound quality and battery life. Water-resistant design makes it perfect for outdoor use.",
    tags: ["Hot", "Portable"],
    image: tomSodage,
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: "$199",
    description:
      "Experience high-quality sound and noise cancellation with these wireless earbuds. Comfortable fit for all-day wear and long battery life.",
    tags: ["Popular", "Hot"],
    image: airpods,
  },
];

export default products;
