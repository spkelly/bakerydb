export function getIdFromPath(index=2){
  return window.location.hash.split("/")[index];
}