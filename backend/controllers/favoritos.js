const { response } = require("express");

const Favorito = require("../models/favorito");
const Categoria = require("../models/categoria");

const getFavoritos = async (req, res = response) => {
  const { page, limit, sort } = req.query;
  let mysort = { sort: -1 };
  console.log(page, limit, sort);
  try {
    const articulos = await Favorito.find()
      .sort(mysort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Favorito.countDocuments();

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

const getFavoritosById = async (req, res = response) => {
  const url = req.params.url;

  const { page, limit, sort } = req.query;
  let mysort = { sort: -1 };

  try {
    const categoriaDB = await Categoria.find({ url });

    const articulos = await Favorito.find({ categoria: categoriaDB })
      .sort(mysort)
      .limit(limit * 1)
      .skip((page - 0) * limit)
      .exec();

    const count = await Favorito.countDocuments();

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

const getFavoritoById = async (req, res = response) => {
  const url = req.params.url;

  try {
    const favorito = await Favorito.findOne({ url });

    res.json({
      ok: true,
      favorito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getFavorito = async (req, res = response) => {
  const user = req.params.user;
  const articulo = req.params.articulo;
  const favorito = new Favorito({
    user,
    articulo,
  });
  console.log("favorito", user);
  try {
    res.json({
      ok: true,
      favorito,
      msg: "es favorito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearFavoritos = async (req, res = response) => {
  const user = req.param.user;
  const articulo = req.param.articulo;

  console.log(user, articulo);
  const favorito = new Favorito({
    user,
    articulo,
  });
  try {
    const favoritoDB = await favorito.save();
    res.json({
      ok: true,
      favorito: favoritoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarFavoritos = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const favorito = await Favorito.findById(id);

    if (!favorito) {
      return res.status(404).json({
        ok: true,
        msg: "Favorito no encontrado por id",
      });
    }

    const cambiosArticulo = {
      ...req.body,
      usuario: uid,
    };

    const articuloActualizado = await Favorito.findByIdAndUpdate(
      id,
      cambiosArticulo,
      { new: true }
    );

    res.json({
      ok: true,
      favorito: articuloActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarFavoritos = async (req, res = response) => {
  const id = req.params.id;

  try {
    const favorito = await Favorito.findById(id);
    if (!favorito) {
      return res.status(404).json({
        ok: true,
        msg: "Favorito no encontrado por id",
      });
    }

    await Favorito.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Favorito borrado",
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
  getFavoritos,
  getFavoritosById,
  crearFavoritos,
  actualizarFavoritos,
  borrarFavoritos,
  getFavoritoById,
  getFavorito,
};
