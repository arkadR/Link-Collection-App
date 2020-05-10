export function getColorForBrowser(browserName: string) {
  //TODO: Check fetched browser names, add more colors for fun
  switch (browserName) {
    case "Edge":
      return "#0088FE";

    case "Chrome":
      return "#FFBB28";

    default:
      return getRandomColor();
  }
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
