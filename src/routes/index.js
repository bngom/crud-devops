module.exports = app => {
  
    const items = require("../controllers");
  
    var router = require("express").Router();

    router.post("/", items.createItem);
  
    router.get("/", items.getAllItem);
  
    router.get("/", items.getAllCheckedItem);

    router.get("/:id", items.getOneItem);

    router.put("/:id", items.updateItem);

    router.delete("/:id", items.deleteOneItem);

    router.delete("/", items.deleteAllItems);
    
    app.use("/api/item", router);
  };