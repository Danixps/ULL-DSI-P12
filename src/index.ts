
import chalk from 'chalk';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { promises as fs } from 'fs';

/**
 * Descripcion: Enumerado de rarezas de cartas
 */
export enum Rarity {
    Common = 'común',
    Uncommon = 'infrecuente',
    Rare = 'rara',
    Mythic = 'mítica'
}

/**
 * Descripcion: Enumerado de colores de cartas
 */
export enum Color {
    White = 'blanco',
    Blue = 'azul',
    Black = 'negro',
    Red = 'rojo',
    Green = 'verde',
    Colorless = 'incoloro',
    Multicolor = 'multicolor'
}

/**
 * Descripcion: Enumerado de linea de tipos
 */
export enum LineType {
    Tierra = 'tierra',
    Criatura = 'criatura',
    Encantamiento = 'encantamiento',
    Conjuro = 'conjuro',
    Instantaneo = 'instantaneo',
    Artefacto = 'artefacto',
    Planeswalker = 'planeswalker'
}

/**
 * Descripcion: La interfaz card_characteristics representa los aributos de las cartas
 */
export interface Card_Characteristics {
    id: number,
    color: Color,
    type: LineType,
    rarity: Rarity,
    rulesText: string,
    marketValue: number,
    powerandtoughness?: [number, number],
    loyalty?: number,
}

/**
 * Descripción: Clase carta que implementas las caracteristicas de una carta
 */
export class Card implements Card_Characteristics {
    id: number;
    name: string;
    manaCost: number;
    color: Color;
    type: LineType;
    rarity: Rarity;
    rulesText: string;
    marketValue: number;
    powerandtoughness?: [number, number];
    loyalty?: number;

    /**
     * Crea una instancia de la clase Card.
     * @param id - El ID de la carta.
     * @param name - El nombre de la carta.
     * @param manaCost - El costo de maná de la carta.
     * @param color - El color de la carta.
     * @param type - El tipo de la carta.
     * @param rarity - La rareza de la carta.
     * @param rulesText - El texto de las reglas de la carta.
     * @param marketValue - El valor de mercado de la carta.
     * @param powerandtoughness - La fuerza y resistencia de la carta (solo para criaturas).
     * @param loyalty - La lealtad de la carta (solo para planeswalkers).
     */
    constructor(id: number, name: string, manaCost: number, color: Color, type: LineType, rarity: Rarity, rulesText: string, marketValue: number, powerandtoughness?: [number, number], loyalty?: number) {
        this.id = id;
        this.name = name;
        this.manaCost = manaCost;
        this.color = color;
        this.type = type;
        this.rarity = rarity;
        this.rulesText = rulesText;
        this.marketValue = marketValue;
        this.powerandtoughness = powerandtoughness;
        this.loyalty = loyalty;
    }
}
type Data = string;

//ADDCARD
/**
 * Descripcion: Añade la carta de la collection de forma asyncrona
 * @param user usuario propietario de la carta
 * @param card carta a manipular
 * @return promise devuelve una promesa que será un string dpendiendo si ha sido devuleta con resolve o reject
 */

export function addCardToCollection(user: string,  card: Card): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const filePath = `./collections/${user}/${card.id}.json`;
        fs.access(filePath, fs.constants.F_OK).then(() => {
                // La carta ya existe, emitir un mensaje de error
                reject("La carta ya existe en la colección.");
            })
            .catch(() => {
                // La carta no existe, proceder a escribir el archivo JSON
                fs.writeFile(filePath, JSON.stringify(card)).catch(() => {
                        //crear la carpeta si no existe
                        fs.mkdir(`./collections/${user}`, { recursive: true }).catch(() => {
                   
                                reject('Error al crear la carpeta del usuario'); // Error al crear la carpeta del usuario
                            })
                            .then(() => {
                                fs.writeFile(filePath, JSON.stringify(card)).catch(() => {
                                    
                                        reject('Error al cargar la carta'); // Error al añadir la carta
                                    })
                                    .then(() => {
                                        resolve('Éxito al cargar la carta'); // Éxito al añadir la carta
                                    });
                                });
                            }).then(() => {
                        resolve('Éxito al cargar la carta'); // Éxito al añadir la carta
                    });
                });
            });
        }


//DELETE CARD
/**
 * Descripcion: Elimia la carta de la collection de forma asyncrona
 * @param user usuario propietario de la carta
 * @param card carta a manipular
 * @return Promise donde manejo los datos segun son han sido devueltos como reject o resolve
 */
export function deleteCardToCollection(user: string,  card: Card): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const filePath = `./collections/${user}/${card.id}.json`;
        fs.access(filePath, fs.constants.F_OK).then(() => {
                // si la carta ya existe a elimina el archivo
                fs.unlink(filePath).catch(() => {
        
                        reject('Error al eliminar la carta'); // error al eliminar el archivo
                    })
                    .then(() => { {
                        resolve('Éxito al eliminar la carta'); // éxito al eliminar la carta
                    }
                });
            // si la carta no existe, emitir un mensaje de error
            })
            .catch(() => {
                reject("La carta no existe en la colección.");
            });
        });
}


//MODIFY CARD
/**
 * Descripcion: Modifica la carta de la collection de forma asyncrona
 * @param user usuario propietario de la carta
 * @param card carta a manipular
 * @return promise que devuelve un sring segun ha sdio devuelto con un resolve o
 */


export function modifyCardToCollection(user: string,  card: Card): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const filePath = `./collections/${user}/${card.id}.json`;
        fs.access(filePath, fs.constants.F_OK ).then(() => {

                // si en el json de la carta se puede escribir 
                fs.writeFile(filePath, (JSON.stringify(card)))
                .then(() => {
                    resolve('Éxito al modificar la carta'); // éxito al eliminar la carta
                })
                .catch(() => {
                reject('Fallo al modificar la carta'); // éxito al eliminar la carta
                });


            })   
            .catch(() => {
                // en cambio si el archivo no se puede accedera, emitir un mensaje de error
                reject("La carta no existe en la colección de " + user + ".");
            });
        });
}



addCardToCollection("edusegre", new Card(777, 'White Panther', 70, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ))
.catch((message) => {
    console.log(chalk.green(message)); // Mensaje de éxito
});


// addCardToCollection("edusegre", new Card(778, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ))
//     .then((message) => {
//         //poner color con chalks
//         console.log(chalk.green(message)); // Mensaje de éxito
//         modifyCardToCollection("edusegre", new Card(778, 'White Panther', 70, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ))
//             .then((message) => {
//                 //poner color con chalks
//                 console.log(chalk.green(message)); // Mensaje de éxito
//                 deleteCardToCollection("edusegre", new Card(778, 'Black Panther', 70, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ))
//                     .then((message) => {
//                         //poner color con chalks
//                         console.log(chalk.green(message)); // Mensaje de éxito
//                     })
//                     .catch((error) => {
//                         console.error(chalk.red(error)); // Mensaje de error
//                     });
//             })
//             .catch((error) => {
//                 console.error(chalk.red(error)); // Mensaje de error
            
//             });

//     })
//     .catch((error) => {
//         console.error(chalk.red(error)); // Mensaje de error
//     });
