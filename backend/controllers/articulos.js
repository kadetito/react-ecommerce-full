const { response } = require("express");

const Articulo = require("../models/articulo");
const Categoria = require("../models/categoria");

const getArticulos = async (req, res = response) => {
  const { page, limit, sort } = req.query;
  let mysort = { sort: -1 };
  console.log(page, limit, sort);
  try {
    const articulos = await Articulo.find()
      .sort(mysort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Articulo.countDocuments();

    res.json({
      ok: true,
      articulos,
      count: count,
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

const countArticulos = async (req, res = response) => {
  const url = req.params.url;

  try {
    const categoriaDB = await Categoria.find({ url });
    const count = await Articulo.countDocuments();
    res.json({
      ok: true,
      total: Math.ceil(count),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getArticulosById = async (req, res = response) => {
  const url = req.params.url;

  const { page, limit, sort } = req.query;
  let mysort = { sort: -1 };

  try {
    const categoriaDB = await Categoria.find({ url });

    const articulos = await Articulo.find({ categoria: categoriaDB })
      .sort(mysort)
      .limit(limit * 1)
      .skip((page - 0) * limit)
      .exec();

    const count = await Articulo.countDocuments();

    res.json({
      ok: true,
      articulos,
      count: count,
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

const getArticuloById = async (req, res = response) => {
  const url = req.params.url;

  try {
    const articulo = await Articulo.findOne({ url });

    res.json({
      ok: true,
      articulo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
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
  getArticulosById,
  crearArticulo,
  actualizarArticulo,
  borrarArticulo,
  countArticulos,
  getArticuloById,
};
