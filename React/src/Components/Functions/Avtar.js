export default function getUsernameColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const saturation = 70;
  const lightness = 60;
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return color;
}
