export function formatDate(inputDate: string): string {
  // Convertir la chaîne de caractères en un objet Date
  const dateObject = new Date(inputDate);

  // Extraire le jour, le mois et l'année
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0 en JavaScript
  const year = dateObject.getFullYear();

  // Retourner la date au format "dd/mm/yyyy"
  return `${day}/${month}/${year}`;
}

export function compareDates(a: string, b: string): number {
  const [dayA, monthA, yearA] = a.split("/").map(Number);
  const [dayB, monthB, yearB] = b.split("/").map(Number);

  const dateA = new Date(yearA, monthA - 1, dayA); // Le mois est 0-indexé en JavaScript
  const dateB = new Date(yearB, monthB - 1, dayB);

  return dateA.getTime() - dateB.getTime();
}
