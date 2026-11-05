export function incrementCount(count: number): number {
  return count + 1;
}

export function decrementCount(count: number): number {
  return Math.max(0, count - 1);
}

export function getProgress(count: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(count / target, 1);
}

export function getRemaining(count: number, target: number): number {
  return Math.max(0, target - count);
}

export function isTargetReached(count: number, target: number): boolean {
  return count >= target;
}

export function formatCount(count: number): string {
  return count.toLocaleString('id-ID');
}
