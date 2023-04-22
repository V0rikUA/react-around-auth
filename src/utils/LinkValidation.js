import VerEx from "verbal-expressions";

export default function isLink(linkString) {
  const regexp = VerEx()
    .startOfLine()
    .then("http")
    .maybe("s")
    .then("://")
    .maybe("www.")
    .anythingBut(" ")
    .endOfLine();

  const minLinkLength = 9;

  return regexp.test(linkString) && linkString.length > minLinkLength;
}
