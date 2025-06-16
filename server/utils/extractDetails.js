function extractDetails(text) {
  const email =
    text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)?.[0] || "";
  const phone = text.match(/(\+\d{1,3})?\s?\d{10}/)?.[0] || "";
  const name = text.split("\n")[0].trim(); // assume name on top line

  const skills = [
    ...new Set(
      (
        text.match(
          /\b(JavaScript|React|Node|MongoDB|SQL|Python|HTML|CSS)\b/gi
        ) || []
      ).map((skill) => skill.toLowerCase())
    ),
  ];

  return { name, email, phone, skills };
}

module.exports = { extractDetails };
