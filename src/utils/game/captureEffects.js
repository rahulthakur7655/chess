export function getCaptureShakePower(target) {
  if (!target) {
    return 0;
  }

  if (target.type === "q") return 8;
  if (target.type === "r") return 5;
  if (target.type === "n" || target.type === "b") return 3;
  if (target.type === "k") return 10;
  return 2;
}
