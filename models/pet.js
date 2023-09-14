const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  color: { type: String, required: true, maxLength: 20 },
  age: { type: String, required: true, maxLength: 100 },
  breed: { type: String, required: true, maxLength: 100 },
  gender: { type: String, required: true, maxLength: 6 },
  adoption_fee: { type: Number, required: true },
  description: { type: String, required: true, maxLength: 2000 },
  photo_url: { type: String, required: true },
});
 
// Virtual for author's URL
PetSchema.virtual("url").get(function () {
  return `/inventory/pet/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pet", PetSchema);
