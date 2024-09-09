const Tag = require('../models/Tags');

// Crear un nuevo tag
exports.createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el tag', error });
  }
};

// Obtener todos los tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tags', error });
  }
};

// Obtener un tag por ID
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tag', error });
  }
};

// Actualizar un tag
exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el tag', error });
  }
};

// Eliminar un tag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado' });
    }
    res.status(200).json({ message: 'Tag eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tag', error });
  }
};
