export function filterArray(array: string[], searchTerm: string) {
  // Convert the search term to lower case for case-insensitive comparison
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Use the filter method to return an array of matching items
  return array.filter((item) => {
    // Convert each item to a string and check if it includes the search term
    return item.toString().toLowerCase().includes(lowerCaseSearchTerm);
  });
}
