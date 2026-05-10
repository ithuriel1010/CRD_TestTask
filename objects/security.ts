import { expect } from "@playwright/test";

export class Security {
  name: string;
  target: number;
  current: number;
  targetVariance: number;
  unitPrice: number;
  output: number;

  public constructor(
    name: string,
    target: number,
    current: number,
    targetVariance: number,
    unitPrice: number,
    output: number,
  ) {
    this.name = name;
    this.target = target;
    this.current = current;
    this.targetVariance = targetVariance;
    this.unitPrice = unitPrice;
    this.output = output;
  }

  public calculateExpectedOutput(totalAssets: number): number {
    let expectedOutput = 0;
    if (this.targetVariance !== 0) {
      const varianceValue = (-this.targetVariance / 100) * totalAssets;
      expectedOutput = varianceValue / this.unitPrice;

      // If we assume the application only allows for selling/buying whole units of securities.
      // expectedOutput = parseFloat(expectedOutput.toFixed(0));

      // If we assume the application allows for selling/buying fractal units of securities.
      expectedOutput = parseFloat(expectedOutput.toFixed(2));
    }

    return expectedOutput;
  }

  public async validateSecurityOutput(
    test: any,
    totalAssets: number,
  ): Promise<void> {
    return await test.step(`Validate security output for ${this.name} security`, async () => {
      expect
        .soft(this.output)
        .toEqual(this.calculateExpectedOutput(totalAssets));
    });
  }
}
