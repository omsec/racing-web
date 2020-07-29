// strukltur vom API (array-object) mit allen Code-Typen
// ohne raw/mapping direkt implementiert, da System-Typ (Service-intern) & read-only
export interface CodeType {
  type: string;
  value: number;
  text: string;
}
