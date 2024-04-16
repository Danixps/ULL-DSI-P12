import { expect } from "chai";
import { addCardToCollection, deleteCardToCollection, Card, Color, LineType, Rarity, modifyCardToCollection } from "../src/index.js";



describe("Conjuntos de pruebas para manipulacion de cartas magic", () => {
  it ("deleteCardToCollection deberia delete a card", (done) => {
    deleteCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        expect(data).to.be.equal("Éxito al eliminar la carta");
        done();
      }
    });
  });
  it("addCardToCollection debería eliminar una carta con éxito", (done) => {
    addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        expect(data).to.be.equal("Éxito al cargar la carta");
        done();
      }
    });
  });
  it("addCardToCollection debería eliminar una carta con error de que la carta ya existe", (done) => {

    addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (error) {
        expect(error.message).to.be.equal("La carta ya existe en la colección.");
        expect(data).to.be.equal(undefined);
        done();
      }
    });
  });
  it ("deleteCardToCollection debería eliminar una carta con éxito", (done) => {
    deleteCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        expect(data).to.be.equal("Éxito al eliminar la carta");
        done();
      }
    });
  });
  it ("modifyCardToCollection deberia modificar la carta con éxito", (done) => {
    modifyCardToCollection("edusegre",  new Card(1, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        expect(data).to.be.equal("Éxito al modificar la carta de edusegre");
        done();
      }
    });
  });
  it ("modifyCardToCollection deberia modificar la carta con error de que la carta no existe", (done) => {
    modifyCardToCollection("edusegre",  new Card(9, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error, data) => {
      if (error) {
        expect(error).to.be.eql(new Error('La carta no existe en la colección de edusegre.'));
        expect(data).to.be.eql(undefined);
        done();
      }
    });
  });

});
