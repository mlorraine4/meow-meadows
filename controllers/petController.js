const Pet = require("../models/pet");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { unEscape } = require("./unescape");

// Display list of all pets.
exports.pet_list = asyncHandler(async (req, res, next) => {
  const pets = await Pet.find({}).populate("category").exec();
  // TODO: find a better way to unescape sanitized data
  pets.forEach((pet) => {
    pet.name = unEscape(pet.name);
    pet.category = unEscape(pet.description);
    pet.color = unEscape(pet.description);
    pet.age = unEscape(pet.description);
    pet.breed = unEscape(pet.description);
    pet.gender = unEscape(pet.description);
    pet.description = unEscape(pet.description);
    pet.photo_url = unEscape(pet.photo_url);
  });

  res.render("pet_list", {
    title: "Meow Meadows",
    pets: pets,
  });
});

// Display detail page for a specific pet.
exports.pet_detail = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id).exec();
  // TODO: find a better way to unescape sanitized data
  pet.name = unEscape(pet.name);
  pet.color = unEscape(pet.color);
  pet.age = unEscape(pet.age);
  pet.breed = unEscape(pet.breed);
  pet.gender = unEscape(pet.gender);
  pet.description = unEscape(pet.description);
  pet.photo_url = unEscape(pet.photo_url);

  res.render("pet_detail", {
    title: "Meow Meadows",
    pet: pet,
  });
});

// Display pet create form on GET.
exports.pet_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();

    res.render("pet_form", {
      title: "Create Pet",
      categories: categories,
    });
});

// Handle Category create on POST.
exports.pet_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("category.*").escape(),
  body("color", "Color must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("age", "Age must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("breed", "Breed must not be empty").trim().isLength({ min: 1 }).escape(),
  body("gender", "Gender must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("adoption_fee", "Adoption fee must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("photo_url", "Photo url must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const categories = await Category.find().exec();

    // Create object with escaped and trimmed data
    const pet = new Pet({
      name: req.body.name,
      category: req.body.category,
      color: req.body.color,
      age: req.body.age,
      breed: req.body.breed,
      gender: req.body.gender,
      adoption_fee: req.body.adoption_fee,
      description: req.body.description,
      photo_url: req.body.photo_url,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("pet_form", {
        title: "Create Pet",
        pet: pet,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {
      await pet.save();
      res.redirect(pet.url);
    }
  }),
];

// Display pet delete form on GET.
// exports.pet_delete_get = asyncHandler(async (req, res, next) => {
//   const pet = await Pet.findById(req.params.id).exec();

//   res.render("pet_delete", {
//     title: "Delete",
//     pet: pet,
//   });
// });

exports.pet_delete_get = asyncHandler(async (req, res, next) => {
  res.render("auth_form", {
    title: "Edit Data",
  });
});

// Handle pet delete on POST.
exports.pet_delete_post = asyncHandler(async (req, res, next) => {
  await Pet.findByIdAndRemove(req.body.petid);
  res.redirect("/inventory/pets");
});

// Display pet update form on GET.
// exports.pet_update_get = asyncHandler(async (req, res, next) => {
//   // Get book, authors and genres for form.
//   const [pet, categories] = await Promise.all([
//     Pet.findById(req.params.id).populate("category").exec(),
//     Category.find().exec(),
//   ]);

//   if (pet === null) {
//     // No results.
//     const err = new Error("Pet not found");
//     err.status = 404;
//     return next(err);
//   }

//   for (const category of categories) {
//     if (category._id.toString() === pet.category._id.toString()) {
//       category.checked = "true";
//     }
//   }

//   res.render("pet_form", {
//     title: "Update Pet",
//     pet: pet,
//     categories: categories,
//   });
// });

exports.pet_update_get = asyncHandler(async (req, res, next) => {
  res.render("auth_form", {
    title: "Edit Data",
  });
});

// Handle pet update on POST.
exports.pet_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("category.*").escape(),
  body("color", "Color must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("age", "Age must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("breed", "Breed must not be empty").trim().isLength({ min: 1 }).escape(),
  body("gender", "Gender must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("adoption_fee", "Adoption fee must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("photo_url", "Photo url must not be empty")
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const categories = await Category.find().exec();

    // Create object with escaped and trimmed data
    const pet = new Pet({
      name: req.body.name,
      category: req.body.category,
      color: req.body.color,
      age: req.body.age,
      breed: req.body.breed,
      gender: req.body.gender,
      adoption_fee: req.body.adoption_fee,
      description: req.body.description,
      photo_url: req.body.photo_url,
      _id: req.params.id,
    });

    for (const category of categories) {
      if (category._id.toString() === pet.category._id.toString()) {
        category.checked = "true";
      }
    }

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("pet_form", {
        title: "Create Pet",
        pet: pet,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedPet = await Pet.findByIdAndUpdate(req.params.id, pet, {});
      res.redirect(updatedPet.url);
    }
  }),
];
