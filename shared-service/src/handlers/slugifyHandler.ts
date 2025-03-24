export const SlugifyHandler = (slug) => {
    return slug
      ?.trim() // Remove leading and trailing spaces
      ?.toLowerCase() // Convert the string to lowercase
      ?.replace(/&/g, "and")
      ?.replace(/[\W_]+/g, "-") // Replace any non-word characters or underscores with a hyphen
      ?.replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  };