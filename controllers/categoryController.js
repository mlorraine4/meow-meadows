const Category = require("../models/category");
const Pet = require("../models/pet");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Home page.
exports.index = asyncHandler(async (req, res, next) => {
  const [pets, categories] = await Promise.all([
    Pet.find({}).populate("category").exec(),
    Category.find({}).exec(),
  ]);

  res.render("index", {
    title: "Meow Meadows",
    pets: pets,
    categories: categories,
  });
});

// Display list of all categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  const [pets, categories] = await Promise.all([
    Pet.find({}).populate("category").exec(),
    Category.find({}).exec(),
  ]);

  res.render("category_list", {
    title: "Meow Meadows",
    pets: pets,
    categories: categories,
  });
});

// Display list of all categories.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, pets] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Pet.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Meow Meadows",
    pets: pets,
    category: category,
  });
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name of category must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create object with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete GET");
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete POST");
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update GET");
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update POST");
});
