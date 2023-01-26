module.exports = {
  lang: (language, code, callback = () => {}) => {
    const info = {
      en: {
        successfully: "Successfully",
        uploaded: "Uploaded",
        bulk: "Bulk",
        deleted: "Deleted",
        user: "User",
        created: "Created",
        updated: "Updated",
        notFound: "Not found",
        deleted: "deleted",
        activity: "Activity",
        title: "Title",
        description: "Description",
      },
      es: {
        successfully: "Exitosamente",
        uploaded: "Subido",
        bulk: "Masivo",
        deleted: "Eliminado",
        user: "Usuario",
        created: "Creado",
        updated: "Actualizado",
        notFound: "No encontrado",
        deleted: "Eliminado",
        activity: "Actividad",
        title: "Titulo",
        description: "Descripción",
      },
    };
    return info[language][code];
  },
};
