import { expect } from "chai";
import { addCardToCollection, Card, Color, LineType, Rarity, modifyCardToCollection, deleteCardToCollection } from "../src/index.js";



describe("Conjuntos de pruebas para manipulacion de promesas de cartas magic", () => {
  it ("addCardToCollection deberia no poder añadir una carta ya que la carta ya existe", () => {
    return addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).catch((result) => {
      expect(result).to.be.equal("La carta ya existe en la colección.");

    });
  });
  it ("deleteCardToCollection deberia no poder eliminar una carta ya que la carta no existe", () => {
    return deleteCardToCollection("edusegre",  new Card(8, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).catch((result) => {
      expect(result).to.be.equal("La carta no existe en la colección.");

    });
   });
  it ("addCardToCollection deberia añadir una carta correctamente", () => {
    return addCardToCollection("edusegre",  new Card(8, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).then((result) => {
      expect(result).to.be.equal("Éxito al cargar la carta");

    });
  });
  it ("deleteCardToCollection deberia no poder eliminar una carta ya que la carta no existe", () => {
    return deleteCardToCollection("edusegre",  new Card(777, 'White Panther', 70, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).catch((result) => {
      expect(result).to.be.equal("La carta no existe en la colección.");

    });
  });
  it ("modifyCardToCollection deberia no poder modificar una carta ya que la carta no existe", () => {
    return modifyCardToCollection("edusegre",  new Card(777, 'White Panther', 70, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).catch((result) => {
      expect(result).to.be.equal("La carta no existe en la colección de edusegre.");

    });
  });
  it ("modifyCardToCollection deberia  poder modificar una carta correctamente", () => {
    return modifyCardToCollection("edusegre",  new Card(8, 'White Panther', 70, Color.White, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 )).catch((result) => {
      expect(result).to.be.equal("La carta no existe en la colección de edusegre.");

    });
  
  });

});
