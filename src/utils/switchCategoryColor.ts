export const switchCategoryColor = (category: string) => {
  let bgColor = "";
  switch (category) {
    case "Filme":
      bgColor = "bg-purple-500";
      break;
    case "Série":
      bgColor = "bg-red-500";
      break;
    case "Livro":
      bgColor = "bg-emerald-500";
      break;
    case "Música":
      bgColor = "bg-blue-500";
      break;
    default:
      bgColor = "bg-purple-500";
  }
  return bgColor;
};
