#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Pet = require("./models/pet");

const categories = [];
const pets = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createPets();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function petCreate(
  index,
  name,
  category,
  color,
  age,
  breed,
  gender,
  adoption_fee,
  description,
  is_available,
  photo_url
) {
  const petDetail = {
    name: name,
    category: category,
    color: color,
    age: age,
    breed: breed,
    gender: gender,
    adoption_fee: adoption_fee,
    description: description,
    is_available: is_available,
    photo_url: photo_url,
  };
  const pet = new Pet(petDetail);
  await pet.save();
  pets[index] = pet;
  console.log(`Added pet: ${name}`);
}

async function categoryCreate(index, name) {
  const categoryDetail = { name: name };
  const category = new Category(categoryDetail);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Cats"),
    categoryCreate(1, "Dogs"),
    categoryCreate(2, "Bunnies"),
    categoryCreate(3, "Rats"),
  ]);
}

  async function createPets() {
    console.log("Adding items");
    await Promise.all([
      petCreate(
        0,
        "Twix",
        categories[0],
        "White, Gray",
        "6 months",
        "Domestic Shorthair",
        "Female",
        50,
        "Cali & Twix are a bonded pair that are ready to find their forever home together! Twix is a tabby brown and white boy who is a little sweetheart and will melt you immediately upon meeting him. Cali is a tabby girl who spent her early days on the streets and is therefore shy but still also a sweetheart once she gets to know you. These two single kittens have been fostered together and Twix quickly became Cali's ‘emotional support animal' as we like to call it. They love and adore each other and Cali looks to Twix for the courage to come out of her shell. Twix is comfortable around all new people and Cali looks to him for that extra incentive to meet humans who might otherwise scare her. Twix himself is suspected of having slight CH (cerebellar hypoplasia) which makes him the tiniest bit wobbly sometimes but he is able to live a normal kitten life and it does not slow him down in the least. Twix and Cali have been fostered in a home with other adult cats and small and large dogs so they would likely do just fine with either, however I would suggest they avoid homes with small children. They need older kids or adults with the patience to let them really get comfortable so they can shine in their new home. They should go to a home together since they are so bonded to each other at this point. They both have the cutest little meows and will purr up a storm, and they are both playful kittens who have stellar litter box manners and are cute as can be. Cali is ‘ear tipped' because she was spayed early on as a ‘community cat' but she wasn't meant to live that street life forever and is looking forward to spending the rest of her life indoors with her best friend Twix. I would love to introduce you to these two wonderful kittens, I can't wait for them to find the perfect home!",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/twixjpg.jpg?alt=media&token=7ca4dcbe-6c4a-4ad6-8a59-7e8238bb38bd"
      ),
      petCreate(
        1,
        "Cali",
        categories[0],
        "Gray",
        "6 months",
        "Domestic Shorthair",
        "Female",
        50,
        "Cali & Twix are a bonded pair that are ready to find their forever home together! Twix is a tabby brown and white boy who is a little sweetheart and will melt you immediately upon meeting him. Cali is a tabby girl who spent her early days on the streets and is therefore shy but still also a sweetheart once she gets to know you. These two single kittens have been fostered together and Twix quickly became Cali's ‘emotional support animal' as we like to call it. They love and adore each other and Cali looks to Twix for the courage to come out of her shell. Twix is comfortable around all new people and Cali looks to him for that extra incentive to meet humans who might otherwise scare her. Twix himself is suspected of having slight CH (cerebellar hypoplasia) which makes him the tiniest bit wobbly sometimes but he is able to live a normal kitten life and it does not slow him down in the least. Twix and Cali have been fostered in a home with other adult cats and small and large dogs so they would likely do just fine with either, however I would suggest they avoid homes with small children. They need older kids or adults with the patience to let them really get comfortable so they can shine in their new home. They should go to a home together since they are so bonded to each other at this point. They both have the cutest little meows and will purr up a storm, and they are both playful kittens who have stellar litter box manners and are cute as can be. Cali is ‘ear tipped' because she was spayed early on as a ‘community cat' but she wasn't meant to live that street life forever and is looking forward to spending the rest of her life indoors with her best friend Twix. I would love to introduce you to these two wonderful kittens, I can't wait for them to find the perfect home!",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/cali.jpg?alt=media&token=e8194caf-48e5-4b71-81a6-4a56f3692530"
      ),
      petCreate(
        2,
        "Baby Princess",
        categories[0],
        "Grey",
        "2 years",
        "Domestic Longhair",
        "Female",
        45,
        "Baby Princess is a tiny girl with fluffy soft grey fur and HUGE round eyes. She is a feisty, high energy kitty who loves playing as much as snuggling with her foster family. Princess's favorite place is on your lap or shoulders. Her spirit and strong will have helped Princess overcome many challenges, and her happy disposition impresses everyone. Baby Princess is a great little hunter who loves to carry toy mice around and chase balls. She also loves playing with and chasing her kitty buddy, Spooky. When they aren't playing, they are often cuddled up together for a nap. Princess is very well behaved with the 6 year old boy in her foster home and lets him pick her up and carry her around. Princess also did very well with the family's senior dog who recently passed away.",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/baby_princess.jpg?alt=media&token=a2c11bfa-7a32-46fe-88dc-81d94e515532"
      ),
      petCreate(
        3,
        "Honey Bear",
        categories[1],
        "Tan",
        "2 years",
        "Mixed",
        "Male",
        150,
        "Honey Bear is the perfect balance of mild playful energy and calm cuddles. He loves to sit and chew on a bone or a ball (he ALWAYS has a ball in his mouth) and even likes to carry a ball on his walks. He'd be a great work from home buddy, and loves to self entertain next to you while you work, lounge or talk. He loves to meet new people and would be great with kids. He's not much of a barker(we've never heard him bark at all!), he's just a lover who wants to be around you. His favorite pastimes include chewing on a tennis ball (cannot emphasize enough, he LOVES balls) doing “sit”, “shake” and a nose touch in exchange for cheese, cuddling up next to you on the couch, and being wiggly and weird!",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/honey_bear.jpg?alt=media&token=7c8de467-fdc9-4fc1-8d74-80f45f0576c3"
      ),
      petCreate(
        4,
        "Moe",
        categories[1],
        "Tan, White",
        "6 years",
        "Mixed",
        "Male",
        150,
        "Moe's foster family told us that he's an easy-going, silly, cuddle bug. Moe loves to take naps, go on walks, play with his squeaky toys, and eat treats! When out on his walks, Moe likes to say hi to everyone and can get a little disheartened when others don't stop to say hello. How could you ignore those baby blue eyes?",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/moe.jpg?alt=media&token=893e39a5-829b-4d49-8f82-59e62497bb9b"
      ),
      petCreate(
        5,
        "Wilbur",
        categories[1],
        "Tan",
        "3 years",
        "Mixed",
        "Male",
        100,
        "Wilbur is not your ordinary dog; although he has large, adorable ears, they are just for show! He has a full hearing impairment, but he is still able to communicate in his own special way. Wilbur is a lovable mix of brown and white fur with the cutest pink face that you won't be able to resist. Just like the famous Wilbur from Charlotte's Web, this adorable 5-year-old pup is looking for his own heartwarming tale of friendship and understanding. Wilbur dreams of finding a loving home where he can be appreciated for his unique and curious personality. He may not have a web of words like Charlotte, but he communicates his affection through gentle tail wags and warm, soulful eyes that will captivate you from the moment you meet.",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/wilbur.jpg?alt=media&token=3fcf974f-8572-4df3-9daa-af0213523f6b"
      ),
      petCreate(
        6,
        "Darth Hopper",
        categories[2],
        "Tan, Black",
        "6 months",
        "Other",
        "Male",
        80,
        "Darth Hopper is a shy but sweet boy and needs some time to warm up to family members before accepting affection. He enjoys the company of plushies and other house pets, and is treat-motivated, too especially when it comes to puzzle toys! This boy will do well in a patient home that doesn't mind his timid personality.",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/darth_hopper.png?alt=media&token=8f804cc2-1fb7-46e9-aaa2-fddd3d6232a6"
      ),
      petCreate(
        7,
        "Luau",
        categories[2],
        "Brown",
        "1 year",
        "Other",
        "Male",
        80,
        "Meet Luau! He's a sweet, shy rabbit who would love to hop around your home. While Luau is looking a little worse for wear right now with some stained fur and a minor bite wound on his face, we know once his face heals and his new fur grows in, he's going to be incredibly handsome. He's already so cute!",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/hopolina.jpg?alt=media&token=9157423c-953e-4070-af7e-6d472a62ca82"
      ),
      petCreate(
        8,
        "Sprout",
        categories[3],
        "White, Gray",
        "1 year",
        "Dumbo ears, standard coat",
        "Female",
        40,
        "I’m still getting to know Sprout, but she seems sweet. She likes to interact with the other two, although she is a bit clumsy with her bigger size. Her favorite activities include sleeping in the space pod, hoarding food, and running around on the open floor with her cage mates.",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/sprout.webp?alt=media&token=15dc4b55-45c9-47ec-abc5-2ffa1bcfc806"
      ),
      petCreate(
        9,
        "Sarah",
        categories[3],
        "Black, White",
        "2 months",
        "Standard ears/coat",
        "Female",
        40,
        "Sarah is very smart but more cautious. It takes a bit of time to earn her trust, but it’s very rewarding when she trusts you. She loves the running wheel and is always the first to get on and exercise. She is fast and likes to play chase with her mates.",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/sarah.webp?alt=media&token=9304cdb1-8dbd-4136-843a-b42f39ca76ce"
      ),
      petCreate(
        10,
        "Yin",
        categories[3],
        "Black",
        "8 months",
        "Standard ears/coat",
        "Male",
        40,
        "Yin is friendly, welcomes being pet, and takes food from my hand, but is not used to being picked up. I weigh my rats daily so I think they will get used to being handled very soon.",
        true,
        "https://firebasestorage.googleapis.com/v0/b/inventory-app-5ec55.appspot.com/o/yin.webp?alt=media&token=66244998-c830-46d2-bac8-4c66e04e383e"
      ),
    ]);
  };
