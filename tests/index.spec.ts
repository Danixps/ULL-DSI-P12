import { expect } from "chai";
import { addCardToCollection, deleteCardToCollection, Card, Color, LineType, Rarity, modifyCardToCollection } from "../src/index.js";



describe("Conjuntos de pruebas para manipulacion de cartas magic", () => {
  it ("deleteCardToCollection deberia delete a card", () => {
    return addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).catch((result) => {
      expect(result).to.be.equal("La carta ya existe en la colección.");

    });
  });
});
