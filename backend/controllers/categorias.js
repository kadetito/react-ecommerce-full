const { response } = require("express");

const Categoria = require("../models/categoria");

const getCategorias = async (req, res = response) => {
  const categorias = await Categoria.find().populate("usuario", "nombre url");

  res.json({
    ok: true,
    categorias,
  });
};

const crearCategoria = async (req, res = response) => {
  const uid = req.uid;
  const categoria = new Categoria({
    usuario: uid,
    ...req.body,
  });
  console.log(categoria);
  try {
    const categoriaDB = await categoria.save();
    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarCategoria = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({
        ok: true,
        msg: "Categoria no encontrada por id",
      });
    }

    const cambiosCategoria = {
      ...req.body,
      usuario: uid,
    };

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      cambiosCategoria,
      { new: true }
    );

    res.json({
      ok: true,
      categoria: categoriaActualizada,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarCategoria = async (req, res = response) => {
  const id = req.params.id;

  try {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({
        ok: true,
        msg: "Categoria no encontrada por id",
      });
    }

    await Categoria.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Categoria eliminada",
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
  getCategorias,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
