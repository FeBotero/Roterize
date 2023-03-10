const service = require("./delivery.service");
const { isObjectIdValid } = require("../db/database.helper");

//Controller trabalha com as requisições e respostas

async function findAll(req, res) {
  const delivery = await service.findAllDelivery();
  res.send(delivery);
}
async function findById(req, res) {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(404).json({ message: "ID inválido!" });
  }
  const delivery = await service.findByIdDeveliry(id);
  if (!delivery) {
    return res.status(404).json({ message: "Entrega não encontrada!" });
  }
  res.json(delivery);
}
async function create(req, res) {
  const delivery = req.body;

  if (
    !delivery ||
    !delivery.client ||
    !delivery.deliveryList ||
    !delivery.descriptionDelivery
  ) {
    return res.status(404).json({ message: "Dados inválidos." });
  }

  await service.createDelivery(delivery);

  res.status(200).json({ message: "Entrega cadastrada com sucesso!" });
}
async function updateById(req, res) {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(404).json({ message: "ID inválido!" });
  }
  const delivery = req.body;

  if (
    !delivery ||
    !delivery.client ||
    !delivery.deliveryList ||
    !delivery.descriptionDelivery
  ) {
    return res.status(404).json({ message: "Dados inválidos." });
  }

  await service.updateDelivery(id, delivery);

  res.status(200).json({ message: "Entrega atualizada com sucesso!" });
}
async function deleteById(req, res) {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(404).json({ message: "ID inválido!" });
  }
  await service.deleteByIdDelivery(id);

  res.status(200).json({ message: "Entrega excluída com sucesso!" });
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
