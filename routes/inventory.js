const express = require("express");
const router = express.Router();

// Require controller modules.
const pet_controller = require("../controllers/petController");
const category_controller = require("../controllers/categoryController");

/// pet ROUTES ///

// GET home page.
router.get("/", category_controller.index);

// GET request for creating a pet. NOTE This must come before routes that display pet (uses id).
router.get("/pet/create", pet_controller.pet_create_get);

// POST request for creating pet.
router.post("/pet/create", pet_controller.pet_create_post);

// GET request to delete pet.
router.get("/pet/:id/delete", pet_controller.pet_delete_get);

// POST request to delete pet.
router.post("/pet/:id/delete", pet_controller.pet_delete_post);

// GET request to update pet.
router.get("/pet/:id/update", pet_controller.pet_update_get);

// POST request to update pet.
router.post("/pet/:id/update", pet_controller.pet_update_post);

// GET request for one pet.
router.get("/pet/:id", pet_controller.pet_detail);

// GET request for list of all pet items.
router.get("/pets", pet_controller.pet_list);

/// category ROUTES ///

// GET request for creating category.
router.get("/category/create", category_controller.category_create_get);

// POST request for creating category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for category details.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all categorys.
router.get("/categories", category_controller.category_list);

module.exports = router;