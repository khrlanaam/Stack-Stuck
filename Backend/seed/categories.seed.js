module.exports = async function seedCategories(conn) {
  console.log("Seeding categories...");

  const categories = [
    ["Programming"],
    ["Database"],
    ["Networking"],
    ["DevOps"],
    ["Cyber Security"],
    ["Mobile Development"],
    ["Web Development"],
    ["Data Science"],
    ["Artificial Intelligence"],
    ["Cloud Computing"],
  ];

  await conn.query(
    "INSERT INTO categories (name) VALUES ?",
    [categories]
  );
};