const { response } = require("express");

const Addresses = require("../models/address");

const getDirecciones = async (req, res = response) => {
  const usuario = req.params.usuario;
  const { page = 1, limit = 10 } = req.query;

  try {
    const direcciones = await Addresses.find({ usuario })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Addresses.countDocuments();

    res.json({
      ok: true,
      direcciones,

      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearDireccion = async (req, res = response) => {
  const uid = req.uid;
  const address = new Addresses({
    usuario: uid,
    ...req.body,
  });
  try {
    const addressDB = await address.save();
    res.json({
      ok: true,
      address: addressDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarDireccion = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const address = await Addresses.findById(id);

    if (!address) {
      return res.status(404).json({
        ok: true,
        msg: "Addresses no encontrado por id",
      });
    }

    const cambiosArticulo = {
      ...req.body,
      usuario: uid,
    };

    const addressActualizado = await Addresses.findByIdAndUpdate(
      id,
      cambiosArticulo,
      { new: true }
    );

    res.json({
      ok: true,
      address: addressActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarDireccion = async (req, res = response) => {
  const id = req.params.id;

  try {
    const address = await Addresses.findById(id);

    if (!address) {
      return res.status(404).json({
        ok: true,
        msg: "Addresses no encontrado por id",
      });
    }

    await Addresses.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Addresses borrado",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getDirecciones,
  crearDireccion,
  actualizarDireccion,
  borrarDireccion,
};
