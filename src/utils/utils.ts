/**
 * Formate une date à partir d'une chaîne de caractères au format "dd/mm/yyyy".
 *
 * @param inputDate - Chaîne de caractères représentant une date (par exemple, "Tue Aug 10 2021").
 * @returns La date formatée sous la forme "dd/mm/yyyy".
 *
 * Exemple :
 * ```
 * formatDate("Tue Aug 10 2021"); // Retourne "10/08/2021"
 * ```
 */
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

/**
 * Compare deux dates au format "dd/mm/yyyy".
 *
 * @param a - Première date à comparer sous forme de chaîne "dd/mm/yyyy".
 * @param b - Deuxième date à comparer sous forme de chaîne "dd/mm/yyyy".
 * @returns Un nombre négatif si la première date est antérieure,
 *          un nombre positif si elle est postérieure,
 *          ou 0 si les deux dates sont identiques.
 *
 * Exemple :
 * ```
 * compareDates("10/08/2021", "15/08/2021"); // Retourne un nombre négatif
 * ```
 */
export function compareDates(a: string, b: string): number {
  const [dayA, monthA, yearA] = a.split("/").map(Number);
  const [dayB, monthB, yearB] = b.split("/").map(Number);

  const dateA = new Date(yearA, monthA - 1, dayA); // Le mois est 0-indexé en JavaScript
  const dateB = new Date(yearB, monthB - 1, dayB);

  return dateA.getTime() - dateB.getTime();
}
