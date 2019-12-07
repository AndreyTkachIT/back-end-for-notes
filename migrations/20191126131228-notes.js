const updateCollection = async db => {
  await db.command({
    collMod: "notes",
    validator: {
      $and: [
        { _id: { $type: "binData" } },
        { title: { $type: "string" } },
        { date: { $type: "date" } }
      ]
    },
    validationAction: "error",
    validationLevel: "strict"
  });
};

module.exports = {
  async up(db, client) {
    try {
      await updateCollection(db);
    } catch (err) {
      throw err;
    }
  },

  async down(db, client) {
    try {
      console.log("For revert changes please use backup created before");
    } catch (err) {
      throw err;
    }
  }
};
