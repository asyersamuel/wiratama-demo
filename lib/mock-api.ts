export async function simulateLatency(ms = 120) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
