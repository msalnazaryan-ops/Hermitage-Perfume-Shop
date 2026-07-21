export const perfumeDatabase = {
    "Prada": {
        name: "Prada",
        brand: "Prada",
        price: "45000",
        gender: "Female",
        image: "/assets/images/perfumes/Prada.jpg",
        notes: ["Iris", "Patchouli", "Bergamot"]
    },
    "Ajmal": {
        name: "Ajmal",
        brand: "Ajmal",
        price: "52000",
        gender: "Unisex",
        image: "/assets/images/perfumes/AJMAL.png",
        notes: ["Amber", "Rose", "Musk"]
    },
    "Lancome": {
        name: "Idôle Eau De Parfum",
        brand: "Lancome",
        price: "37500",
        gender: "Female",
        image: "/assets/images/perfumes/Lancome.jpg",
        notes: ["Rose", "Jasmine", "White Musk"]
    },
    "Bvlgari": {
        name: "Bvlgari",
        brand: "Bvlgari",
        price: "48000",
        gender: "Unisex",
        image: "/assets/images/perfumes/Bvlgari.jpg",
        notes: ["Tea", "Amber", "Musk"]
    },
    "Clive Christian": {
        name: "Clive Christian",
        brand: "Clive Christian",
        price: "120000",
        gender: "Unisex",
        image: "/assets/images/perfumes/Clive Christian.jpg",
        notes: ["Woody Notes", "Floral Notes", "Vanilla"]
    },
    "Nina Ricci": {
        name: "Nina Ricci",
        brand: "Nina Ricci",
        price: "41000",
        gender: "Female",
        image: "/assets/images/perfumes/Nina Ricci.jpg",
        notes: ["Lemon", "Apple", "Praline"]
    },
    "Casamorati": {
        name: "Casamorati",
        brand: "Casamorati",
        price: "85000",
        gender: "Unisex",
        image: "/assets/images/perfumes/Casamorati.jpg",
        notes: ["Caramel", "Citrus", "White Musk"]
    },
    "Dolce & Gabbana": {
        name: "Dolce & Gabbana",
        brand: "Dolce & Gabbana",
        price: "46000",
        gender: "Female",
        image: "/assets/images/perfumes/Dolce Gabbana.jpg",
        notes: ["Bellflower", "Bamboo", "Jasmine"]
    },
    "Carolina Herrera": {
        name: "Carolina Herrera",
        brand: "Carolina Herrera",
        price: "53000",
        gender: "Female",
        image: "/assets/images/perfumes/Carolina Herrera.jpg",
        notes: ["Tuberose", "Jasmine", "Tonka Bean"]
    }
};

// Օգնական ֆունկցիա՝ ապրանքի վրա սեղմելիս մանրամասների էջ անցնելու համար
export function goToProduct(perfumeKey) {
    const perfume = perfumeDatabase[perfumeKey];
    if (perfume) {
        const queryString = encodeURIComponent(JSON.stringify(perfume));
        window.location.href = `product-details.html?data=${queryString}`;
    }
}

// export const perfumeDatabase = {
//     "Prada": {
//         name: "Prada",
//         brand: "Prada",
//         price: "45000",
//         gender: "Female",
//         image: "/assets/images/perfumes/Prada.jpg",
//         notes: ["Iris", "Patchouli", "Bergamot"]
//     },
//     "Ajmal": {
//         name: "Ajmal",
//         brand: "Ajmal",
//         price: "52000",
//         gender: "Unisex",
//         image: "/assets/images/perfumes/AJMAL.png",
//         notes: ["Amber", "Rose", "Musk"]
//     },
//     "Lancome": {
//         name: "Idôle Eau De Parfum",
//         brand: "Lancome",
//         price: "37500",
//         gender: "Female",
//         image: "/assets/images/perfumes/Lancome.jpg",
//         notes: ["Rose", "Jasmine", "White Musk"]
//     },
//     "Bvlgari": {
//         name: "Bvlgari",
//         brand: "Bvlgari",
//         price: "48000",
//         gender: "Unisex",
//         image: "/assets/images/perfumes/Bvlgari.jpg",
//         notes: ["Tea", "Amber", "Musk"]
//     }
// };