export const ingredients = [
    { name: 'Arroz Redondo', baseAmount: 100, unit: 'g', icon: 'Bean' }, // 100g per person (Standard)
    { name: 'Carne magra', baseAmount: 150, unit: 'g', icon: 'Ham' },
    { name: 'Pimiento Rojo', baseAmount: 60, unit: 'g', icon: 'Torus' }, // 1/4 per person roughly
    { name: 'Tomates maduros', baseAmount: 60, unit: 'g', icon: 'Apple' },
    { name: 'Aceite oliva virgen', baseAmount: 25, unit: 'ml', icon: 'Sprout' },
    { name: 'Agua', baseAmount: 400, unit: 'ml', icon: 'GlassWater' },
    { name: 'Sal', baseAmount: 5, unit: 'g', icon: 'Popcorn' },
    { name: 'Colorante', baseAmount: 0.1, unit: 'g', icon: 'Leaf' },
];

export const steps = [
    { id: 1, title: 'Preparar ingredientes', duration: 240, description: 'Lavar y cortar los pimientos en tiras anchas, lavar y rallar los tomates.' },
    { id: 2, title: 'Freír Pimientos', duration: 360, description: 'Poner la sartén a fuego medio, echar todo el aceite y los pimientos. Freírlos por ambos lados.' },
    { id: 3, title: 'Freír Carne', duration: 300, description: 'Sacar los pimientos, echar la carne y freír moviendo de vez en cuando.' },
    { id: 4, title: 'Freír Tomate', duration: 360, description: 'Mover la carne hacia los lados, dejando un hueco en el centro de la sartén; ahí echar el tomate rallado. Mover de vez en cuando hasta que se fría el tomate.' },
    { id: 5, title: 'Añadir Agua', duration: 180, description: 'Echar toda el agua y subir el fuego hasta que hierva.' },
    { id: 6, title: 'Hervir carne', duration: 1200, description: 'Bajar el fuego, manteniendo el hervor.' },
    { id: 7, title: 'Añadir Arroz', duration: 420, description: 'Subir el fuego, echar el arroz repartido por toda la sartén; no moverlo nunca. Echar la sal y el colorante.' },
    { id: 8, title: 'Añadir Pimientos', duration: 480, description: 'Bajar el fuego (pero que continúe hirviendo) y repartir los pimientos por encima.' },
    { id: 9, title: 'Reposo', duration: 300, description: 'Retirar del fuego y tapar con un trapo o cartón para dejar reposar.' },
];
