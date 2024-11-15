const producModel = require("../models/products.model");

exports.getProducts = async (req, res) => {
  try {
    let dataProducts = await producModel.find();
    res.status(200).json(dataProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ha ocurrido algo comunicate con el admin" });
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    if (id.length == 24) {
      let product = await producModel.findOne({ _id: id });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).send({ error: "No se encuentra ningun producto" });
      }
    } else {
      res.send({ error: "Id incorrecto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ha ocurrido algo comunicate con el admin" });
  }
};
exports.addProduct = async (req, res) => {
  try {
    let product = req.body;
    let serie = product.serie;
    let bucarProducto = await producModel.findOne({ serie: serie });

    if (!bucarProducto) {
      let newProduct = new producModel(product);
      await newProduct.save();
      res.status(201).json(newProduct);
    } else {
      res.status(400).send({ error: "No se puede crear 2 productos con iguales" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ha ocurrido algo comunicate con el admin" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    if (id.length == 24) {
      let product = await producModel.findById(id)
      if (product) {
        let deleteProduct = await producModel.findOneAndDelete({ _id: id })
        res.status(200).json(deleteProduct);
      } else {
        res.status(400).send({ error: "No se encuentra ningun producto" })
      }
    } else {
      res.status(400).send({ error: "Id incorrecto" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Ha ocurrido algo comunicate con el admin" })
  }
}
exports.updateProduct = async (req, res) => {
  try {
    let id = req.params.id
    let update = req.body
    if (id.length == 24) {
      let product = await producModel.findById(id)
      if (product) {
              Object.assign(product, update)
              let updateProduct = await producModel.updateOne({ _id: id }, product)
              res.status(200).json(updateProduct)
      } else {
        res.status(400).send({ error: "No se encuentra ningun producto" })
      }
    } else {
        res.status(400).send({error: "Id incorrecto"})
    }
    // product.nombre =  req.body.nombnre
    // product.precio = update.precio
    // product.disponible = update.disponible
    // product.descripcion = "No tiene informacion asociada"

    // const {nombre, precio, disponible} = update
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Ha ocurrido algo comunicate con el admin" })
  }
}
