export function filterByCategory(data : any[], category : string) {
  return data.filter(item => item.category === category);
}