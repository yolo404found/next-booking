import { ISO_DATE_REGAX } from "../config/general";

export function formatDate(inputString:string) {
    
    if (!ISO_DATE_REGAX.test(inputString)) {
      return inputString;
    }
    const date = new Date(inputString);
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
  
    
    return `${year}-${month}-${day}`;
  }