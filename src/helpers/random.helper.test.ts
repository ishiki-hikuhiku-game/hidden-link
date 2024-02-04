import { LCGRandom } from "./random.helper";

export { LCGRandom } from "./random.helper";

test("check", () => {
    const random = new LCGRandom();
    const r = random.nextUnder(10);
    expect(r).toBeLessThan(10);
    expect(r).toBeGreaterThanOrEqual(0);
});