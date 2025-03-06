import { db } from "../models/index.js";
async function initDB() {
    try {
        await db.connectDB();

        await db.models.Product.bulkCreate([
            { name: "Ordinateur Portable", reference: "PC-001", description: "Laptop performant avec 16Go RAM et 512Go SSD.", price: 1200.00, category: "Informatique" },
            { name: "Souris sans fil", reference: "MOUSE-100", description: "Souris ergonomique avec capteur haute précision.", price: 35.99, category: "Accessoires" },
            { name: "Clavier Mécanique", reference: "KEYB-200", description: "Clavier gaming RGB avec switchs mécaniques.", price: 89.50, category: "Accessoires" },
            { name: "Écran 27 pouces", reference: "SCREEN-27", description: "Écran Full HD 144Hz pour une expérience fluide.", price: 249.99, category: "Écrans" },
            { name: "Disque SSD 1To", reference: "SSD-1TB", description: "Stockage rapide NVMe 1To pour performances optimales.", price: 129.99, category: "Stockage" },
            { name: "Casque Audio", reference: "HEADPH-500", description: "Casque Bluetooth avec réduction de bruit.", price: 199.99, category: "Audio" },
            { name: "Webcam HD", reference: "WEBCAM-720", description: "Webcam 1080p avec autofocus et micro intégré.", price: 59.99, category: "Accessoires" },
            { name: "Chargeur USB-C", reference: "CHARG-USB-C", description: "Chargeur rapide 65W compatible USB-C.", price: 39.99, category: "Énergie" },
            { name: "Batterie Externe 20 000mAh", reference: "BAT-20K", description: "Batterie externe haute capacité avec charge rapide.", price: 49.99, category: "Énergie" },
            { name: "Imprimante Laser", reference: "PRINT-1000", description: "Imprimante laser noir et blanc avec WiFi.", price: 299.99, category: "Imprimantes" }
        ], { validate: true });
        

    } catch (error) {
        console.error("Error initializing DB:", error);
    }
}
await initDB();