import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


// Fonction pour stocker des données avec un timestamp
 setItemWithExpiry(key: string, value: string, timeTempLimite: number) {
  const now = new Date();
  // L'objet stocké a la valeur et le temps d'expiration
  const item = {
      value: value,
      expiry: now.getTime() + timeTempLimite,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Fonction pour obtenir des données en vérifiant l'expiration
 getItemWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
      return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) { 
      localStorage.removeItem(key);
      return null;
  }
  return item.value;
}

//on check le localSTorage
cleanExpiredLocalStorageItems(): void {
    const now = new Date().getTime();  // Obtenir le timestamp actuel
    console.log("on y passe ! il est 23:19")
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key === null) continue; 
      try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) continue;

        const item: { expiry?: number } = JSON.parse(itemStr);
        if (item.expiry && now > item.expiry) {
          localStorage.removeItem(key);
          console.log(`L'item '${key}' a expiré et a été supprimé.`);
        }
      } catch (e) {
        console.error(`Erreur avec la clé '${key}': ${(e as Error).message}`);
      }
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
  
}
