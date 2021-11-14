const { response } = require("express");

const Articulo = require("../models/articulo");

const getArticulos = async (req, res = response) => {
  const articulos = await Articulo.find()
    .populate("usuario", "nombre img")
    .populate("categoria", "nombre img");

  res.json({
    ok: true,
    articulos,
  });
};

const crearArticulo = async (req, res = response) => {
  const uid = req.uid;
  const articulo = new Articulo({
    usuario: uid,
    ...req.body,
  });

  try {
    console.log("OCA");
    const articuloDB = await articulo.save();

    res.json({
      ok: true,
      articulo: articuloDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarArticulo = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const articulo = await Articulo.findById(id);

    if (!articulo) {
      return res.status(404).json({
        ok: true,
        msg: "Articulo no encontrado por id",
      });
    }

    const cambiosArticulo = {
      ...req.body,
      usuario: uid,
    };

    const articuloActualizado = await Articulo.findByIdAndUpdate(
      id,
      cambiosArticulo,
      { new: true }
    );

    res.json({
      ok: true,
      articulo: articuloActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarArticulo = async (req, res = response) => {
  const id = req.params.id;

  try {
    const articulo = await Articulo.findById(id);

    if (!articulo) {
      return res.status(404).json({
        ok: true,
        msg: "Articulo no encontrado por id",
      });
    }

    await Articulo.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Articulo borrado",
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
  getArticulos,
  crearArticulo,
  actualizarArticulo,
  borrarArticulo,
};
